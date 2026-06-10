import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class PurchaseQueryDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  supplierId?: number;
}
