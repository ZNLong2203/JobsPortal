export class AdminStatisticsDto {
  totalCompanies: number;
  totalJobs: number;
  totalResumes: number;
  totalUsers: number;
  totalApplications: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
  }
}