import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class OpenCashSessionDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  openingAmount: number;
}

export class CloseCashSessionDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  closingAmount: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
