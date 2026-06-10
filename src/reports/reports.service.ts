import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Sale } from '../sales/entities/sale.entity';
import { SaleItem } from '../sales/entities/sale-item.entity';
import { Product } from '../products/entities/product.entity';
import type { StoreContext } from '../common/utils/store-context.util';
import { reportStoreId } from '../common/utils/store-context.util';
import {
  dateRangeColombia,
  todayRangeColombia,
  toColombiaDateString,
} from '../common/utils/date.util';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
    @InjectRepository(SaleItem) private saleItemRepo: Repository<SaleItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getDashboard(ctx: StoreContext) {
    const { start, end } = todayRangeColombia();
    const storeId = reportStoreId(ctx);

    const qb = this.saleRepo.createQueryBuilder('s')
      .where('s.createdAt BETWEEN :start AND :end', { start, end });
    if (storeId) qb.andWhere('s.storeId = :storeId', { storeId });
    const salesToday = await qb.getMany();

    const totalSales = salesToday.length;
    const revenue = salesToday.reduce((s, v) => s + Number(v.total), 0);
    const profit = salesToday.reduce((s, v) => s + Number(v.profit), 0);

    const topQb = this.saleItemRepo.createQueryBuilder('si')
      .innerJoin('si.sale', 's')
      .select('si.productName', 'name')
      .addSelect('SUM(si.quantity)', 'quantity')
      .addSelect('SUM(si.subtotal)', 'revenue')
      .where('s.createdAt BETWEEN :start AND :end', { start, end });
    if (storeId) topQb.andWhere('s.storeId = :storeId', { storeId });
    const topProducts = await topQb
      .groupBy('si.productName')
      .orderBy('quantity', 'DESC')
      .limit(5)
      .getRawMany();

    const lowQb = this.productRepo.createQueryBuilder('p')
      .where('p.active = true')
      .andWhere('p.stock <= p.minStock');
    if (storeId) lowQb.andWhere('p.storeId = :storeId', { storeId });
    const lowStock = await lowQb.getCount();

    return {
      totalSales,
      revenue: Number(revenue.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      topProducts,
      lowStockCount: lowStock,
    };
  }

  async getSalesReport(from: string, to: string, ctx: StoreContext) {
    const storeId = reportStoreId(ctx);
    const { start, end } = dateRangeColombia(from, to);
    const where: Record<string, unknown> = {
      createdAt: Between(start, end),
    };
    if (storeId) where.storeId = storeId;

    const sales = await this.saleRepo.find({
      where,
      relations: ['user', 'customer'],
      order: { createdAt: 'DESC' },
    });

    const summary = {
      count: sales.length,
      revenue: sales.reduce((s, v) => s + Number(v.total), 0),
      profit: sales.reduce((s, v) => s + Number(v.profit), 0),
      tax: sales.reduce((s, v) => s + Number(v.taxAmount), 0),
    };

    return { sales, summary };
  }

  async getInventoryReport(ctx: StoreContext) {
    const storeId = reportStoreId(ctx);
    const where = storeId ? { storeId } : {};
    const products = await this.productRepo.find({
      where,
      relations: ['category'],
      order: { name: 'ASC' },
    });

    const totalValue = products.reduce((s, p) => s + Number(p.costPrice) * p.stock, 0);
    const totalRetail = products.reduce((s, p) => s + Number(p.salePrice) * p.stock, 0);

    return {
      products,
      summary: {
        totalProducts: products.length,
        totalUnits: products.reduce((s, p) => s + p.stock, 0),
        inventoryCost: Number(totalValue.toFixed(2)),
        inventoryRetail: Number(totalRetail.toFixed(2)),
      },
    };
  }

  async getProfitabilityReport(from: string, to: string, ctx: StoreContext) {
    const storeId = reportStoreId(ctx);
    const { start, end } = dateRangeColombia(from, to);
    const where: Record<string, unknown> = {
      createdAt: Between(start, end),
    };
    if (storeId) where.storeId = storeId;

    const sales = await this.saleRepo.find({ where });

    const revenue = sales.reduce((s, v) => s + Number(v.total), 0);
    const profit = sales.reduce((s, v) => s + Number(v.profit), 0);
    const cost = revenue - profit;

    return {
      revenue: Number(revenue.toFixed(2)),
      cost: Number(cost.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      margin: revenue > 0 ? Number(((profit / revenue) * 100).toFixed(2)) : 0,
      salesCount: sales.length,
    };
  }

  async getProductsReport(from: string, to: string, ctx: StoreContext) {
    const storeId = reportStoreId(ctx);
    const { start, end } = dateRangeColombia(from, to);

    const qb = this.saleItemRepo.createQueryBuilder('si')
      .innerJoin('si.sale', 's')
      .leftJoin('si.product', 'p')
      .leftJoin('p.category', 'c')
      .select('si.productId', 'productId')
      .addSelect('si.productName', 'name')
      .addSelect('COALESCE(c.name, \'Sin categoría\')', 'category')
      .addSelect('SUM(si.quantity)', 'quantity')
      .addSelect('SUM(si.subtotal)', 'revenue')
      .addSelect('SUM(si.quantity * si.unitCost)', 'cost')
      .where('s.createdAt BETWEEN :start AND :end', { start, end });
    if (storeId) qb.andWhere('s.storeId = :storeId', { storeId });

    const products = await qb
      .groupBy('si.productId')
      .addGroupBy('si.productName')
      .addGroupBy('c.name')
      .orderBy('revenue', 'DESC')
      .getRawMany();

    const items = products.map((p) => {
      const revenue = Number(p.revenue);
      const cost = Number(p.cost);
      const profit = revenue - cost;
      return {
        productId: p.productId,
        name: p.name,
        category: p.category,
        quantity: Number(p.quantity),
        revenue: Number(revenue.toFixed(2)),
        cost: Number(cost.toFixed(2)),
        profit: Number(profit.toFixed(2)),
        margin: revenue > 0 ? Number(((profit / revenue) * 100).toFixed(1)) : 0,
      };
    });

    const summary = {
      totalProducts: items.length,
      totalUnits: items.reduce((s, i) => s + i.quantity, 0),
      revenue: items.reduce((s, i) => s + i.revenue, 0),
      profit: items.reduce((s, i) => s + i.profit, 0),
    };

    return { products: items, summary };
  }

  async getDailySales(from: string, to: string, ctx: StoreContext) {
    const storeId = reportStoreId(ctx);
    const { start, end } = dateRangeColombia(from, to);
    const where: Record<string, unknown> = {
      createdAt: Between(start, end),
    };
    if (storeId) where.storeId = storeId;

    const sales = await this.saleRepo.find({ where, order: { createdAt: 'ASC' } });

    const byDay = new Map<string, { date: string; revenue: number; profit: number; count: number }>();
    for (const sale of sales) {
      const date = toColombiaDateString(sale.createdAt);
      const entry = byDay.get(date) || { date, revenue: 0, profit: 0, count: 0 };
      entry.revenue += Number(sale.total);
      entry.profit += Number(sale.profit);
      entry.count += 1;
      byDay.set(date, entry);
    }

    return Array.from(byDay.values()).map((d) => ({
      ...d,
      revenue: Number(d.revenue.toFixed(2)),
      profit: Number(d.profit.toFixed(2)),
    }));
  }
}
