import { useQuery } from '@tanstack/react-query';
import { getCompanyById } from '@/redux/api/companyApi';
import { getJobsByCompany } from '@/redux/api/jobApi'; 
import { Company } from '@/types/company';
import { Job } from '@/types/job';

interface CompanyDetailsAndJobs {
  company: Company | null;
  jobs: Job[];
}

export function useCompanyDetailsAndJobs(companyId: string) {
  const companyQuery = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompanyById(companyId),
  });

  const jobsQuery = useQuery({
    queryKey: ['companyJobs', companyId],
    queryFn: () => getJobsByCompany(companyId),
    enabled: !!companyQuery.data, 
  });

  return {
    data: {
      company: companyQuery.data ?? null,
      jobs: jobsQuery.data ?? [],
    } as CompanyDetailsAndJobs,
    isLoading: companyQuery.isLoading || jobsQuery.isLoading,
    isError: companyQuery.isError || jobsQuery.isError,
    error: companyQuery.error || jobsQuery.error,
  };
}

