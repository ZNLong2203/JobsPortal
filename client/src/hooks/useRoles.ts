import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllRole, getRoleById, createRole, updateRole, deleteRole } from '@/constants/callapi'

export function useRoles(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient()

  const rolesQuery = useQuery({
    queryKey: ['roles', page, limit],
    queryFn: () => getAllRole(page, limit),
  })

  const createRoleMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles']})
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles']})
    },
  })

  const deleteRoleMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles']})
    },
  })

  return {
    roles: rolesQuery.data?.roles ?? [],
    metadata: rolesQuery.data?.metadata,
    isLoading: rolesQuery.isLoading,
    isError: rolesQuery.isError,
    error: rolesQuery.error,
    createRole: createRoleMutation.mutate,
    updateRole: updateRoleMutation.mutate,
    deleteRole: deleteRoleMutation.mutate,
  }
}

export function useRole(id: string) {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => getRoleById(id),
  })
}

