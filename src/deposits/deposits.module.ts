import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerDeposit } from './entities/container-deposit.entity';
import { ContainerDepositReturn } from './entities/container-deposit-return.entity';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContainerDeposit, ContainerDepositReturn])],
  controllers: [DepositsController],
  providers: [DepositsService],
  exports: [DepositsService],
})
export class DepositsModule {}
