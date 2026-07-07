import {
  IsString, IsOptional, IsBoolean, IsNumber, IsInt, Min, MinLength,
  IsEnum, IsArray, ValidateNested, ValidateIf,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ProductType, StockUnit, OptionGroupKind } from '../../common/enums';

export class RecipeItemDto {
  @Type(() => Number)
  @IsInt()
  ingredientProductId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  quantity: number;

  @IsOptional()
  @IsEnum(StockUnit)
  unit?: StockUnit;
}

export class ProductOptionDto {
  @IsString()
  @MinLength(1)
  name: string;

  @Transform(({ value }) => {
    if (value === null || value === undefined || value === '' || value === 0) return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  })
  @IsOptional()
  @IsInt()
  ingredientProductId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  quantity?: number;

  @IsOptional()
  @IsEnum(StockUnit)
  unit?: StockUnit;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitCost?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitPrice?: number;
}

export class ProductOptionGroupDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEnum(OptionGroupKind)
  kind: OptionGroupKind;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionDto)
  options: ProductOptionDto[];
}

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  sku: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProductType)
  productType?: ProductType;

  @IsOptional()
  @IsEnum(StockUnit)
  stockUnit?: StockUnit;

  @ValidateIf((o) => o.productType === ProductType.PORTION && !o.optionGroups?.length)
  @Type(() => Number)
  @IsInt()
  baseProductId?: number;

  @ValidateIf((o) => o.productType === ProductType.PORTION)
  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  portionSize?: number;

  @ValidateIf((o) => o.productType === ProductType.PORTION && o.optionGroups?.length)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  scoopCount?: number;

  @ValidateIf((o) => o.productType === ProductType.PORTION && o.optionGroups?.length)
  @IsOptional()
  @IsBoolean()
  variableScoops?: boolean;

  @ValidateIf((o) => o.productType === ProductType.PORTION && o.variableScoops)
  @IsOptional()
  @IsArray()
  scoopPrices?: number[];

  @ValidateIf((o) =>
    (o.productType === ProductType.PORTION && o.optionGroups?.length)
    || o.productType === ProductType.COMPOSITE
    || (o.productType === ProductType.SIMPLE && o.optionGroups?.length))
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionGroupDto)
  optionGroups?: ProductOptionGroupDto[];

  @ValidateIf((o) => o.productType !== ProductType.BULK && o.productType !== ProductType.PREPARED)
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  salePrice: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costPrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minStock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ValidateIf((o) => o.productType === ProductType.COMPOSITE || o.productType === ProductType.PREPARED)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeItemDto)
  recipe?: RecipeItemDto[];

  @ValidateIf((o) => o.productType === ProductType.PREPARED)
  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  recipeBatchSize?: number;

  @IsOptional()
  @IsBoolean()
  visibleInPos?: boolean;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(StockUnit)
  stockUnit?: StockUnit;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  baseProductId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  portionSize?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minStock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  scoopCount?: number;

  @IsOptional()
  @IsBoolean()
  variableScoops?: boolean;

  @IsOptional()
  @IsArray()
  scoopPrices?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionGroupDto)
  optionGroups?: ProductOptionGroupDto[];

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  visibleInPos?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeItemDto)
  recipe?: RecipeItemDto[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  recipeBatchSize?: number;
}
