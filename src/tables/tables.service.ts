import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaymentMethod, TableOrderStatus } from '../common/enums';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';
import { Product } from '../products/entities/product.entity';
import {
  calculateSaleUnitPrice,
  planStockDeductions,
} from '../products/product-stock.util';
import { CreateSaleDto } from '../sales/dto/sale.dto';
import { SalesService } from '../sales/sales.service';
import {
  AddTableOrderItemDto,
  CloseTableOrderDto,
  CreateTableDto,
  OpenTableOrderDto,
  UpdateTableDto,
  UpdateTableOrderItemDto,
} from './dto/table.dto';
import { RestaurantTable } from './entities/restaurant-table.entity';
import { TableOrder } from './entities/table-order.entity';
import { TableOrderItem } from './entities/table-order-item.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(RestaurantTable) private tableRepo: Repository<RestaurantTable>,
    @InjectRepository(TableOrder) private orderRepo: Repository<TableOrder>,
    @InjectRepository(TableOrderItem) private itemRepo: Repository<TableOrderItem>,
    private dataSource: DataSource,
    private salesService: SalesService,
  ) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async list(ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const [tables, openOrders] = await Promise.all([
      this.tableRepo.find({
        where: { storeId, active: true },
        order: { sortOrder: 'ASC', name: 'ASC' },
      }),
      this.orderRepo.find({
        where: { storeId, status: TableOrderStatus.OPEN },
        relations: ['items'],
      }),
    ]);
    const ordersByTable = new Map(openOrders.map((order) => [order.tableId, order]));

    return tables.map((table) => {
      const openOrder = ordersByTable.get(table.id) ?? null;
      const items = openOrder?.items ?? [];
      const total = items.reduce(
        (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
        0,
      );
      const itemCount = items.reduce((sum, item) => sum + Number(item.quantity), 0);
      return {
        ...table,
        status: openOrder ? 'occupied' : 'free',
        openOrder: openOrder
          ? {
              id: openOrder.id,
              customerId: openOrder.customerId,
              notes: openOrder.notes,
              total: Number(total.toFixed(2)),
              itemCount,
              createdAt: openOrder.createdAt,
            }
          : null,
      };
    });
  }

  async create(dto: CreateTableDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    try {
      return await this.tableRepo.save(this.tableRepo.create({
        storeId,
        name: dto.name.trim(),
        capacity: dto.capacity ?? 4,
        sortOrder: dto.sortOrder ?? 0,
      }));
    } catch {
      throw new ConflictException('Ya existe una mesa con ese nombre en esta tienda');
    }
  }

  async update(id: number, dto: UpdateTableDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const table = await this.getTable(id, storeId);

    if (dto.active === false) {
      await this.assertNoOpenOrder(table.id, storeId);
    }

    if (dto.name !== undefined) table.name = dto.name.trim();
    if (dto.capacity !== undefined) table.capacity = dto.capacity;
    if (dto.active !== undefined) table.active = dto.active;
    if (dto.sortOrder !== undefined) table.sortOrder = dto.sortOrder;

    try {
      return await this.tableRepo.save(table);
    } catch {
      throw new ConflictException('Ya existe una mesa con ese nombre en esta tienda');
    }
  }

  async remove(id: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const table = await this.getTable(id, storeId);
    await this.assertNoOpenOrder(table.id, storeId);
    table.active = false;
    await this.tableRepo.save(table);
    return { message: 'Mesa desactivada' };
  }

  async open(tableId: number, dto: OpenTableOrderDto, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const table = await this.getTable(tableId, storeId);
    if (!table.active) throw new BadRequestException('La mesa está inactiva');

    const existing = await this.orderRepo.findOne({
      where: { tableId, storeId, status: TableOrderStatus.OPEN },
    });
    if (existing) return this.getOrder(existing.id, ctx);

    const order = await this.orderRepo.save(this.orderRepo.create({
      storeId,
      tableId,
      status: TableOrderStatus.OPEN,
      customerId: dto.customerId ?? null,
      notes: dto.notes?.trim() || null,
      openedByUserId: userId,
    }));
    return this.getOrder(order.id, ctx);
  }

  async getOrder(orderId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['table', 'items', 'customer', 'sale'],
      order: { items: { createdAt: 'ASC' } },
    });
    if (!order) throw new NotFoundException('Orden de mesa no encontrada');
    if (order.storeId !== storeId) {
      throw new ForbiddenException('La orden no pertenece a esta tienda');
    }
    return this.enrichOrder(order);
  }

  async addItem(orderId: number, dto: AddTableOrderItemDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const order = await this.getOpenOrder(orderId, storeId);
    const quantity = dto.quantity ?? 1;
    const product = await this.loadProduct(dto.productId, storeId);

    await planStockDeductions(
      this.dataSource.manager,
      product,
      quantity,
      storeId,
      dto.selectedOptionIds,
    );

    const optionLabel = dto.optionLabel?.trim()
      || this.buildOptionLabel(product, dto.selectedOptionIds, dto.portionScoopCount);
    const productName = optionLabel ? `${product.name} (${optionLabel})` : product.name;
    const unitPrice = calculateSaleUnitPrice(
      product,
      dto.selectedOptionIds,
      dto.portionScoopCount,
    );

    await this.itemRepo.save(this.itemRepo.create({
      orderId: order.id,
      productId: product.id,
      productName,
      quantity,
      unitPrice,
      selectedOptionIds: dto.selectedOptionIds?.length ? dto.selectedOptionIds : null,
      optionLabel: optionLabel || null,
      portionScoopCount: dto.portionScoopCount ?? null,
      notes: dto.notes?.trim() || null,
    }));

    return this.getOrder(order.id, ctx);
  }

  async updateItem(
    orderId: number,
    itemId: number,
    dto: UpdateTableOrderItemDto,
    ctx: StoreContext,
  ) {
    const storeId = this.scopeStore(ctx);
    await this.getOpenOrder(orderId, storeId);
    const item = await this.itemRepo.findOne({ where: { id: itemId, orderId } });
    if (!item) throw new NotFoundException('Producto de la mesa no encontrado');

    if (dto.quantity !== undefined) {
      const product = await this.loadProduct(item.productId, storeId);
      await planStockDeductions(
        this.dataSource.manager,
        product,
        dto.quantity,
        storeId,
        item.selectedOptionIds ?? undefined,
      );
      item.quantity = dto.quantity;
    }
    if (dto.notes !== undefined) item.notes = dto.notes.trim() || null;

    await this.itemRepo.save(item);
    return this.getOrder(orderId, ctx);
  }

  async removeItem(orderId: number, itemId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    await this.getOpenOrder(orderId, storeId);
    const result = await this.itemRepo.delete({ id: itemId, orderId });
    if (!result.affected) throw new NotFoundException('Producto de la mesa no encontrado');
    return this.getOrder(orderId, ctx);
  }

  async releaseEmptyOrder(orderId: number, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException('Orden de mesa no encontrada');
    if (order.storeId !== storeId) {
      throw new ForbiddenException('La orden no pertenece a esta tienda');
    }
    if (order.status !== TableOrderStatus.OPEN) {
      throw new BadRequestException('La orden ya está cerrada');
    }
    if (order.items?.length) {
      throw new BadRequestException('Solo puedes poner disponible una mesa sin productos');
    }

    order.status = TableOrderStatus.CLOSED;
    order.closedByUserId = userId;
    order.saleId = null;
    await this.orderRepo.save(order);

    return {
      message: 'Mesa disponible',
      orderId: order.id,
      tableId: order.tableId,
    };
  }

  async closeOrder(
    orderId: number,
    dto: CloseTableOrderDto,
    userId: number,
    ctx: StoreContext,
  ) {
    const storeId = this.scopeStore(ctx);
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(TableOrder, {
        where: { id: orderId },
        relations: ['items'],
      });
      if (!order) throw new NotFoundException('Orden de mesa no encontrada');
      if (order.storeId !== storeId) {
        throw new ForbiddenException('La orden no pertenece a esta tienda');
      }
      if (order.status !== TableOrderStatus.OPEN) {
        throw new BadRequestException('La orden ya está cerrada');
      }
      if (!order.items?.length) {
        throw new BadRequestException('La mesa no tiene productos para cobrar');
      }

      const saleDto: CreateSaleDto = {
        items: order.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedOptionIds: item.selectedOptionIds ?? undefined,
          portionScoopCount: item.portionScoopCount ?? undefined,
        })),
        customerId: dto.customerId ?? order.customerId ?? undefined,
        paymentMethod: dto.paymentMethod ?? PaymentMethod.CASH,
        amountPaid: dto.amountPaid,
      };

      const sale = await this.salesService.createFromTableOrder(manager, saleDto, userId, storeId);

      order.status = TableOrderStatus.CLOSED;
      order.closedByUserId = userId;
      order.saleId = sale.id;
      order.customerId = saleDto.customerId ?? null;
      await manager.save(order);

      return { sale, orderId: order.id, tableId: order.tableId };
    });
  }

  private async getTable(id: number, storeId: number) {
    const table = await this.tableRepo.findOne({ where: { id, storeId } });
    if (!table) throw new NotFoundException('Mesa no encontrada');
    return table;
  }

  private async assertNoOpenOrder(tableId: number, storeId: number) {
    const count = await this.orderRepo.count({
      where: { tableId, storeId, status: TableOrderStatus.OPEN },
    });
    if (count > 0) {
      throw new BadRequestException('No se puede modificar una mesa con cuenta abierta');
    }
  }

  private async getOpenOrder(orderId: number, storeId: number) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Orden de mesa no encontrada');
    if (order.storeId !== storeId) {
      throw new ForbiddenException('La orden no pertenece a esta tienda');
    }
    if (order.status !== TableOrderStatus.OPEN) {
      throw new BadRequestException('La orden ya está cerrada');
    }
    return order;
  }

  private async loadProduct(productId: number, storeId: number) {
    const product = await this.dataSource.manager.findOne(Product, {
      where: { id: productId, storeId },
      relations: [
        'baseProduct',
        'recipe',
        'recipe.ingredient',
        'optionGroups',
        'optionGroups.options',
        'optionGroups.options.ingredient',
      ],
    });
    if (!product || !product.active) {
      throw new NotFoundException(`Producto ${productId} no encontrado`);
    }
    return product;
  }

  private buildOptionLabel(
    product: Product,
    selectedOptionIds?: number[],
    portionScoopCount?: number,
  ): string {
    const labels: string[] = [];
    if (portionScoopCount && portionScoopCount > 0) {
      labels.push(`${portionScoopCount} bola${portionScoopCount > 1 ? 's' : ''}`);
    }
    if (selectedOptionIds?.length) {
      for (const group of product.optionGroups ?? []) {
        for (const option of group.options ?? []) {
          if (selectedOptionIds.includes(option.id)) labels.push(option.name);
        }
      }
    }
    return labels.join(', ');
  }

  private enrichOrder(order: TableOrder) {
    const total = (order.items ?? []).reduce(
      (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
      0,
    );
    const itemCount = (order.items ?? []).reduce((sum, item) => sum + Number(item.quantity), 0);
    return {
      ...order,
      total: Number(total.toFixed(2)),
      itemCount,
    };
  }
}
