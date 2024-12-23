import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UserDto {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  role: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  age: number;

  @IsOptional()
  address: string;

  @IsOptional()
  createdBy: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
