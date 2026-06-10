import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { Setting } from '../settings/entities/setting.entity';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import type { StoreContext } from '../common/utils/store-context.util';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private repo: Repository<Store>,
    @InjectRepository(Setting) private settingsRepo: Repository<Setting>,
  ) {}

  async findAll(ctx: StoreContext) {
    if (ctx.isSuperAdmin && ctx.allStores) {
      return this.repo.find({ order: { name: 'ASC' } });
    }
    const storeId = ctx.activeStoreId ?? ctx.userStoreId;
    if (!storeId) return [];
    const store = await this.repo.findOne({ where: { id: storeId } });
    return store ? [store] : [];
  }

  async findOne(id: number) {
    const store = await this.repo.findOne({ where: { id } });
    if (!store) throw new NotFoundException('Tienda no encontrada');
    return store;
  }

  async create(dto: CreateStoreDto) {
    const exists = await this.repo.findOne({ where: { code: dto.code } });
    if (exists) throw new ConflictException('El código de tienda ya existe');

    const store = await this.repo.save(this.repo.create(dto));

    await this.settingsRepo.save(
      this.settingsRepo.create({
        storeId: store.id,
        businessName: dto.name,
        address: dto.address,
        phone: dto.phone,
        taxRate: 0.19,
        currency: 'COP',
      }),
    );

    return store;
  }

  async update(id: number, dto: UpdateStoreDto) {
    const store = await this.findOne(id);
    Object.assign(store, dto);
    return this.repo.save(store);
  }

  async deactivate(id: number) {
    return this.update(id, { active: false });
  }
}
