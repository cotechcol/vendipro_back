import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseItem } from './entities/purchase-item.entity';
import { Product } from '../products/entities/product.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { InventoryMovement } from '../inventory/entities/inventory-movement.entity';
import { CreatePurchaseDto } from './dto/purchase.dto';
import { PurchaseQueryDto } from './dto/purchase-query.dto';
import { InventoryMovementType } from '../common/enums';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase) private purchaseRepo: Repository<Purchase>,
    private dataSource: DataSource,
  ) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async findAll(query: PurchaseQueryDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const { page = 1, limit = 10, supplierId } = query;
    const where: Record<string, unknown> = { storeId };
    if (supplierId) where.supplierId = supplierId;
    const [data, total] = await this.purchaseRepo.findAndCount({
      where,
      relations: ['supplier', 'user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, ctx: StoreContext) {
    const purchase = await this.purchaseRepo.findOne({
      where: { id },
      relations: ['supplier', 'user', 'items', 'items.product'],
    });
    if (!purchase) throw new NotFoundException('Compra no encontrada');
    if (purchase.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Compra no pertenece a esta tienda');
    }
    return purchase;
  }

  async create(dto: CreatePurchaseDto, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    return this.dataSource.transaction(async (manager) => {
      const supplier = await manager.findOne(Supplier, { where: { id: dto.supplierId, storeId } });
      if (!supplier) throw new NotFoundException('Proveedor no encontrado');

      let total = 0;
      const purchaseItems: PurchaseItem[] = [];

      for (const item of dto.items) {
        const product = await manager.findOne(Product, { where: { id: item.productId, storeId } });
        if (!product) throw new NotFoundException(`Producto ${item.productId} no encontrado`);

        const subtotal = item.quantity * item.unitCost;
        total += subtotal;

        const stockBefore = product.stock;
        const stockAfter = stockBefore + item.quantity;
        product.stock = stockAfter;

        const currentStock = product.stock - item.quantity;
        const weightedCost = currentStock > 0
          ? (Number(product.costPrice) * currentStock + item.unitCost * item.quantity) / stockAfter
          : item.unitCost;
        product.costPrice = Number(weightedCost.toFixed(2));

        await manager.save(product);

        await manager.save(
          manager.create(InventoryMovement, {
            storeId,
            productId: product.id,
            type: InventoryMovementType.PURCHASE,
            quantity: item.quantity,
            stockBefore,
            stockAfter,
            reference: `PUR-${Date.now()}`,
            userId,
          }),
        );

        purchaseItems.push(
          manager.create(PurchaseItem, {
            productId: item.productId,
            quantity: item.quantity,
            unitCost: item.unitCost,
            subtotal,
          }),
        );
      }

      const purchase = manager.create(Purchase, {
        storeId,
        supplierId: dto.supplierId,
        invoiceNumber: dto.invoiceNumber,
        notes: dto.notes,
        total,
        userId,
        items: purchaseItems,
      });
      return manager.save(purchase);
    });
  }
}
