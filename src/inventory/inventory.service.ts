import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InventoryMovement } from './entities/inventory-movement.entity';
import { Product } from '../products/entities/product.entity';
import { AdjustInventoryDto } from './dto/inventory.dto';
import { InventoryMovementType } from '../common/enums';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryMovement) private movementRepo: Repository<InventoryMovement>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  async getMovements(query: PaginationDto & { productId?: number }, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const { page = 1, limit = 10, productId } = query;
    const qb = this.movementRepo.createQueryBuilder('m')
      .leftJoinAndSelect('m.product', 'product')
      .leftJoinAndSelect('m.user', 'user')
      .where('m.storeId = :storeId', { storeId })
      .orderBy('m.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (productId) qb.andWhere('m.productId = :productId', { productId });
    const [data, total] = await qb.getManyAndCount();
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async adjust(dto: AdjustInventoryDto, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    if (![InventoryMovementType.ADJUSTMENT_IN, InventoryMovementType.ADJUSTMENT_OUT].includes(dto.type)) {
      throw new BadRequestException('Tipo de ajuste inválido');
    }

    return this.dataSource.transaction(async (manager) => {
      const product = await manager.findOne(Product, { where: { id: dto.productId, storeId } });
      if (!product) throw new NotFoundException('Producto no encontrado');

      const stockBefore = Number(product.stock);
      const qty = Number(dto.quantity);
      let stockAfter: number;

      if (dto.type === InventoryMovementType.ADJUSTMENT_IN) {
        stockAfter = Number((stockBefore + qty).toFixed(3));
      } else {
        if (stockBefore < qty) {
          throw new BadRequestException('Stock insuficiente para el ajuste');
        }
        stockAfter = Number((stockBefore - qty).toFixed(3));
      }

      product.stock = stockAfter;
      await manager.save(product);

      const movement = manager.create(InventoryMovement, {
        storeId,
        productId: dto.productId,
        type: dto.type,
        quantity: dto.quantity,
        stockBefore,
        stockAfter,
        notes: dto.notes,
        userId,
        reference: `ADJ-${Date.now()}`,
      });
      await manager.save(movement);
      return movement;
    });
  }
}
