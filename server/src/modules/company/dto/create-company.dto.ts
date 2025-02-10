import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  industry: string;

  @IsNotEmpty()
  employees: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  logo: string;

  @IsOptional()
  des: string;

  @IsOptional()
  website?: string;

  @IsOptional()
  contactEmail?: string;
}
