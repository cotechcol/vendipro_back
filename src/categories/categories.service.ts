import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async findAll(query: PaginationDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const { page = 1, limit = 10, search } = query;
    const where: Record<string, unknown> = { storeId };
    if (search) where.name = Like(`%${search}%`);
    const [data, total] = await this.repo.findAndCount({
      where,
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findAllActive(ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    return this.repo.find({ where: { storeId, active: true }, order: { name: 'ASC' } });
  }

  async findOne(id: number, ctx: StoreContext) {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Categoría no encontrada');
    if (cat.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Categoría no pertenece a esta tienda');
    }
    return cat;
  }

  async create(dto: CreateCategoryDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    return this.repo.save(this.repo.create({ ...dto, storeId }));
  }

  async update(id: number, dto: UpdateCategoryDto, ctx: StoreContext) {
    const cat = await this.findOne(id, ctx);
    Object.assign(cat, dto);
    return this.repo.save(cat);
  }

  async remove(id: number, ctx: StoreContext) {
    const cat = await this.findOne(id, ctx);
    await this.repo.remove(cat);
    return { message: 'Categoría eliminada' };
  }
}
