import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { UpdateSettingDto } from './dto/setting.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class SettingsService {
  constructor(@InjectRepository(Setting) private repo: Repository<Setting>) {}

  async get(storeId: number) {
    let setting = await this.repo.findOne({ where: { storeId } });
    if (!setting) {
      setting = await this.repo.save(
        this.repo.create({ storeId, businessName: 'Mi Negocio POS', taxRate: 0.19, currency: 'COP' }),
      );
    }
    return setting;
  }

  async getForContext(ctx: StoreContext) {
    const storeId = requireStoreId(ctx);
    return this.get(storeId);
  }

  async getTaxRate(storeId: number): Promise<number> {
    const setting = await this.get(storeId);
    return Number(setting.taxRate);
  }

  async update(dto: UpdateSettingDto, ctx: StoreContext) {
    const storeId = requireStoreId(ctx);
    const setting = await this.get(storeId);
    Object.assign(setting, dto);
    return this.repo.save(setting);
  }
}
