import {
  ArrayMinSize, IsArray, IsEnum, IsInt, IsOptional, IsString, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InventoryMovementType } from '../../common/enums';

export class AdjustInventoryDto {
  @Type(() => Number)
  @IsInt()
  productId: number;

  @IsEnum(InventoryMovementType)
  type: InventoryMovementType;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class ZeroInventoryDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  @IsInt({ each: true })
  productIds: number[];

  @IsOptional()
  @IsString()
  notes?: string;
}
