import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async findAll(
    query: PaginationDto & { categoryId?: number; active?: boolean },
    ctx: StoreContext,
  ) {
    const storeId = this.scopeStore(ctx);
    const { page = 1, limit = 10, search, categoryId, active } = query;
    const qb = this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .where('p.storeId = :storeId', { storeId })
      .orderBy('p.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) qb.andWhere('(p.name LIKE :s OR p.sku LIKE :s)', { s: `%${search}%` });
    if (categoryId) qb.andWhere('p.categoryId = :categoryId', { categoryId });
    if (active !== undefined) qb.andWhere('p.active = :active', { active });

    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findForPos(search: string | undefined, categoryId: number | undefined, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const qb = this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .where('p.storeId = :storeId', { storeId })
      .andWhere('p.active = true')
      .andWhere('p.stock > 0')
      .orderBy('p.name', 'ASC');

    if (search) qb.andWhere('(p.name LIKE :s OR p.sku LIKE :s)', { s: `%${search}%` });
    if (categoryId) qb.andWhere('p.categoryId = :categoryId', { categoryId });
    return qb.getMany();
  }

  async findLowStock(ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    return this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .where('p.storeId = :storeId', { storeId })
      .andWhere('p.active = true')
      .andWhere('p.stock <= p.minStock')
      .orderBy('p.stock', 'ASC')
      .getMany();
  }

  async findOne(id: number, ctx: StoreContext) {
    const product = await this.repo.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }
    return product;
  }

  async create(dto: CreateProductDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const exists = await this.repo.findOne({ where: { storeId, sku: dto.sku } });
    if (exists) throw new ConflictException('El SKU ya existe en esta tienda');
    return this.repo.save(this.repo.create({ ...dto, storeId }));
  }

  async update(id: number, dto: UpdateProductDto, ctx: StoreContext) {
    const product = await this.findOne(id, ctx);
    if (dto.sku && dto.sku !== product.sku) {
      const exists = await this.repo.findOne({ where: { storeId: product.storeId, sku: dto.sku } });
      if (exists) throw new ConflictException('El SKU ya existe en esta tienda');
    }
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number, ctx: StoreContext) {
    const product = await this.findOne(id, ctx);
    await this.repo.remove(product);
    return { message: 'Producto eliminado' };
  }
}
