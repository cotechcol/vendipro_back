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

async function expandIngredientDeductions(
  manager: EntityManager,
  ingredient: Product,
  saleQty: number,
  storeId: number,
): Promise<StockDeduction[]> {
  if (ingredient.productType === ProductType.COMPOSITE) {
    const recipes = await manager.find(ProductRecipe, {
      where: { productId: ingredient.id },
      relations: ['ingredient'],
    });
    if (!recipes.length) {
      throw new BadRequestException(`${ingredient.name} no tiene receta para usar como adicional`);
    }
    return recipes.map((line) => ({
      productId: line.ingredientProductId,
      productName: line.ingredient?.name ?? ingredient.name,
      quantity: num(line.quantity) * saleQty,
    }));
  }

  return [{
    productId: ingredient.id,
    productName: ingredient.name,
    quantity: saleQty,
  }];
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
    if (!option.ingredientProductId) {
      throw new BadRequestException(`"${option.name}" no tiene insumo configurado`);
    }
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
      const groups = product.optionGroups?.length
        ? product.optionGroups
        : await loadOptionGroups(manager, product.id);

      const hasAddons = groups.some((g) => g.kind === OptionGroupKind.ADDON);
      if (hasAddons) {
        if (num(product.stock) < saleQty) {
          throw new BadRequestException(`Stock insuficiente para ${product.name}`);
        }
        const deductions: StockDeduction[] = [{
          productId: product.id,
          productName: product.name,
          quantity: saleQty,
        }];
        if (selectedOptionIds?.length) {
          const addonDeductions = await planAddonDeductions(
            manager,
            product,
            saleQty,
            storeId,
            selectedOptionIds,
          );
          for (const addon of addonDeductions) {
            const existing = deductions.find((d) => d.productId === addon.productId);
            if (existing) {
              existing.quantity += addon.quantity;
            } else {
              deductions.push(addon);
            }
          }
          for (const d of deductions) {
            if (d.productId === product.id) continue;
            const ingredient = await manager.findOne(Product, { where: { id: d.productId, storeId } });
            if (!ingredient || num(ingredient.stock) < d.quantity) {
              throw new BadRequestException(
                `Stock insuficiente de ${d.productName} (requiere ${d.quantity} ${ingredient?.stockUnit ?? ''})`,
              );
            }
          }
        }
        return deductions;
      }

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

      if (selectedOptionIds?.length) {
        const addonDeductions = await planAddonDeductions(
          manager,
          product,
          saleQty,
          storeId,
          selectedOptionIds,
        );
        for (const addon of addonDeductions) {
          const existing = deductions.find((d) => d.productId === addon.productId);
          if (existing) {
            existing.quantity += addon.quantity;
          } else {
            deductions.push(addon);
          }
        }
        for (const d of deductions) {
          const ingredient = await manager.findOne(Product, { where: { id: d.productId, storeId } });
          if (!ingredient || num(ingredient.stock) < d.quantity) {
            throw new BadRequestException(
              `Stock insuficiente de ${d.productName} (requiere ${d.quantity} ${ingredient?.stockUnit ?? ''})`,
            );
          }
        }
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
  const minScoops = product.variableScoops ? 1 : scoopCount;
  let flavorUnits = Infinity;
  let containerUnits = Infinity;

  for (const group of groups) {
    if (group.kind === OptionGroupKind.FLAVOR) {
      let maxFlavor = 0;
      for (const option of group.options ?? []) {
        if (!option.ingredientProductId) continue;
        const ingredient = option.ingredient
          ?? await manager.findOne(Product, { where: { id: option.ingredientProductId } });
        if (!ingredient || num(option.quantity) <= 0) continue;
        maxFlavor = Math.max(maxFlavor, Math.floor(num(ingredient.stock) / num(option.quantity)));
      }
      flavorUnits = Math.floor(maxFlavor / minScoops);
    }

    if (group.kind === OptionGroupKind.CONTAINER) {
      let maxContainer = 0;
      for (const option of group.options ?? []) {
        if (!option.ingredientProductId) continue;
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

function resolveOptionUnitCost(option: ProductOptionGroup['options'][0]): number {
  const stored = num(option.unitCost);
  if (stored > 0) return stored;
  const ingredient = option.ingredient;
  if (!ingredient) return 0;
  return Number((num(ingredient.costPrice) * num(option.quantity)).toFixed(2));
}

function buildOptionLookup(product: Product): {
  optionMap: Map<number, ProductOptionGroup['options'][0]>;
  groupByOptionId: Map<number, ProductOptionGroup>;
} {
  const optionMap = new Map<number, ProductOptionGroup['options'][0]>();
  const groupByOptionId = new Map<number, ProductOptionGroup>();
  for (const group of product.optionGroups ?? []) {
    for (const option of group.options ?? []) {
      optionMap.set(option.id, option);
      groupByOptionId.set(option.id, group);
    }
  }
  return { optionMap, groupByOptionId };
}

async function planAddonDeductions(
  manager: EntityManager,
  product: Product,
  saleQty: number,
  storeId: number,
  selectedOptionIds: number[],
): Promise<StockDeduction[]> {
  const groups = product.optionGroups?.length
    ? product.optionGroups
    : await loadOptionGroups(manager, product.id);

  const addonGroups = groups.filter((g) => g.kind === OptionGroupKind.ADDON);
  if (!addonGroups.length) return [];

  const optionMap = new Map<number, ProductOptionGroup['options'][0]>();
  const addonOptionIds = new Set<number>();
  for (const group of addonGroups) {
    for (const option of group.options ?? []) {
      optionMap.set(option.id, option);
      addonOptionIds.add(option.id);
    }
  }

  const selectedAddons = selectedOptionIds.filter((id) => addonOptionIds.has(id));
  if (!selectedAddons.length) return [];

  const byGroup = new Map<number, number[]>();
  for (const optionId of selectedAddons) {
    const option = optionMap.get(optionId);
    if (!option) {
      throw new BadRequestException('Adicional no válido para este producto');
    }
    const group = addonGroups.find((g) => g.options?.some((o) => o.id === optionId));
    if (!group) continue;
    const list = byGroup.get(group.id) ?? [];
    list.push(optionId);
    byGroup.set(group.id, list);
  }

  for (const group of addonGroups) {
    const selected = byGroup.get(group.id) ?? [];
    if (selected.length < group.minSelect || selected.length > group.maxSelect) {
      throw new BadRequestException(
        `Selecciona entre ${group.minSelect} y ${group.maxSelect} opción(es) de "${group.name}"`,
      );
    }
  }

  const totals = new Map<number, { name: string; quantity: number }>();
  for (const optionId of selectedAddons) {
    const option = optionMap.get(optionId)!;
    if (!option.ingredientProductId) continue;

    const ingredient = option.ingredient
      ?? await manager.findOne(Product, { where: { id: option.ingredientProductId, storeId } });
    if (!ingredient) {
      throw new BadRequestException(`Insumo de "${option.name}" no encontrado`);
    }
    const deductQty = num(option.quantity) * saleQty;
    const lines = await expandIngredientDeductions(manager, ingredient, deductQty, storeId);
    for (const line of lines) {
      const prev = totals.get(line.productId);
      totals.set(line.productId, {
        name: line.productName,
        quantity: (prev?.quantity ?? 0) + line.quantity,
      });
    }
  }

  return Array.from(totals.entries()).map(([productId, entry]) => ({
    productId,
    productName: entry.name,
    quantity: entry.quantity,
  }));
}

/** Costo real de una venta según sabores, envase o adicionales elegidos */
export function calculateSaleUnitCost(
  product: Product,
  selectedOptionIds?: number[],
): number {
  const isComposite = product.productType === ProductType.COMPOSITE;

  if (!selectedOptionIds?.length || !product.optionGroups?.length) {
    return num(product.costPrice);
  }

  const { optionMap, groupByOptionId } = buildOptionLookup(product);
  let total = isComposite ? num(product.costPrice) : 0;

  for (const optionId of selectedOptionIds) {
    const option = optionMap.get(optionId);
    if (!option) continue;
    const group = groupByOptionId.get(optionId);
    if (isComposite) {
      if (group?.kind === OptionGroupKind.ADDON) {
        total += resolveOptionUnitCost(option);
      }
    } else {
      total += resolveOptionUnitCost(option);
    }
  }

  return Number(total.toFixed(2));
}

function countSelectedByKind(
  product: Product,
  selectedOptionIds: number[] | undefined,
  kind: OptionGroupKind,
): number {
  if (!selectedOptionIds?.length || !product.optionGroups?.length) return 0;
  const ids = new Set<number>();
  for (const group of product.optionGroups) {
    if (group.kind !== kind) continue;
    for (const option of group.options ?? []) {
      ids.add(option.id);
    }
  }
  return selectedOptionIds.filter((id) => ids.has(id)).length;
}

/** Precio de venta según adicionales elegidos (base + extras) y bolas variables */
export function calculateSaleUnitPrice(
  product: Product,
  selectedOptionIds?: number[],
): number {
  let price = num(product.salePrice);

  if (
    product.productType === ProductType.PORTION
    && product.variableScoops
    && product.scoopPrices?.length
    && selectedOptionIds?.length
  ) {
    const flavorCount = countSelectedByKind(product, selectedOptionIds, OptionGroupKind.FLAVOR);
    if (flavorCount > 0) {
      price = num(product.scoopPrices[flavorCount - 1] ?? product.salePrice);
    }
  }

  if (!selectedOptionIds?.length || !product.optionGroups?.length) {
    return price;
  }

  const { optionMap, groupByOptionId } = buildOptionLookup(product);

  for (const optionId of selectedOptionIds) {
    const option = optionMap.get(optionId);
    if (!option) continue;
    const group = groupByOptionId.get(optionId);
    if (group?.kind === OptionGroupKind.ADDON) {
      price += num(option.unitPrice);
    }
  }

  return Number(price.toFixed(2));
}
