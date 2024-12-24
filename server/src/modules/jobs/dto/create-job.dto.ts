import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsEndDateAfterStartDate } from 'src/common/validators/IsEndDateAfterStartDate';

export class CreateJobDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  skills: string[];

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  salary: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
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
