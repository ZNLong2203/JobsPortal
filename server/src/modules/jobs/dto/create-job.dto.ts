import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsEndDateAfterStartDate } from 'src/common/validators/IsEndDateAfterStartDate';
import { Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';

export class CreateJobDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  company: Types.ObjectId | Company;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  skills: string[];

  @IsOptional()
  location: string;

  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  type: string;

  @IsOptional()
  des: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsEndDateAfterStartDate()
  endDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
