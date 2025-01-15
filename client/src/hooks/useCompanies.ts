import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCompany, getCompanyById, createCompany, updateCompany, deleteCompany } from '@/redux/api/companyApi';
import { Company, NewCompany } from '@/types/company';

export function useCompanies(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient();

  const allCompanyQuery = useQuery({
    queryKey: ['companies', page, limit],
    queryFn: () => getAllCompany(page, limit),
  })

  const createCompanyMutation = useMutation({
    mutationFn: (company: NewCompany) => createCompany(company),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })

  const updateCompanyMutation = useMutation({
    mutationFn: ({ company }: { company: Company }) => updateCompany(company),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })

  const deleteCompanyMutation = useMutation({
    mutationFn: (_id: string) => deleteCompany(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    },
  })

  return {
    companies: allCompanyQuery.data ?? [],
    isLoading: allCompanyQuery.isLoading,
    isError: allCompanyQuery.isError,
    error: allCompanyQuery.error,
    createCompany: createCompanyMutation.mutate,
    updateCompany: updateCompanyMutation.mutate,
    deleteCompany: deleteCompanyMutation.mutate,
  }
}

export function useCompany(_id: string) {
  return useQuery({
    queryKey: ['company', _id],
    queryFn: () => getCompanyById(_id),
  })
}