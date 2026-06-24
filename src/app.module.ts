import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { StoreContextInterceptor } from './common/interceptors/store-context.interceptor';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SettingsModule } from './settings/settings.module';
import { InventoryModule } from './inventory/inventory.module';
import { PurchasesModule } from './purchases/purchases.module';
import { CashSessionsModule } from './cash-sessions/cash-sessions.module';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';
import { SeedModule } from './seed/seed.module';
import { StorageModule } from './storage/storage.module';
import { Store } from './stores/entities/store.entity';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { ProductRecipe } from './products/entities/product-recipe.entity';
import { ProductOptionGroup } from './products/entities/product-option-group.entity';
import { ProductOption } from './products/entities/product-option.entity';
import { Customer } from './customers/entities/customer.entity';
import { Supplier } from './suppliers/entities/supplier.entity';
import { Setting } from './settings/entities/setting.entity';
import { InventoryMovement } from './inventory/entities/inventory-movement.entity';
import { Purchase } from './purchases/entities/purchase.entity';
import { PurchaseItem } from './purchases/entities/purchase-item.entity';
import { CashSession } from './cash-sessions/entities/cash-session.entity';
import { Sale } from './sales/entities/sale.entity';
import { SaleItem } from './sales/entities/sale-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StorageModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get('DB_USERNAME', 'root'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_DATABASE', 'pos_db'),
        entities: [
          Store, User, Category, Product, ProductRecipe, ProductOptionGroup, ProductOption,
          Customer, Supplier, Setting,
          InventoryMovement, Purchase, PurchaseItem, CashSession, Sale, SaleItem,
        ],
        synchronize: false,
        timezone: 'Z',
        logging: process.env.NODE_ENV === 'production' ? ['error'] : true,
        retryAttempts: 3,
        retryDelay: 2000,
        extra: {
          connectionLimit: process.env.VERCEL ? 1 : 5,
          connectTimeout: 10_000,
        },
      }),
    }),
    AuthModule,
    StoresModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    CustomersModule,
    SuppliersModule,
    SettingsModule,
    InventoryModule,
    PurchasesModule,
    CashSessionsModule,
    SalesModule,
    ReportsModule,
    SeedModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: StoreContextInterceptor },
  ],
})
export class AppModule {}
