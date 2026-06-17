import {
  Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductRecipe } from './entities/product-recipe.entity';
import { ProductOptionGroup } from './entities/product-option-group.entity';
import { ProductOption } from './entities/product-option.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { OptionGroupKind, ProductType, StockUnit } from '../common/enums';
import type { StoreContext } from '../common/utils/store-context.util';
import { requireStoreId } from '../common/utils/store-context.util';
import { getSellableUnits, isLowStock } from './product-stock.util';

const PRODUCT_RELATIONS = [
  'category',
  'baseProduct',
  'recipe',
  'recipe.ingredient',
  'optionGroups',
  'optionGroups.options',
  'optionGroups.options.ingredient',
] as const;

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
      .leftJoinAndSelect('p.optionGroups', 'optionGroups')
      .leftJoinAndSelect('optionGroups.options', 'options')
      .leftJoinAndSelect('options.ingredient', 'optionIngredient')
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
      .leftJoinAndSelect('p.optionGroups', 'optionGroups')
      .leftJoinAndSelect('optionGroups.options', 'options')
      .leftJoinAndSelect('options.ingredient', 'optionIngredient')
      .where('p.storeId = :storeId', { storeId })
      .andWhere('p.active = true')
      .andWhere('p.visibleInPos = true')
      .andWhere('p.productType != :bulk', { bulk: ProductType.BULK })
      .orderBy('p.name', 'ASC');

    if (search) qb.andWhere('(p.name LIKE :s OR p.sku LIKE :s)', { s: `%${search}%` });
    if (categoryId) qb.andWhere('p.categoryId = :categoryId', { categoryId });

    const products = await qb.getMany();
    const result: Product[] = [];
    for (const p of products) {
      const sellable = await getSellableUnits(this.repo.manager, p);
      (p as Product & { sellableUnits: number }).sellableUnits = sellable;
      result.push(p);
    }
    return result;
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
      relations: [...PRODUCT_RELATIONS],
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

  private validateProductDto(dto: CreateProductDto | UpdateProductDto, type: ProductType) {
    if (type === ProductType.PORTION) {
      const hasOptions = 'optionGroups' in dto && dto.optionGroups?.length;
      if (!hasOptions) {
        if (!('baseProductId' in dto) || !dto.baseProductId) {
          throw new BadRequestException('Selecciona el insumo base o configura sabores');
        }
      } else {
        if (!('scoopCount' in dto) || !dto.scoopCount) {
          throw new BadRequestException('Indica cuántas bolas incluye el helado');
        }
        const flavorGroup = dto.optionGroups!.find((g) => g.kind === OptionGroupKind.FLAVOR);
        const containerGroup = dto.optionGroups!.find((g) => g.kind === OptionGroupKind.CONTAINER);
        if (!flavorGroup?.options?.length) {
          throw new BadRequestException('Agrega al menos un sabor');
        }
        if (!containerGroup?.options?.length) {
          throw new BadRequestException('Agrega al menos un envase (galleta o vaso)');
        }
      }
      if (!('portionSize' in dto) || !dto.portionSize) {
        throw new BadRequestException('Indica cuántos gramos/ml descuenta cada bola');
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
  }

  async create(dto: CreateProductDto, ctx: StoreContext) {
    const storeId = this.scopeStore(ctx);
    const exists = await this.repo.findOne({ where: { storeId, sku: dto.sku } });
    if (exists) throw new ConflictException('El SKU ya existe en esta tienda');

    const productType = dto.productType ?? ProductType.SIMPLE;
    this.validateProductDto(dto, productType);

    if (dto.baseProductId) {
      const base = await this.repo.findOne({ where: { id: dto.baseProductId, storeId } });
      if (!base || base.productType !== ProductType.BULK) {
        throw new BadRequestException('El insumo base debe ser un producto tipo bulk');
      }
    }

    let savedId = 0;
    await this.dataSource.transaction(async (manager) => {
      const hasOptions = productType === ProductType.PORTION && dto.optionGroups?.length;
      const product = manager.create(Product, {
        ...dto,
        storeId,
        productType,
        stockUnit: dto.stockUnit ?? (
          productType === ProductType.BULK ? StockUnit.G
            : productType === ProductType.PORTION ? StockUnit.G
              : StockUnit.UNIT
        ),
        stock: productType === ProductType.PORTION || productType === ProductType.COMPOSITE ? 0 : (dto.stock ?? 0),
        salePrice: productType === ProductType.BULK ? 0 : dto.salePrice,
        baseProductId: hasOptions ? null : (dto.baseProductId ?? null),
        scoopCount: hasOptions ? dto.scoopCount : null,
        visibleInPos: dto.visibleInPos ?? productType !== ProductType.BULK,
      });
      const saved = await manager.save(product);
      savedId = saved.id;

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

      if (hasOptions && dto.optionGroups) {
        await this.saveOptionGroups(
          manager,
          saved.id,
          dto.optionGroups,
          dto.portionSize!,
          dto.scoopCount!,
          storeId,
          dto.stockUnit === StockUnit.ML ? StockUnit.ML : StockUnit.G,
        );
      }
    });

    return this.findOne(savedId, ctx);
  }

  async update(id: number, dto: UpdateProductDto, ctx: StoreContext) {
    const existing = await this.repo.findOne({ where: { id } });
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

    if (existing.productType === ProductType.PORTION && dto.optionGroups) {
      this.validateProductDto(
        { ...dto, productType: ProductType.PORTION } as CreateProductDto,
        ProductType.PORTION,
      );
    }

    await this.dataSource.transaction(async (manager) => {
      const { recipe, optionGroups, ...scalarFields } = dto;
      const hasOptions = optionGroups?.length;

      if (optionGroups && existing.productType === ProductType.PORTION) {
        const oldGroups = await manager.find(ProductOptionGroup, {
          where: { productId: existing.id },
          select: ['id'],
        });
        if (oldGroups.length) {
          await manager.delete(ProductOption, { groupId: In(oldGroups.map((g) => g.id)) });
          await manager.delete(ProductOptionGroup, { productId: existing.id });
        }
      }

      if (recipe && existing.productType === ProductType.COMPOSITE) {
        await manager.delete(ProductRecipe, { productId: existing.id });
      }

      const productPatch: Record<string, unknown> = { ...scalarFields };
      if (hasOptions) {
        productPatch.baseProductId = null;
        productPatch.scoopCount = dto.scoopCount ?? existing.scoopCount;
      }
      if (Object.keys(productPatch).length > 0) {
        await manager.update(Product, { id: existing.id }, productPatch);
      }

      if (recipe && existing.productType === ProductType.COMPOSITE) {
        for (const line of recipe) {
          await this.validateIngredient(manager, line.ingredientProductId, existing.storeId);
          await manager.save(manager.create(ProductRecipe, {
            productId: existing.id,
            ingredientProductId: line.ingredientProductId,
            quantity: line.quantity,
            unit: line.unit ?? StockUnit.G,
          }));
        }
      }

      if (optionGroups && existing.productType === ProductType.PORTION) {
        const portionUnit = dto.stockUnit ?? existing.stockUnit;
        await this.saveOptionGroups(
          manager,
          existing.id,
          optionGroups,
          dto.portionSize ?? Number(existing.portionSize),
          dto.scoopCount ?? existing.scoopCount ?? 1,
          existing.storeId,
          portionUnit === StockUnit.ML ? StockUnit.ML : StockUnit.G,
        );
      }
    });

    return this.findOne(existing.id, ctx);
  }

  private async saveOptionGroups(
    manager: EntityManager,
    productId: number,
    groups: CreateProductDto['optionGroups'],
    portionSize: number,
    scoopCount: number,
    storeId: number,
    portionUnit: StockUnit = StockUnit.G,
  ) {
    let sortOrder = 0;
    for (const groupDto of groups ?? []) {
      const minSelect = groupDto.kind === OptionGroupKind.FLAVOR ? scoopCount : 1;
      const group = await manager.save(manager.create(ProductOptionGroup, {
        productId,
        name: groupDto.name,
        kind: groupDto.kind,
        minSelect,
        maxSelect: minSelect,
        sortOrder: sortOrder++,
      }));

      for (const opt of groupDto.options) {
        await this.validateIngredient(manager, opt.ingredientProductId, storeId);
        const quantity = opt.quantity
          ?? (groupDto.kind === OptionGroupKind.FLAVOR ? portionSize : 1);
        const unit = opt.unit
          ?? (groupDto.kind === OptionGroupKind.FLAVOR ? portionUnit : StockUnit.UNIT);

        let unitCost = opt.unitCost !== undefined && opt.unitCost !== null
          ? Number(opt.unitCost)
          : null;
        if (unitCost === null) {
          const ingredient = await manager.findOne(Product, {
            where: { id: opt.ingredientProductId, storeId },
          });
          if (ingredient) {
            unitCost = Number((Number(ingredient.costPrice) * Number(quantity)).toFixed(2));
          } else {
            unitCost = 0;
          }
        }

        await manager.save(manager.create(ProductOption, {
          groupId: group.id,
          name: opt.name,
          ingredientProductId: opt.ingredientProductId,
          quantity,
          unit,
          unitCost,
        }));
      }
    }
  }

  private async validateIngredient(manager: EntityManager, ingredientId: number, storeId: number) {
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
