import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllRole, getRoleById, createRole, updateRole, deleteRole } from '@/constants/callapi'
import { NewRole, Role } from '@/types/role'

export function useRoles(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient()

  const allRoleQuery = useQuery({
    queryKey: ['roles', page, limit],
    queryFn: () => getAllRole(page, limit),
  })

  const createRoleMutation = useMutation({
    mutationFn: (role: NewRole) => createRole(role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles']})
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: ({ role }: { role: Role }) => updateRole(role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles']})
    },
  })

  const deleteRoleMutation = useMutation({
    mutationFn: (_id: string) => deleteRole(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles']})
    },
  })

  return {
    roles: allRoleQuery.data ?? [],
    isLoading: allRoleQuery.isLoading,
    isError: allRoleQuery.isError,
    error: allRoleQuery.error,
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

