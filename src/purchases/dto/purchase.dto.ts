import {
  IsArray, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested, ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PurchaseItemDto {
  @Type(() => Number)
  @IsInt()
  productId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitCost: number;
}

export class CreatePurchaseDto {
  @Type(() => Number)
  @IsInt()
  supplierId: number;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];
}
