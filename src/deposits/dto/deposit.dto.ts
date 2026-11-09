import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class LookupDepositDto {
  @IsString()
  @MinLength(3)
  code: string;
}

export class ReturnDepositDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity?: number;
}
