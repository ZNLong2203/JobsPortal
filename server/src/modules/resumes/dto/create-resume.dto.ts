import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';
import { Job } from 'src/modules/jobs/schemas/job.schema';

export class CreateResumeDto {
  @IsNotEmpty()
  companyId: Types.ObjectId | Company;

  @IsNotEmpty()
  jobId: Types.ObjectId | Job;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  status: string;
}
