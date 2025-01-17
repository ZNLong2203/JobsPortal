import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';
import { ResumesService } from '../resumes/resumes.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly jobsService: JobsService,
    private readonly resumeService: ResumesService,
    private readonly userService: UsersService,
  ) {}

  async getAdminStatistics(): Promise<any> {
    try {
      const totalUsers = await this.userService.getTotalUsers();
      const totalCompanies = await this.companyService.getTotalCompanies();
      const totalJobs = await this.jobsService.getTotalJobs();
      const totalResumes = await this.resumeService.getTotalResumes();

      return {
        totalUsers,
        totalCompanies,
        totalJobs,
        totalResumes,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
