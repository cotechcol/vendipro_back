import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { InventoryMovement } from './entities/inventory-movement.entity';
import { Product } from '../products/entities/product.entity';
import { AdjustInventoryDto } from './dto/inventory.dto';
import { InventoryMovementType, ProductType } from '../common/enums';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';
import {
  computeProductionDeductions,
  planProductionDeductions,
} from '../products/product-stock.util';

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

  async productionPreview(productId: number, quantity: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const product = await this.productRepo.findOne({
      where: { id: productId, storeId },
      relations: ['recipe', 'recipe.ingredient'],
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.productType !== ProductType.PREPARED) {
      throw new BadRequestException('Solo productos elaborados tienen vista previa de producción');
    }

    const plan = await computeProductionDeductions(
      this.dataSource.manager,
      product,
      quantity,
      storeId,
    );

    const ingredients = await Promise.all(
      plan.deductions.map(async (d) => {
        const ingredient = await this.productRepo.findOne({ where: { id: d.productId, storeId } });
        const available = Number(ingredient?.stock ?? 0);
        return {
          productId: d.productId,
          name: d.productName,
          quantity: d.quantity,
          stockUnit: ingredient?.stockUnit ?? 'g',
          available,
          sufficient: available >= d.quantity,
        };
      }),
    );

    return {
      productId: product.id,
      productName: product.name,
      quantityProduced: quantity,
      recipeBatchSize: Number(product.recipeBatchSize),
      stockUnit: product.stockUnit,
      batches: plan.batches,
      ingredients,
      canProduce: ingredients.every((i) => i.sufficient),
    };
  }

  async adjust(dto: AdjustInventoryDto, userId: number, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    if (![InventoryMovementType.ADJUSTMENT_IN, InventoryMovementType.ADJUSTMENT_OUT].includes(dto.type)) {
      throw new BadRequestException('Tipo de ajuste inválido');
    }

    return this.dataSource.transaction(async (manager) => {
      const product = await manager.findOne(Product, {
        where: { id: dto.productId, storeId },
        relations: ['recipe', 'recipe.ingredient'],
      });
      if (!product) throw new NotFoundException('Producto no encontrado');

      const qty = Number(dto.quantity);
      if (qty <= 0) throw new BadRequestException('Cantidad inválida');

      if (
        product.productType === ProductType.PREPARED
        && dto.type === InventoryMovementType.ADJUSTMENT_IN
      ) {
        return this.executeProduction(manager, product, qty, dto.notes, userId, storeId);
      }

      const stockBefore = Number(product.stock);
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

  private async executeProduction(
    manager: typeof this.dataSource.manager,
    product: Product,
    quantityProduced: number,
    notes: string | undefined,
    userId: number,
    storeId: number,
  ) {
    const plan = await planProductionDeductions(manager, product, quantityProduced, storeId);
    const reference = `PROD-${Date.now()}`;
    const productionNote = notes?.trim()
      ? notes.trim()
      : `Producción de ${quantityProduced} ${product.stockUnit}`;

    for (const deduction of plan.deductions) {
      const ingredient = await manager.findOne(Product, { where: { id: deduction.productId, storeId } });
      if (!ingredient) {
        throw new BadRequestException(`Ingrediente ${deduction.productName} no encontrado`);
      }
      const stockBefore = Number(ingredient.stock);
      const stockAfter = Number((stockBefore - deduction.quantity).toFixed(3));
      ingredient.stock = stockAfter;
      await manager.save(ingredient);

      await manager.save(manager.create(InventoryMovement, {
        storeId,
        productId: ingredient.id,
        type: InventoryMovementType.ADJUSTMENT_OUT,
        quantity: deduction.quantity,
        stockBefore,
        stockAfter,
        notes: `Consumo producción: ${product.name}`,
        userId,
        reference,
      }));
    }

    const stockBefore = Number(product.stock);
    const stockAfter = Number((stockBefore + quantityProduced).toFixed(3));
    product.stock = stockAfter;
    await manager.save(product);

    const movement = await manager.save(manager.create(InventoryMovement, {
      storeId,
      productId: product.id,
      type: InventoryMovementType.PRODUCTION,
      quantity: quantityProduced,
      stockBefore,
      stockAfter,
      notes: productionNote,
      userId,
      reference,
    }));

    return movement;
  }
}
