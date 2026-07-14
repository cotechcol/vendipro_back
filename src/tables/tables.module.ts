import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesModule } from '../sales/sales.module';
import { RestaurantTable } from './entities/restaurant-table.entity';
import { TableOrder } from './entities/table-order.entity';
import { TableOrderItem } from './entities/table-order-item.entity';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantTable, TableOrder, TableOrderItem]),
    SalesModule,
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
