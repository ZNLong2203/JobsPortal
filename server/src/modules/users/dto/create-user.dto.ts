import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  loginProvider?: string;
}
