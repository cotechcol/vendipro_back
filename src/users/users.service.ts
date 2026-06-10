import {
  Injectable, NotFoundException, ConflictException, BadRequestException, ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserRole } from '../common/enums';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId, storeWhere } from '../common/utils/store-context.util';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll(query: PaginationDto, ctx: StoreContext) {
    const { page = 1, limit = 10, search } = query;
    const scope = storeWhere(ctx);

    const qb = this.repo.createQueryBuilder('u')
      .leftJoinAndSelect('u.store', 'store')
      .orderBy('u.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .select(['u.id', 'u.name', 'u.email', 'u.role', 'u.active', 'u.storeId', 'u.createdAt', 'store.id', 'store.name']);

    if (scope.storeId) qb.andWhere('u.storeId = :storeId', { storeId: scope.storeId });
    if (search) qb.andWhere('(u.name LIKE :s OR u.email LIKE :s)', { s: `%${search}%` });

    const [data, total] = await qb.getManyAndCount();
    const mapped = data.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      active: u.active,
      storeId: u.storeId,
      storeName: u.store?.name ?? null,
      createdAt: u.createdAt,
    }));
    return { data: mapped, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number, ctx: StoreContext) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['store'],
      select: ['id', 'name', 'email', 'role', 'active', 'storeId', 'createdAt'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (!ctx.isSuperAdmin && user.storeId !== ctx.userStoreId) {
      throw new ForbiddenException('No tienes acceso a este usuario');
    }
    return {
      ...user,
      storeName: user.store?.name ?? null,
    };
  }

  async create(dto: CreateUserDto, ctx: StoreContext) {
    this.validateUserDto(dto.role, dto.storeId, ctx);

    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El email ya está registrado');

    const storeId = dto.role === UserRole.SUPER_ADMIN ? null : dto.storeId!;
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      role: dto.role,
      storeId,
      passwordHash: hash,
    });
    const saved = await this.repo.save(user);
    return this.findOne(saved.id, ctx);
  }

  async update(id: number, dto: UpdateUserDto, ctx: StoreContext) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (!ctx.isSuperAdmin && user.storeId !== ctx.userStoreId) {
      throw new ForbiddenException('No tienes acceso a este usuario');
    }

    if (dto.role || dto.storeId !== undefined) {
      const role = dto.role ?? user.role;
      const storeId = dto.storeId !== undefined ? dto.storeId : user.storeId ?? undefined;
      this.validateUserDto(role, storeId ?? undefined, ctx);
    }

    if (dto.email && dto.email !== user.email) {
      const exists = await this.repo.findOne({ where: { email: dto.email } });
      if (exists) throw new ConflictException('El email ya está registrado');
    }
    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }
    if (dto.role === UserRole.SUPER_ADMIN) {
      user.storeId = null;
    } else if (dto.storeId !== undefined) {
      user.storeId = dto.storeId;
    }
    Object.assign(user, {
      name: dto.name ?? user.name,
      email: dto.email ?? user.email,
      role: dto.role ?? user.role,
      active: dto.active ?? user.active,
    });
    await this.repo.save(user);
    return this.findOne(id, ctx);
  }

  async remove(id: number, ctx: StoreContext) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    if (!ctx.isSuperAdmin && user.storeId !== ctx.userStoreId) {
      throw new ForbiddenException('No tienes acceso a este usuario');
    }
    await this.repo.remove(user);
    return { message: 'Usuario eliminado' };
  }

  private validateUserDto(role: UserRole, storeId: number | undefined, ctx: StoreContext) {
    if (role === UserRole.SUPER_ADMIN) {
      if (!ctx.isSuperAdmin) throw new ForbiddenException('Solo super admin puede crear super admins');
      return;
    }
    if (!storeId) throw new BadRequestException('storeId es requerido para admin/cajero');
    if (!ctx.isSuperAdmin && storeId !== ctx.userStoreId) {
      throw new ForbiddenException('No puedes asignar usuarios a otra tienda');
    }
    requireStoreId({ ...ctx, activeStoreId: storeId, allStores: false });
  }
}
