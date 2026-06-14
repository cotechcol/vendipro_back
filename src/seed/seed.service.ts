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
import { ProductOptionGroup } from '../products/entities/product-option-group.entity';
import { ProductOption } from '../products/entities/product-option.entity';
import { UserRole, ProductType, StockUnit, OptionGroupKind } from '../common/enums';
import {
  demoCategories,
  demoProducts,
  demoBulkProducts,
  demoIngredientSimples,
  demoMenuSimpleProducts,
  demoPortionProducts,
  demoCompositeProducts,
  demoBulkProductsCali,
  demoIngredientSimplesCali,
  demoMenuSimpleProductsCali,
  demoPortionProductsCali,
  demoCompositeProductsCali,
  demoIceCreamContainers,
  demoIceCreamContainersCali,
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
    if (process.env.VERCEL || process.env.SKIP_SEED === '1') return;
    await this.seedSuperAdmin();
    await this.seedDemo();
    await this.seedMenuProductsAllStores();
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
          productType: ProductType.SIMPLE,
          stockUnit: StockUnit.UNIT,
          active: true,
        }),
      );
    }

    await this.seedMenuProducts(storeId, categoryMap, caliSubset);

    const customers = caliSubset ? demoCustomers.slice(0, 2) : demoCustomers;
    for (const cust of customers) {
      await this.customersRepo.save(this.customersRepo.create({ ...cust, storeId }));
    }

    for (const sup of demoSuppliers) {
      await this.suppliersRepo.save(this.suppliersRepo.create({ ...sup, storeId }));
    }
  }

  /** Agrega helados y hamburguesa demo si aún no existen (también en tiendas ya creadas) */
  async seedMenuProductsAllStores() {
    const stores = await this.storesRepo.find({ where: { active: true } });
    for (const store of stores) {
      const categoryMap = await this.ensureCategoryMap(store.id);
      const isCali = store.code === 'cali';
      await this.seedMenuProducts(store.id, categoryMap, isCali);
    }
  }

  private async ensureCategoryMap(storeId: number): Promise<Map<string, number>> {
    const map = new Map<string, number>();
    for (const cat of demoCategories) {
      let existing = await this.categoriesRepo.findOne({ where: { storeId, name: cat.name } });
      if (!existing) {
        existing = await this.categoriesRepo.save(
          this.categoriesRepo.create({ ...cat, storeId }),
        );
      }
      map.set(cat.name, existing.id);
    }
    return map;
  }

  private async seedMenuProducts(
    storeId: number,
    categoryMap: Map<string, number>,
    caliSubset = false,
  ) {
    const bulkList = caliSubset ? demoBulkProductsCali : demoBulkProducts;
    const portionList = caliSubset ? demoPortionProductsCali : demoPortionProducts;
    const compositeList = caliSubset ? demoCompositeProductsCali : demoCompositeProducts;
    const simpleIngredients = caliSubset ? demoIngredientSimplesCali : demoIngredientSimples;
    const menuSimples = caliSubset ? demoMenuSimpleProductsCali : demoMenuSimpleProducts;
    const containers = caliSubset ? demoIceCreamContainersCali : demoIceCreamContainers;

    const skuToId = new Map<string, number>();
    const existingProducts = await this.productsRepo.find({ where: { storeId } });
    for (const p of existingProducts) skuToId.set(p.sku, p.id);

    for (const bulk of bulkList) {
      if (skuToId.has(bulk.sku)) continue;
      const saved = await this.productsRepo.save(
        this.productsRepo.create({
          sku: bulk.sku,
          name: bulk.name,
          description: bulk.description,
          productType: ProductType.BULK,
          stockUnit: StockUnit.G,
          salePrice: 0,
          costPrice: bulk.costPrice,
          stock: bulk.stock,
          minStock: bulk.minStock,
          categoryId: categoryMap.get(bulk.category),
          storeId,
          active: true,
        }),
      );
      skuToId.set(bulk.sku, saved.id);
      this.logger.log(`Menu demo: insumo ${bulk.sku} en tienda ${storeId}`);
    }

    for (const simple of simpleIngredients) {
      if (skuToId.has(simple.sku)) continue;
      const saved = await this.productsRepo.save(
        this.productsRepo.create({
          sku: simple.sku,
          name: simple.name,
          productType: ProductType.SIMPLE,
          stockUnit: StockUnit.UNIT,
          salePrice: simple.salePrice,
          costPrice: simple.costPrice,
          stock: simple.stock,
          minStock: simple.minStock,
          categoryId: categoryMap.get(simple.category),
          storeId,
          active: true,
        }),
      );
      skuToId.set(simple.sku, saved.id);
    }

    for (const menuItem of menuSimples) {
      if (skuToId.has(menuItem.sku)) continue;
      const saved = await this.productsRepo.save(
        this.productsRepo.create({
          sku: menuItem.sku,
          name: menuItem.name,
          description: menuItem.description,
          productType: ProductType.SIMPLE,
          stockUnit: StockUnit.UNIT,
          salePrice: menuItem.salePrice,
          costPrice: menuItem.costPrice,
          stock: menuItem.stock,
          minStock: menuItem.minStock,
          categoryId: categoryMap.get(menuItem.category),
          storeId,
          active: true,
        }),
      );
      skuToId.set(menuItem.sku, saved.id);
      this.logger.log(`Menu demo: producto ${menuItem.sku} en tienda ${storeId}`);
    }

    for (const container of containers) {
      if (skuToId.has(container.sku)) continue;
      const saved = await this.productsRepo.save(
        this.productsRepo.create({
          sku: container.sku,
          name: container.name,
          productType: ProductType.SIMPLE,
          stockUnit: StockUnit.UNIT,
          salePrice: container.salePrice,
          costPrice: container.costPrice,
          stock: container.stock,
          minStock: container.minStock,
          categoryId: categoryMap.get(container.category),
          storeId,
          active: true,
        }),
      );
      skuToId.set(container.sku, saved.id);
    }

    for (const portion of portionList) {
      if (skuToId.has(portion.sku)) continue;

      const hasOptions = 'optionGroups' in portion && portion.optionGroups?.length;
      const saved = await this.productsRepo.save(
        this.productsRepo.create({
          sku: portion.sku,
          name: portion.name,
          description: portion.description,
          productType: ProductType.PORTION,
          stockUnit: StockUnit.G,
          baseProductId: hasOptions ? null : skuToId.get((portion as { baseSku?: string }).baseSku!) ?? null,
          portionSize: portion.portionSize,
          scoopCount: hasOptions ? portion.scoopCount : null,
          salePrice: portion.salePrice,
          costPrice: portion.costPrice,
          stock: 0,
          minStock: 0,
          categoryId: categoryMap.get(portion.category),
          storeId,
          active: true,
        }),
      );
      skuToId.set(portion.sku, saved.id);

      if (hasOptions && portion.optionGroups) {
        let sortOrder = 0;
        for (const groupDto of portion.optionGroups) {
          const minSelect = groupDto.kind === 'flavor' ? portion.scoopCount : 1;
          const group = await this.productsRepo.manager.save(
            this.productsRepo.manager.create(ProductOptionGroup, {
              productId: saved.id,
              name: groupDto.name,
              kind: groupDto.kind === 'flavor' ? OptionGroupKind.FLAVOR : OptionGroupKind.CONTAINER,
              minSelect,
              maxSelect: minSelect,
              sortOrder: sortOrder++,
            }),
          );

          for (const opt of groupDto.options) {
            const ingredientProductId = skuToId.get(opt.ingredientSku);
            if (!ingredientProductId) continue;
            await this.productsRepo.manager.save(
              this.productsRepo.manager.create(ProductOption, {
                groupId: group.id,
                name: opt.name,
                ingredientProductId,
                quantity: groupDto.kind === 'flavor' ? portion.portionSize : 1,
                unit: groupDto.kind === 'flavor' ? StockUnit.G : StockUnit.UNIT,
              }),
            );
          }
        }
      }

      this.logger.log(`Menu demo: porción ${portion.sku} en tienda ${storeId}`);
    }

    for (const composite of compositeList) {
      if (skuToId.has(composite.sku)) continue;
      const already = await this.productsRepo.findOne({ where: { storeId, sku: composite.sku } });
      if (already) {
        skuToId.set(composite.sku, already.id);
        continue;
      }
      const recipeLines = composite.recipe
        .map((line) => {
          const ingredientProductId = skuToId.get(line.ingredientSku);
          if (!ingredientProductId) return null;
          return {
            ingredientProductId,
            quantity: line.quantity,
            unit: line.unit === 'unit'
              ? StockUnit.UNIT
              : line.unit === 'ml'
                ? StockUnit.ML
                : StockUnit.G,
          };
        })
        .filter(Boolean);

      if (recipeLines.length !== composite.recipe.length) {
        this.logger.warn(`Menu demo: receta incompleta para ${composite.sku}`);
        continue;
      }

      const saved = await this.productsRepo.save(
        this.productsRepo.create({
          sku: composite.sku,
          name: composite.name,
          description: composite.description,
          productType: ProductType.COMPOSITE,
          stockUnit: StockUnit.UNIT,
          salePrice: composite.salePrice,
          costPrice: composite.costPrice,
          stock: 0,
          minStock: 0,
          categoryId: categoryMap.get(composite.category),
          storeId,
          active: true,
          recipe: recipeLines as { ingredientProductId: number; quantity: number; unit: StockUnit }[],
        }),
      );
      skuToId.set(composite.sku, saved.id);
      this.logger.log(`Menu demo: compuesto ${composite.sku} en tienda ${storeId}`);
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
    await this.dataSource.query('DELETE FROM product_options');
    await this.dataSource.query('DELETE FROM product_option_groups');
    await this.dataSource.query('DELETE FROM product_recipes');
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
