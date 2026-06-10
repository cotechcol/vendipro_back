import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem]), SettingsModule],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
