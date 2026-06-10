import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../stores/entities/store.entity';
import { User } from '../users/entities/user.entity';
import { Setting } from '../settings/entities/setting.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Purchase } from '../purchases/entities/purchase.entity';
import { PurchaseItem } from '../purchases/entities/purchase-item.entity';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, User, Setting, Category, Product, Customer, Supplier, Purchase, PurchaseItem]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
