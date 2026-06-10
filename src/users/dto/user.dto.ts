import {
  IsString, IsEmail, IsEnum, IsOptional, IsBoolean, IsInt, MinLength, ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '../../common/enums';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf((o) => o.role !== UserRole.SUPER_ADMIN)
  @Type(() => Number)
  @IsInt()
  storeId?: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  storeId?: number;
}
