import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class SuppliersService {
  constructor(@InjectRepository(Supplier) private repo: Repository<Supplier>) {}

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

  async findOne(id: number, ctx: StoreContext) {
    const supplier = await this.repo.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Proveedor no encontrado');
    if (supplier.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Proveedor no pertenece a esta tienda');
    }
    return supplier;
  }

  async create(dto: CreateSupplierDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    return this.repo.save(this.repo.create({ ...dto, storeId }));
  }

  async update(id: number, dto: UpdateSupplierDto, ctx: StoreContext) {
    const supplier = await this.findOne(id, ctx);
    Object.assign(supplier, dto);
    return this.repo.save(supplier);
  }

  async remove(id: number, ctx: StoreContext) {
    const supplier = await this.findOne(id, ctx);
    await this.repo.remove(supplier);
    return { message: 'Proveedor eliminado' };
  }
}
