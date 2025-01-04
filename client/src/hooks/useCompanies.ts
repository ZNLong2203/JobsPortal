import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCompany, getCompanyById, createCompany, updateCompany, deleteCompany } from '@/constants/callapi';
import { Company, NewCompany } from '@/types/company';

export function useCompanies() {
  const queryClient = useQueryClient();

  const allCompanyQuery = useQuery({
    queryKey: ['companies'],
    queryFn: getAllCompany,
  })

  const createCompanyMutation = useMutation({
    mutationFn: (company: NewCompany) => createCompany(company),
    onSuccess: (newCompany) => {
      queryClient.setQueryData(['companies'], (oldData: Company[] | undefined) => [...(oldData || []), newCompany])
    },
  })

  const updateCompanyMutation = useMutation({
    mutationFn: ({ id, company }: { id: string; company: NewCompany }) => updateCompany(id, company),
    onSuccess: (updatedCompany) => {
      queryClient.setQueryData(['companies'], (oldData: Company[] | undefined) =>
        oldData?.map(company => company.id === updatedCompany.id ? updatedCompany : company)
      )
    },
  })

  const deleteCompanyMutation = useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: (deletedCompanyId) => {
      queryClient.setQueryData(['companies'], (oldData: Company[] | undefined) =>
        oldData?.filter(company => company.id !== deletedCompanyId)
      )
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

export function useCompany(id: string) {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => getCompanyById(id),
  })
}