import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllPermission, getPermissionById, createPermission, updatePermission, deletePermission } from '@/constants/callapi'

export function usePermissions(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient()

  const permissionsQuery = useQuery({
    queryKey: ['permissions', page, limit],
    queryFn: () => getAllPermission(page, limit),
  })

  const createPermissionMutation = useMutation({
    mutationFn: createPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions']})
    },
  })

  const updatePermissionMutation = useMutation({
    mutationFn: updatePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions']})
    },
  })

  const deletePermissionMutation = useMutation({
    mutationFn: deletePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions']})
    },
  })

  return {
    permissions: permissionsQuery.data?.permissions ?? [],
    metadata: permissionsQuery.data?.metadata,
    isLoading: permissionsQuery.isLoading,
    isError: permissionsQuery.isError,
    error: permissionsQuery.error,
    createPermission: createPermissionMutation.mutate,
    updatePermission: updatePermissionMutation.mutate,
    deletePermission: deletePermissionMutation.mutate,
  }
}

export function usePermission(id: string) {
  return useQuery({
    queryKey: ['permission', id],
    queryFn: () => getPermissionById(id),
  })
}

