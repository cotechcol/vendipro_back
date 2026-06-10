import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async findAll(query: PaginationDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const { page = 1, limit = 10, search } = query;
    const qb = this.repo.createQueryBuilder('c')
      .where('c.storeId = :storeId', { storeId })
      .orderBy('c.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);
    if (search) {
      qb.andWhere('(c.name LIKE :s OR c.phone LIKE :s OR c.email LIKE :s)', { s: `%${search}%` });
    }
    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, ctx: StoreContext) {
    const customer = await this.repo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException('Cliente no encontrado');
    if (customer.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Cliente no pertenece a esta tienda');
    }
    return customer;
  }

  async create(dto: CreateCustomerDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    return this.repo.save(this.repo.create({ ...dto, storeId }));
  }

  async update(id: number, dto: UpdateCustomerDto, ctx: StoreContext) {
    const customer = await this.findOne(id, ctx);
    Object.assign(customer, dto);
    return this.repo.save(customer);
  }

  async remove(id: number, ctx: StoreContext) {
    const customer = await this.findOne(id, ctx);
    await this.repo.remove(customer);
    return { message: 'Cliente eliminado' };
  }
}
