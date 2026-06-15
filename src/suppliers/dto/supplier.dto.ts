import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

function emptyToUndefined({ value }: { value: unknown }) {
  if (value === '' || value === null) return undefined;
  return typeof value === 'string' ? value.trim() : value;
}

export class CreateSupplierDto {
  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  nit?: string;

  @IsOptional()
  @IsEmail()
  @Transform(emptyToUndefined)
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  phone?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  address?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  contact?: string;
}

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  nit?: string;

  @IsOptional()
  @IsEmail()
  @Transform(emptyToUndefined)
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  phone?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  address?: string;

  @IsOptional()
  @IsString()
  @Transform(emptyToUndefined)
  contact?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
