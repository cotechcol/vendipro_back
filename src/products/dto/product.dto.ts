import {
  IsString, IsOptional, IsBoolean, IsNumber, IsInt, Min, MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minStock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;
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
  @IsInt()
  @Min(0)
  minStock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
