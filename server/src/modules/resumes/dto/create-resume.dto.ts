import { IsNotEmpty } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  jobId: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  status: string;
}
