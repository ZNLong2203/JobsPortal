import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Company } from 'src/modules/company/schemas/company.schema';
import { Job } from 'src/modules/jobs/schemas/job.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export class CreateResumeDto {
  @IsNotEmpty()
  user: Types.ObjectId | User;

  @IsNotEmpty()
  company: Types.ObjectId | Company;

  @IsNotEmpty()
  job: Types.ObjectId | Job;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  coverLetter: string;
}
