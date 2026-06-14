import { IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email inválido' })
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
