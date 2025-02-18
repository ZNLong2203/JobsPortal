import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';
import { ResumesService } from '../resumes/resumes.service';
import { IReqUser } from '../auth/interfaces/req-user.interface';

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
      const jobsAppliedByMonth = await this.jobsService.getJobsAppliedByMonth();
      const jobsDistributionByCategory =
        await this.jobsService.getJobsDistributionByCategory();

      return {
        totalUsers,
        totalCompanies,
        totalJobs,
        totalResumes,
        jobsAppliedByMonth,
        jobsDistributionByCategory,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCompanyStatistics(user: IReqUser): Promise<any> {
    try {
      const totalJobs = await this.jobsService.getTotalJobs(user.company);
      const totalResumes = await this.resumeService.getTotalResumes(
        user.company,
      );
      const totalHr = await this.userService.getTotalHR(user.company);
      const ResumeStatusByMonth =
        await this.resumeService.getResumeStatusByMonth(user.company);

      return {
        totalJobs,
        totalResumes,
        totalHr,
        ResumeStatusByMonth,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getHRStatistics(user: IReqUser): Promise<any> {
    try {
      const totalJobs = await this.jobsService.getTotalJobs(user.company);
      const totalResumes = await this.resumeService.getTotalResumes(
        user.company,
      );
      const ResumeStatusByMonth = await this.resumeService.getResumeStatusByJob(
        user.company,
      );

      return {
        totalJobs,
        totalResumes,
        ResumeStatusByMonth,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserStatistics(user: IReqUser): Promise<any> {
    try {
      const data = await this.resumeService.getResumeToStatisticByUser(user);

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
