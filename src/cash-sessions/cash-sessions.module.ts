import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashSession } from './entities/cash-session.entity';
import { Sale } from '../sales/entities/sale.entity';
import { CashSessionsService } from './cash-sessions.service';
import { CashSessionsController } from './cash-sessions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CashSession, Sale])],
  controllers: [CashSessionsController],
  providers: [CashSessionsService],
  exports: [CashSessionsService],
})
export class CashSessionsModule {}
