import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmailInfoDto {
  @ApiProperty({ description: 'Candidate email' })
  @IsString()
  @IsNotEmpty()
  mail: string;

  @ApiProperty({ description: 'Candidate name' })
  @IsString()
  @IsNotEmpty()
  candidateName: string;

  @ApiProperty({ description: 'Job title' })
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @ApiProperty({ description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;
}
