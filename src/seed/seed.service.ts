import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Setting } from '../settings/entities/setting.entity';
import { Store } from '../stores/entities/store.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { PurchaseItem } from '../purchases/entities/purchase-item.entity';
import { UserRole } from '../common/enums';
import {
  demoCategories,
  demoProducts,
  demoCustomers,
  demoSuppliers,
  demoPurchases,
  demoSuperAdmin,
  demoStores,
  demoStoreAdmin,
  demoStoreAdmin2,
  demoCashier,
} from './demo.data';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Setting) private settingsRepo: Repository<Setting>,
    @InjectRepository(Store) private storesRepo: Repository<Store>,
    @InjectRepository(Category) private categoriesRepo: Repository<Category>,
    @InjectRepository(Product) private productsRepo: Repository<Product>,
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
    @InjectRepository(Supplier) private suppliersRepo: Repository<Supplier>,
    @InjectRepository(Purchase) private purchasesRepo: Repository<Purchase>,
    @InjectRepository(PurchaseItem) private purchaseItemsRepo: Repository<PurchaseItem>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    if (process.env.VERCEL) return;
    await this.seedSuperAdmin();
    await this.seedDemo();
  }

  private async seedSuperAdmin() {
    const exists = await this.usersRepo.findOne({ where: { email: demoSuperAdmin.email } });
    if (!exists) {
      const hash = await bcrypt.hash(demoSuperAdmin.password, 10);
      await this.usersRepo.save(
        this.usersRepo.create({
          name: demoSuperAdmin.name,
          email: demoSuperAdmin.email,
          passwordHash: hash,
          role: UserRole.SUPER_ADMIN,
          storeId: null,
          active: true,
        }),
      );
      this.logger.log('Super admin creado: super@pos.local / super123');
    }
  }

  async seedDemo(force = false) {
    const productCount = await this.productsRepo.count();
    if (productCount > 0 && !force) {
      this.logger.log('Demo data already exists, skipping seed');
      return;
    }

    if (force && productCount > 0) {
      await this.clearDemoData();
    }

    this.logger.log('Seeding multitienda demo data...');

    const storeMap = new Map<string, number>();
    for (const s of demoStores) {
      let store = await this.storesRepo.findOne({ where: { code: s.code } });
      if (!store) {
        store = await this.storesRepo.save(this.storesRepo.create(s));
        await this.settingsRepo.save(
          this.settingsRepo.create({
            storeId: store.id,
            businessName: s.name,
            address: s.address,
            phone: s.phone,
            taxRate: 0.19,
            currency: 'COP',
          }),
        );
      }
      storeMap.set(s.code, store.id);
    }

    await this.seedUser(demoStoreAdmin, UserRole.ADMIN, storeMap.get(demoStoreAdmin.storeCode)!);
    await this.seedUser(demoStoreAdmin2, UserRole.ADMIN, storeMap.get(demoStoreAdmin2.storeCode)!);
    await this.seedUser(demoCashier, UserRole.CASHIER, storeMap.get(demoCashier.storeCode)!);

    for (const [code, storeId] of storeMap) {
      await this.seedStoreCatalog(storeId, code === 'cali');
    }

    await this.seedPurchases(storeMap.get('bogota')!);

    this.logger.log('Multitienda demo seeded successfully');
  }

  private async seedUser(
    demo: { name: string; email: string; password: string },
    role: UserRole,
    storeId: number,
  ) {
    const exists = await this.usersRepo.findOne({ where: { email: demo.email } });
    if (exists) {
      if (!exists.storeId) {
        exists.storeId = storeId;
        exists.role = role;
        await this.usersRepo.save(exists);
      }
      return;
    }
    const hash = await bcrypt.hash(demo.password, 10);
    await this.usersRepo.save(
      this.usersRepo.create({
        name: demo.name,
        email: demo.email,
        passwordHash: hash,
        role,
        storeId,
        active: true,
      }),
    );
  }

  private async seedStoreCatalog(storeId: number, caliSubset = false) {
    const existing = await this.productsRepo.count({ where: { storeId } });
    if (existing > 0) return;

    const categoryMap = new Map<string, number>();
    for (const cat of demoCategories) {
      const saved = await this.categoriesRepo.save(
        this.categoriesRepo.create({ ...cat, storeId }),
      );
      categoryMap.set(cat.name, saved.id);
    }

    const products = caliSubset ? demoProducts.slice(0, 10) : demoProducts;
    for (const prod of products) {
      await this.productsRepo.save(
        this.productsRepo.create({
          sku: prod.sku,
          name: prod.name,
          salePrice: prod.salePrice,
          costPrice: prod.costPrice,
          stock: prod.stock,
          minStock: prod.minStock,
          categoryId: categoryMap.get(prod.category),
          storeId,
          active: true,
        }),
      );
    }

    const customers = caliSubset ? demoCustomers.slice(0, 2) : demoCustomers;
    for (const cust of customers) {
      await this.customersRepo.save(this.customersRepo.create({ ...cust, storeId }));
    }

    for (const sup of demoSuppliers) {
      await this.suppliersRepo.save(this.suppliersRepo.create({ ...sup, storeId }));
    }
  }

  private async seedPurchases(storeId: number) {
    const admin = await this.usersRepo.findOne({ where: { email: demoStoreAdmin.email } });
    if (!admin) return;

    const suppliers = await this.suppliersRepo.find({ where: { storeId } });
    const products = await this.productsRepo.find({ where: { storeId } });
    if (suppliers.length === 0 || products.length === 0) return;

    const supplierMap = new Map(suppliers.map((s) => [s.name, s.id]));
    const productMap = new Map(products.map((p) => [p.sku, p.id]));

    for (const demo of demoPurchases.slice(0, 3)) {
      const supplierId = supplierMap.get(demo.supplier);
      if (!supplierId) continue;

      let total = 0;
      const items: Partial<PurchaseItem>[] = [];

      for (const item of demo.items) {
        const productId = productMap.get(item.sku);
        if (!productId) continue;
        const subtotal = item.quantity * item.unitCost;
        total += subtotal;
        items.push({ productId, quantity: item.quantity, unitCost: item.unitCost, subtotal });
      }

      if (items.length === 0) continue;

      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - demo.daysAgo);

      const purchase = await this.purchasesRepo.save(
        this.purchasesRepo.create({
          storeId,
          supplierId,
          userId: admin.id,
          invoiceNumber: demo.invoiceNumber,
          notes: demo.notes,
          total,
          createdAt,
        }),
      );

      for (const item of items) {
        await this.purchaseItemsRepo.save(
          this.purchaseItemsRepo.create({ ...item, purchaseId: purchase.id }),
        );
      }
    }
  }

  private async clearDemoData() {
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await this.dataSource.query('DELETE FROM sale_items');
    await this.dataSource.query('DELETE FROM sales');
    await this.dataSource.query('DELETE FROM purchase_items');
    await this.dataSource.query('DELETE FROM purchases');
    await this.dataSource.query('DELETE FROM inventory_movements');
    await this.dataSource.query('DELETE FROM cash_sessions');
    await this.dataSource.query('DELETE FROM products');
    await this.dataSource.query('DELETE FROM categories');
    await this.dataSource.query('DELETE FROM customers');
    await this.dataSource.query('DELETE FROM suppliers');
    await this.dataSource.query('DELETE FROM settings');
    await this.dataSource.query('DELETE FROM users WHERE role != \'super_admin\'');
    await this.dataSource.query('DELETE FROM stores');
    await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 1');
  }
}
