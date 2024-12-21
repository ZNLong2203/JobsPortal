import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  des: string;

  @IsNotEmpty()
  createdBy: {
    _id: string;
    email: string;
  };
}
