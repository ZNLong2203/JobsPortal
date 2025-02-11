import { IsString, IsDateString } from 'class-validator';

export class EducationDto {
  @IsString()
  school: string;

  @IsString()
  degree: string;

  @IsString()
  field: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
