import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class JobDto extends PartialType(CreateJobDto) {
  @IsNotEmpty()
  _id: Types.ObjectId;
}
