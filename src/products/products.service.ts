import {
  Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductRecipe } from './entities/product-recipe.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ProductType, StockUnit } from '../common/enums';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';
import { getSellableUnits, isLowStock } from './product-stock.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(ProductRecipe) private recipeRepo: Repository<ProductRecipe>,
    private dataSource: DataSource,
  ) {}

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
  }

  private enrichProduct(product: Product, sellableUnits?: number) {
    return {
      ...product,
      sellableUnits: sellableUnits ?? undefined,
      lowStock: isLowStock(product),
    };
  }

  async findAll(
    query: PaginationDto & { categoryId?: number; active?: boolean; productType?: ProductType },
    ctx: StoreContext,
  ) {
    const storeId = this.scopeStore(ctx);
    const { page = 1, limit = 10, search, categoryId, active, productType } = query;
    const qb = this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.baseProduct', 'baseProduct')
      .leftJoinAndSelect('p.recipe', 'recipe')
      .leftJoinAndSelect('recipe.ingredient', 'ingredient')
      .where('p.storeId = :storeId', { storeId })
      .orderBy('p.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    if (search) qb.andWhere('(p.name LIKE :s OR p.sku LIKE :s)', { s: `%${search}%` });
    if (categoryId) qb.andWhere('p.categoryId = :categoryId', { categoryId });
    if (active !== undefined) qb.andWhere('p.active = :active', { active });
    if (productType) qb.andWhere('p.productType = :productType', { productType });

    const [rows, total] = await qb.getManyAndCount();
    const data = await Promise.all(
      rows.map(async (p) => {
        const sellable = p.productType === ProductType.BULK
          ? undefined
          : await getSellableUnits(this.repo.manager, p);
        return this.enrichProduct(p, sellable);
      }),
    );

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findBulkProducts(ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    return this.repo.find({
      where: { storeId, productType: ProductType.BULK, active: true },
      order: { name: 'ASC' },
    });
  }

  async findForPos(search: string | undefined, categoryId: number | undefined, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const qb = this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.baseProduct', 'baseProduct')
      .leftJoinAndSelect('p.recipe', 'recipe')
      .leftJoinAndSelect('recipe.ingredient', 'ingredient')
      .where('p.storeId = :storeId', { storeId })
      .andWhere('p.active = true')
      .andWhere('p.productType != :bulk', { bulk: ProductType.BULK })
      .orderBy('p.name', 'ASC');

    if (search) qb.andWhere('(p.name LIKE :s OR p.sku LIKE :s)', { s: `%${search}%` });
    if (categoryId) qb.andWhere('p.categoryId = :categoryId', { categoryId });

    const products = await qb.getMany();
    const available: Product[] = [];
    for (const p of products) {
      const sellable = await getSellableUnits(this.repo.manager, p);
      if (sellable > 0) {
        (p as Product & { sellableUnits: number }).sellableUnits = sellable;
        available.push(p);
      }
    }
    return available;
  }

  async findLowStock(ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const products = await this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .where('p.storeId = :storeId', { storeId })
      .andWhere('p.active = true')
      .andWhere('p.productType IN (:...types)', { types: [ProductType.SIMPLE, ProductType.BULK] })
      .andWhere('p.stock <= p.minStock')
      .orderBy('p.stock', 'ASC')
      .getMany();
    return products;
  }

  async findOne(id: number, ctx: StoreContext) {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['category', 'baseProduct', 'recipe', 'recipe.ingredient'],
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }
    const sellable = product.productType === ProductType.BULK
      ? undefined
      : await getSellableUnits(this.repo.manager, product);
    return this.enrichProduct(product, sellable);
  }

  private validateProductDto(dto: CreateProductDto | UpdateProductDto, type: ProductType, storeId: number) {
    if (type === ProductType.PORTION) {
      if (!('baseProductId' in dto) || !dto.baseProductId) {
        throw new BadRequestException('Selecciona el insumo base');
      }
      if (!('portionSize' in dto) || !dto.portionSize) {
        throw new BadRequestException('Indica cuántos gramos/ml descuenta cada venta');
      }
    }
    if (type === ProductType.COMPOSITE) {
      if (!('recipe' in dto) || !dto.recipe?.length) {
        throw new BadRequestException('Agrega al menos un ingrediente a la receta');
      }
    }
    if (type === ProductType.BULK && !dto.stockUnit) {
      throw new BadRequestException('Indica la unidad del insumo (g o ml)');
    }
    return storeId;
  }

  async create(dto: CreateProductDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const exists = await this.repo.findOne({ where: { storeId, sku: dto.sku } });
    if (exists) throw new ConflictException('El SKU ya existe en esta tienda');

    const productType = dto.productType ?? ProductType.SIMPLE;
    this.validateProductDto(dto, productType, storeId);

    if (dto.baseProductId) {
      const base = await this.repo.findOne({ where: { id: dto.baseProductId, storeId } });
      if (!base || base.productType !== ProductType.BULK) {
        throw new BadRequestException('El insumo base debe ser un producto tipo bulk');
      }
    }

    return this.dataSource.transaction(async (manager) => {
      const product = manager.create(Product, {
        ...dto,
        storeId,
        productType,
        stockUnit: dto.stockUnit ?? (productType === ProductType.BULK ? StockUnit.G : StockUnit.UNIT),
        stock: productType === ProductType.PORTION || productType === ProductType.COMPOSITE ? 0 : (dto.stock ?? 0),
        salePrice: productType === ProductType.BULK ? 0 : dto.salePrice,
      });
      const saved = await manager.save(product);

      if (productType === ProductType.COMPOSITE && dto.recipe) {
        for (const line of dto.recipe) {
          await this.validateIngredient(manager, line.ingredientProductId, storeId);
          await manager.save(manager.create(ProductRecipe, {
            productId: saved.id,
            ingredientProductId: line.ingredientProductId,
            quantity: line.quantity,
            unit: line.unit ?? StockUnit.G,
          }));
        }
      }

      return this.findOne(saved.id, ctx);
    });
  }

  async update(id: number, dto: UpdateProductDto, ctx: StoreContext) {
    const existing = await this.repo.findOne({
      where: { id },
      relations: ['recipe'],
    });
    if (!existing) throw new NotFoundException('Producto no encontrado');
    if (existing.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }
    if (dto.sku && dto.sku !== existing.sku) {
      const exists = await this.repo.findOne({ where: { storeId: existing.storeId, sku: dto.sku } });
      if (exists) throw new ConflictException('El SKU ya existe en esta tienda');
    }

    if (dto.recipe && existing.productType !== ProductType.COMPOSITE) {
      throw new BadRequestException('Solo productos compuestos tienen receta');
    }

    return this.dataSource.transaction(async (manager) => {
      Object.assign(existing, dto);
      await manager.save(Product, existing);

      if (dto.recipe && existing.productType === ProductType.COMPOSITE) {
        await manager.delete(ProductRecipe, { productId: existing.id });
        for (const line of dto.recipe) {
          await this.validateIngredient(manager, line.ingredientProductId, existing.storeId);
          await manager.save(manager.create(ProductRecipe, {
            productId: existing.id,
            ingredientProductId: line.ingredientProductId,
            quantity: line.quantity,
            unit: line.unit ?? StockUnit.G,
          }));
        }
      }

      return this.findOne(existing.id, ctx);
    });
  }

  private async validateIngredient(manager: typeof this.dataSource.manager, ingredientId: number, storeId: number) {
    const ingredient = await manager.findOne(Product, { where: { id: ingredientId, storeId } });
    if (!ingredient) {
      throw new BadRequestException(`Ingrediente ${ingredientId} no encontrado`);
    }
    if (![ProductType.BULK, ProductType.SIMPLE].includes(ingredient.productType)) {
      throw new BadRequestException(`${ingredient.name} no puede ser ingrediente`);
    }
  }

  async remove(id: number, ctx: StoreContext) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }
    await this.repo.remove(product);
    return { message: 'Producto eliminado' };
  }
}
