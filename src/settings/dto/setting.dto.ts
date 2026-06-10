import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  taxRate?: number;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
