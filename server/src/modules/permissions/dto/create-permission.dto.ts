import { IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  apiPath: string;

  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsString()
  module: string;
}
