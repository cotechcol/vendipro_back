import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Between } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Product } from '../products/entities/product.entity';
import { CashSession } from '../cash-sessions/entities/cash-session.entity';
import { CreateSaleDto } from './dto/sale.dto';
import { CashSessionStatus, PaymentMethod } from '../common/enums';
import { calculateTaxFromIncludedPrice, generateTicketNumber } from '../common/utils/tax.util';
import { SettingsService } from '../settings/settings.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';
import { dateRangeColombia } from '../common/utils/date.util';
import { planStockDeductions, applyStockDeductions } from '../products/product-stock.util';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
    private settingsService: SettingsService,
    private dataSource: DataSource,
  ) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async findAll(query: PaginationDto & { from?: string; to?: string }, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const { page = 1, limit = 10, from, to } = query;
    const where: Record<string, unknown> = { storeId };
    if (from && to) {
      const { start, end } = dateRangeColombia(from, to);
      where.createdAt = Between(start, end);
    }
    const [data, total] = await this.saleRepo.findAndCount({
      where,
      relations: ['customer', 'user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, ctx: StoreContext) {
    const sale = await this.saleRepo.findOne({
      where: { id },
      relations: ['customer', 'user', 'items', 'items.product', 'cashSession'],
    });
    if (!sale) throw new NotFoundException('Venta no encontrada');
    if (sale.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Venta no pertenece a esta tienda');
    }
    return sale;
  }

  async getTicket(id: number, ctx: StoreContext) {
    const sale = await this.findOne(id, ctx);
    const settings = await this.settingsService.get(sale.storeId);
    return { sale, settings };
  }

  async create(dto: CreateSaleDto, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const taxRate = await this.settingsService.getTaxRate(storeId);

    return this.dataSource.transaction(async (manager) => {
      const cashSession = await manager.findOne(CashSession, {
        where: { storeId, userId, status: CashSessionStatus.OPEN },
      });
      if (!cashSession) {
        throw new BadRequestException('Debes abrir la caja antes de realizar ventas');
      }

      const saleItems: SaleItem[] = [];
      let totalWithTax = 0;
      let profit = 0;

      for (const item of dto.items) {
        const product = await manager.findOne(Product, {
          where: { id: item.productId, storeId },
          relations: ['baseProduct', 'recipe', 'recipe.ingredient'],
        });
        if (!product || !product.active) {
          throw new NotFoundException(`Producto ${item.productId} no encontrado`);
        }

        const deductions = await planStockDeductions(manager, product, item.quantity, storeId);
        const reference = `SALE-${Date.now()}-${product.id}`;
        await applyStockDeductions(manager, deductions, storeId, userId, reference);

        const unitPrice = Number(product.salePrice);
        const unitCost = Number(product.costPrice);
        const subtotal = unitPrice * item.quantity;
        totalWithTax += subtotal;
        profit += (unitPrice - unitCost) * item.quantity;

        saleItems.push(
          manager.create(SaleItem, {
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            unitPrice,
            unitCost,
            subtotal,
          }),
        );
      }

      const { subtotal, taxAmount, total } = calculateTaxFromIncludedPrice(totalWithTax, taxRate);

      let amountPaid = dto.amountPaid ?? total;
      let change = 0;
      if (dto.paymentMethod === PaymentMethod.CASH || dto.paymentMethod === PaymentMethod.MIXED) {
        if (amountPaid < total) {
          throw new BadRequestException('El monto pagado es insuficiente');
        }
        change = Number((amountPaid - total).toFixed(2));
      } else {
        amountPaid = total;
      }

      const sale = manager.create(Sale, {
        storeId,
        ticketNumber: generateTicketNumber(),
        subtotal,
        taxAmount,
        total,
        profit: Number(profit.toFixed(2)),
        paymentMethod: dto.paymentMethod,
        amountPaid,
        change,
        customerId: dto.customerId,
        userId,
        cashSessionId: cashSession.id,
        items: saleItems,
      });

      return manager.save(sale);
    });
  }
}
