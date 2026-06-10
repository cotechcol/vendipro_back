import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  code: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  active?: boolean;
}
