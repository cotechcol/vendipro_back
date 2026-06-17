import { BadRequestException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductRecipe } from './entities/product-recipe.entity';
import { ProductOptionGroup } from './entities/product-option-group.entity';
import { InventoryMovement } from '../inventory/entities/inventory-movement.entity';
import { InventoryMovementType, OptionGroupKind, ProductType } from '../common/enums';

export interface StockDeduction {
  productId: number;
  productName: string;
  quantity: number;
}

function num(v: number | string | null | undefined): number {
  return Number(v ?? 0);
}

async function loadOptionGroups(manager: EntityManager, productId: number): Promise<ProductOptionGroup[]> {
  return manager.find(ProductOptionGroup, {
    where: { productId },
    relations: ['options', 'options.ingredient'],
    order: { sortOrder: 'ASC', id: 'ASC' },
  });
}

async function planPortionWithOptions(
  manager: EntityManager,
  product: Product,
  saleQty: number,
  storeId: number,
  selectedOptionIds: number[],
): Promise<StockDeduction[]> {
  const groups = product.optionGroups?.length
    ? product.optionGroups
    : await loadOptionGroups(manager, product.id);

  if (groups.length === 0) {
    throw new BadRequestException(`${product.name} no tiene opciones configuradas`);
  }

  const optionMap = new Map<number, { group: ProductOptionGroup; option: ProductOptionGroup['options'][0] }>();
  for (const group of groups) {
    for (const option of group.options ?? []) {
      optionMap.set(option.id, { group, option });
    }
  }

  const byGroup = new Map<number, number[]>();
  for (const optionId of selectedOptionIds) {
    const entry = optionMap.get(optionId);
    if (!entry) {
      throw new BadRequestException('Opción no válida para este producto');
    }
    const list = byGroup.get(entry.group.id) ?? [];
    list.push(optionId);
    byGroup.set(entry.group.id, list);
  }

  for (const group of groups) {
    const selected = byGroup.get(group.id) ?? [];
    if (selected.length < group.minSelect || selected.length > group.maxSelect) {
      throw new BadRequestException(
        `Selecciona ${group.minSelect} opción(es) de "${group.name}"`,
      );
    }
  }

  const totals = new Map<number, { name: string; quantity: number }>();

  for (const optionId of selectedOptionIds) {
    const { option } = optionMap.get(optionId)!;
    const ingredient = option.ingredient
      ?? await manager.findOne(Product, { where: { id: option.ingredientProductId, storeId } });
    if (!ingredient) {
      throw new BadRequestException(`Insumo de "${option.name}" no encontrado`);
    }

    const deduct = num(option.quantity) * saleQty;
    const prev = totals.get(ingredient.id);
    totals.set(ingredient.id, {
      name: ingredient.name,
      quantity: (prev?.quantity ?? 0) + deduct,
    });
  }

  const deductions: StockDeduction[] = [];
  for (const [productId, entry] of totals) {
    const ingredient = await manager.findOne(Product, { where: { id: productId, storeId } });
    if (!ingredient || num(ingredient.stock) < entry.quantity) {
      throw new BadRequestException(
        `Stock insuficiente de ${entry.name} (requiere ${entry.quantity} ${ingredient?.stockUnit ?? ''})`,
      );
    }
    deductions.push({ productId, productName: entry.name, quantity: entry.quantity });
  }

  return deductions;
}

export async function planStockDeductions(
  manager: EntityManager,
  product: Product,
  saleQty: number,
  storeId: number,
  selectedOptionIds?: number[],
): Promise<StockDeduction[]> {
  if (saleQty <= 0) {
    throw new BadRequestException('Cantidad inválida');
  }

  switch (product.productType) {
    case ProductType.SIMPLE: {
      if (num(product.stock) < saleQty) {
        throw new BadRequestException(`Stock insuficiente para ${product.name}`);
      }
      return [{ productId: product.id, productName: product.name, quantity: saleQty }];
    }

    case ProductType.BULK:
      throw new BadRequestException(`${product.name} es un insumo base y no se vende directamente`);

    case ProductType.PORTION: {
      const groups = product.optionGroups?.length
        ? product.optionGroups
        : await loadOptionGroups(manager, product.id);

      if (groups.length > 0) {
        if (!selectedOptionIds?.length) {
          throw new BadRequestException(`Selecciona sabor y envase para ${product.name}`);
        }
        return planPortionWithOptions(manager, product, saleQty, storeId, selectedOptionIds);
      }

      if (!product.baseProductId || !product.portionSize) {
        throw new BadRequestException(`${product.name} no tiene insumo base configurado`);
      }
      const base = await manager.findOne(Product, {
        where: { id: product.baseProductId, storeId },
      });
      if (!base) {
        throw new BadRequestException(`Insumo base de ${product.name} no encontrado`);
      }
      const deduct = num(product.portionSize) * saleQty;
      if (num(base.stock) < deduct) {
        throw new BadRequestException(
          `Stock insuficiente de ${base.name} (requiere ${deduct} ${base.stockUnit})`,
        );
      }
      return [{ productId: base.id, productName: base.name, quantity: deduct }];
    }

    case ProductType.COMPOSITE: {
      const recipes = await manager.find(ProductRecipe, {
        where: { productId: product.id },
        relations: ['ingredient'],
      });
      if (recipes.length === 0) {
        throw new BadRequestException(`${product.name} no tiene ingredientes en la receta`);
      }

      const deductions: StockDeduction[] = [];
      for (const line of recipes) {
        const ingredient = line.ingredient
          ?? await manager.findOne(Product, { where: { id: line.ingredientProductId, storeId } });
        if (!ingredient) {
          throw new BadRequestException(`Ingrediente no encontrado en receta de ${product.name}`);
        }
        const deduct = num(line.quantity) * saleQty;
        if (num(ingredient.stock) < deduct) {
          throw new BadRequestException(
            `Stock insuficiente de ${ingredient.name} (requiere ${deduct} ${ingredient.stockUnit})`,
          );
        }
        deductions.push({
          productId: ingredient.id,
          productName: ingredient.name,
          quantity: deduct,
        });
      }
      return deductions;
    }

    default:
      throw new BadRequestException('Tipo de producto no soportado');
  }
}

export async function applyStockDeductions(
  manager: EntityManager,
  deductions: StockDeduction[],
  storeId: number,
  userId: number,
  reference: string,
): Promise<void> {
  for (const d of deductions) {
    const product = await manager.findOne(Product, { where: { id: d.productId, storeId } });
    if (!product) continue;

    const stockBefore = num(product.stock);
    const stockAfter = Number((stockBefore - d.quantity).toFixed(3));
    product.stock = stockAfter;
    await manager.save(product);

    await manager.save(
      manager.create(InventoryMovement, {
        storeId,
        productId: product.id,
        type: InventoryMovementType.SALE,
        quantity: d.quantity,
        stockBefore,
        stockAfter,
        reference,
        userId,
      }),
    );
  }
}

async function sellableForPortionWithOptions(
  manager: EntityManager,
  product: Product,
): Promise<number> {
  const groups = product.optionGroups?.length
    ? product.optionGroups
    : await loadOptionGroups(manager, product.id);

  if (groups.length === 0 || !product.portionSize) return 0;

  const scoopCount = product.scoopCount ?? 1;
  let flavorUnits = Infinity;
  let containerUnits = Infinity;

  for (const group of groups) {
    if (group.kind === OptionGroupKind.FLAVOR) {
      let maxFlavor = 0;
      for (const option of group.options ?? []) {
        const ingredient = option.ingredient
          ?? await manager.findOne(Product, { where: { id: option.ingredientProductId } });
        if (!ingredient || num(option.quantity) <= 0) continue;
        maxFlavor = Math.max(maxFlavor, Math.floor(num(ingredient.stock) / num(option.quantity)));
      }
      flavorUnits = Math.floor(maxFlavor / scoopCount);
    }

    if (group.kind === OptionGroupKind.CONTAINER) {
      let maxContainer = 0;
      for (const option of group.options ?? []) {
        const ingredient = option.ingredient
          ?? await manager.findOne(Product, { where: { id: option.ingredientProductId } });
        if (!ingredient || num(option.quantity) <= 0) continue;
        maxContainer = Math.max(
          maxContainer,
          Math.floor(num(ingredient.stock) / num(option.quantity)),
        );
      }
      containerUnits = maxContainer;
    }
  }

  return Math.min(flavorUnits === Infinity ? 0 : flavorUnits, containerUnits === Infinity ? 0 : containerUnits);
}

/** Unidades vendibles en POS (simple, porción o compuesto según disponibilidad) */
export async function getSellableUnits(
  manager: EntityManager,
  product: Product,
): Promise<number> {
  switch (product.productType) {
    case ProductType.SIMPLE:
      return Math.floor(num(product.stock));

    case ProductType.BULK:
      return 0;

    case ProductType.PORTION: {
      const groups = product.optionGroups?.length
        ? product.optionGroups
        : await loadOptionGroups(manager, product.id);

      if (groups.length > 0) {
        return sellableForPortionWithOptions(manager, product);
      }

      if (!product.baseProductId || !product.portionSize) return 0;
      const base = product.baseProduct
        ?? await manager.findOne(Product, { where: { id: product.baseProductId } });
      if (!base || num(product.portionSize) <= 0) return 0;
      return Math.floor(num(base.stock) / num(product.portionSize));
    }

    case ProductType.COMPOSITE: {
      const recipes = product.recipe?.length
        ? product.recipe
        : await manager.find(ProductRecipe, {
            where: { productId: product.id },
            relations: ['ingredient'],
          });
      if (recipes.length === 0) return 0;

      let minUnits = Infinity;
      for (const line of recipes) {
        const ingredient = line.ingredient
          ?? await manager.findOne(Product, { where: { id: line.ingredientProductId } });
        if (!ingredient || num(line.quantity) <= 0) return 0;
        minUnits = Math.min(minUnits, Math.floor(num(ingredient.stock) / num(line.quantity)));
      }
      return minUnits === Infinity ? 0 : minUnits;
    }

    default:
      return 0;
  }
}

export function isLowStock(product: Product): boolean {
  return num(product.stock) <= num(product.minStock);
}
