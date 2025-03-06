import { useQuery } from '@tanstack/react-query';
import { getCompanyById } from '@/redux/api/companyApi';
import { getJobsByCompany } from '@/redux/api/jobApi';

export function useCompanyDetailsAndJobs(companyId: string, page: number = 1, limit: number = 10) {
  const companyQuery = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompanyById(companyId),
  });

  const jobsQuery = useQuery({
    queryKey: ['jobs', 'company', companyId, page, limit],
    queryFn: () => getJobsByCompany(companyId, page, limit),
    enabled: !!companyQuery.data,
  });

  return {
    data: {
      company: companyQuery.data,
      jobs: jobsQuery.data?.jobs || [],
    },
    isLoading: companyQuery.isLoading || jobsQuery.isLoading,
    isError: companyQuery.isError || jobsQuery.isError,
    error: companyQuery.error || jobsQuery.error,
  };
}