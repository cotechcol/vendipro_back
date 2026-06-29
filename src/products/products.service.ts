import {
  Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager, In, QueryFailedError } from 'typeorm';
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
import { StorageService } from '../storage/storage.service';
import { InventoryMovement } from '../inventory/entities/inventory-movement.entity';
import { SaleItem } from '../sales/entities/sale-item.entity';
import { PurchaseItem } from '../purchases/entities/purchase-item.entity';

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
    private storage: StorageService,
  ) {}

  private async enrichProduct(product: Product, sellableUnits?: number) {
    const { imageKey, ...rest } = product;
    const enriched: Record<string, unknown> = {
      ...rest,
      sellableUnits: sellableUnits ?? undefined,
      lowStock: isLowStock(product),
    };
    if (imageKey && this.storage.isConfigured()) {
      try {
        enriched.imageUrl = await this.storage.getSignedUrl(imageKey);
      } catch {
        // No bloquear listados si falla Supabase Storage
      }
    }
    return enriched;
  }

  private scopeStore(ctx: StoreContext): number {
    return requireStoreId(ctx);
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
    const result = [];
    for (const p of products) {
      const sellable = await getSellableUnits(this.repo.manager, p);
      (p as Product & { sellableUnits: number }).sellableUnits = sellable;
      result.push(await this.enrichProduct(p, sellable));
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
      if (dto.optionGroups?.some((g) => g.kind !== OptionGroupKind.ADDON)) {
        throw new BadRequestException('Los productos compuestos solo admiten adicionales');
      }
    }
    if (type === ProductType.SIMPLE) {
      if (dto.optionGroups?.some((g) => g.kind !== OptionGroupKind.ADDON)) {
        throw new BadRequestException('Los productos por unidad solo admiten adicionales');
      }
    }
    if (type === ProductType.BULK && !dto.stockUnit) {
      throw new BadRequestException('Indica la unidad del insumo (g, ml o uds)');
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
        variableScoops: hasOptions ? (dto.variableScoops ?? false) : false,
        scoopPrices: hasOptions && dto.variableScoops ? dto.scoopPrices ?? null : null,
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
          dto.stockUnit ?? StockUnit.G,
          dto.variableScoops ?? false,
        );
      } else if (productType === ProductType.COMPOSITE && dto.optionGroups?.length) {
        await this.saveOptionGroups(
          manager,
          saved.id,
          dto.optionGroups,
          1,
          1,
          storeId,
          StockUnit.UNIT,
          false,
        );
      } else if (productType === ProductType.SIMPLE && dto.optionGroups?.length) {
        await this.saveOptionGroups(
          manager,
          saved.id,
          dto.optionGroups,
          1,
          1,
          storeId,
          StockUnit.UNIT,
          false,
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

    if (existing.productType === ProductType.COMPOSITE && dto.optionGroups) {
      const invalid = dto.optionGroups.some((g) => g.kind !== OptionGroupKind.ADDON);
      if (invalid) {
        throw new BadRequestException('Los productos compuestos solo admiten adicionales');
      }
    }

    if (existing.productType === ProductType.SIMPLE && dto.optionGroups) {
      const invalid = dto.optionGroups.some((g) => g.kind !== OptionGroupKind.ADDON);
      if (invalid) {
        throw new BadRequestException('Los productos por unidad solo admiten adicionales');
      }
    }

    await this.dataSource.transaction(async (manager) => {
      const { recipe, optionGroups, ...scalarFields } = dto;
      const hasPortionOptions = optionGroups?.length && existing.productType === ProductType.PORTION;
      const hasCompositeAddons = optionGroups !== undefined && existing.productType === ProductType.COMPOSITE;
      const hasSimpleAddons = optionGroups !== undefined && existing.productType === ProductType.SIMPLE;

      if (hasPortionOptions) {
        const oldGroups = await manager.find(ProductOptionGroup, {
          where: { productId: existing.id },
          select: ['id'],
        });
        if (oldGroups.length) {
          await manager.delete(ProductOption, { groupId: In(oldGroups.map((g) => g.id)) });
          await manager.delete(ProductOptionGroup, { productId: existing.id });
        }
      }

      if (hasCompositeAddons || hasSimpleAddons) {
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
      if (hasPortionOptions) {
        productPatch.baseProductId = null;
        productPatch.scoopCount = dto.scoopCount ?? existing.scoopCount;
        productPatch.variableScoops = dto.variableScoops ?? existing.variableScoops;
        productPatch.scoopPrices = dto.variableScoops
          ? (dto.scoopPrices ?? existing.scoopPrices)
          : null;
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

      if (hasPortionOptions && optionGroups) {
        const portionUnit = dto.stockUnit ?? existing.stockUnit;
        await this.saveOptionGroups(
          manager,
          existing.id,
          optionGroups,
          dto.portionSize ?? Number(existing.portionSize),
          dto.scoopCount ?? existing.scoopCount ?? 1,
          existing.storeId,
          portionUnit,
          dto.variableScoops ?? existing.variableScoops ?? false,
        );
      }

      if ((hasCompositeAddons || hasSimpleAddons) && optionGroups) {
        await this.saveOptionGroups(
          manager,
          existing.id,
          optionGroups,
          1,
          1,
          existing.storeId,
          StockUnit.UNIT,
          false,
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
    variableScoops = false,
  ) {
    let sortOrder = 0;
    for (const groupDto of groups ?? []) {
      const isAddon = groupDto.kind === OptionGroupKind.ADDON;
      const isFlavor = groupDto.kind === OptionGroupKind.FLAVOR;
      const minSelect = isFlavor
        ? (variableScoops ? 1 : scoopCount)
        : isAddon
          ? 0
          : 1;
      const maxSelect = isFlavor
        ? scoopCount
        : isAddon
          ? Math.max(groupDto.options?.length ?? 0, 1)
          : minSelect;
      const group = await manager.save(manager.create(ProductOptionGroup, {
        productId,
        name: groupDto.name,
        kind: groupDto.kind,
        minSelect,
        maxSelect,
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

        const unitPrice = opt.unitPrice !== undefined && opt.unitPrice !== null
          ? Number(opt.unitPrice)
          : 0;

        await manager.save(manager.create(ProductOption, {
          groupId: group.id,
          name: opt.name,
          ingredientProductId: opt.ingredientProductId,
          quantity,
          unit,
          unitCost,
          unitPrice,
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
    const storeId = this.scopeStore(ctx);
    if (product.storeId !== storeId) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        await this.assertCanDeleteProduct(manager, id, storeId);
        await this.cleanupIngredientReferences(manager, id, storeId);

        const groups = await manager.find(ProductOptionGroup, { where: { productId: id } });
        if (groups.length) {
          await manager.delete(ProductOption, { groupId: In(groups.map((g) => g.id)) });
          await manager.delete(ProductOptionGroup, { productId: id });
        }
        await manager.delete(ProductRecipe, { productId: id });
        await manager.delete(InventoryMovement, { productId: id });
        await manager.delete(Product, { id });
      });
    } catch (err) {
      if (err instanceof BadRequestException || err instanceof NotFoundException || err instanceof ForbiddenException) {
        throw err;
      }
      if (err instanceof QueryFailedError && String(err.message).includes('foreign key constraint')) {
        throw new BadRequestException(
          'No se puede eliminar el producto porque tiene registros asociados (ventas, compras o uso como ingrediente).',
        );
      }
      throw err;
    }

    if (product.imageKey) {
      await this.storage.deleteObject(product.imageKey);
    }
    return { message: 'Producto eliminado' };
  }

  private async assertCanDeleteProduct(manager: EntityManager, productId: number, storeId: number) {
    const saleCount = await manager.count(SaleItem, { where: { productId } });
    if (saleCount > 0) {
      throw new BadRequestException(
        'No se puede eliminar: el producto tiene ventas registradas. Desactívalo en su lugar.',
      );
    }

    const purchaseCount = await manager.count(PurchaseItem, { where: { productId } });
    if (purchaseCount > 0) {
      throw new BadRequestException(
        'No se puede eliminar: el producto tiene compras registradas.',
      );
    }
  }

  /** Quita referencias de otros productos antes de borrar un insumo */
  private async cleanupIngredientReferences(
    manager: EntityManager,
    productId: number,
    storeId: number,
  ) {
    const options = await manager.find(ProductOption, { where: { ingredientProductId: productId } });
    if (options.length) {
      const groupIds = [...new Set(options.map((o) => o.groupId))];
      await manager.delete(ProductOption, { ingredientProductId: productId });
      for (const groupId of groupIds) {
        const remaining = await manager.count(ProductOption, { where: { groupId } });
        if (remaining === 0) {
          await manager.delete(ProductOptionGroup, { id: groupId });
        }
      }
    }

    await manager.delete(ProductRecipe, { ingredientProductId: productId });
    await manager.update(Product, { baseProductId: productId, storeId }, { baseProductId: null });
  }

  async uploadImage(id: number, file: Express.Multer.File, ctx: StoreContext) {
    if (!file) throw new BadRequestException('Selecciona una imagen');
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    const storeId = this.scopeStore(ctx);
    if (product.storeId !== storeId) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }

    const previousKey = product.imageKey;
    const imageKey = await this.storage.uploadProductImage(storeId, id, file);
    product.imageKey = imageKey;
    await this.repo.save(product);

    if (previousKey && previousKey !== imageKey) {
      await this.storage.deleteObject(previousKey);
    }

    const imageUrl = await this.storage.getSignedUrl(imageKey);
    return { imageUrl };
  }

  async getImageUrl(id: number, ctx: StoreContext) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }
    if (!product.imageKey) {
      throw new NotFoundException('Este producto no tiene imagen');
    }
    const imageUrl = await this.storage.getSignedUrl(product.imageKey);
    return { imageUrl };
  }

  async removeImage(id: number, ctx: StoreContext) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.storeId !== this.scopeStore(ctx)) {
      throw new ForbiddenException('Producto no pertenece a esta tienda');
    }
    if (product.imageKey) {
      await this.storage.deleteObject(product.imageKey);
      product.imageKey = null;
      await this.repo.save(product);
    }
    return { message: 'Imagen eliminada' };
  }
}
