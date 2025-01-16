import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { CompanyModule } from '../company/company.module';
import { JobsModule } from '../jobs/jobs.module';
import { ResumesModule } from '../resumes/resumes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CompanyModule, JobsModule, ResumesModule, UsersModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
