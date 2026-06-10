import {
  IsArray, IsEnum, IsInt, IsNumber, IsOptional, Min, ValidateNested, ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../../common/enums';

export class SaleItemDto {
  @Type(() => Number)
  @IsInt()
  productId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateSaleDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  customerId?: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amountPaid?: number;
}
