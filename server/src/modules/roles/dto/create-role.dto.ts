import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { Permission } from "src/modules/permissions/schemas/permission.schema";

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  des: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  permissions: Types.ObjectId[] | Permission[];
}
