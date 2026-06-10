import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Setting } from '../settings/entities/setting.entity';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Setting])],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}
