import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllPermission, getPermissionById, createPermission, updatePermission, deletePermission } from '@/redux/api/permissionApi'
import { NewPermission } from '@/types/permission'

export function usePermissions(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient()

  const allPermissionQuery = useQuery({
    queryKey: ['permissions', page, limit],
    queryFn: () => getAllPermission(page, limit),
  })

  const createPermissionMutation = useMutation({
    mutationFn: (permission: NewPermission) => createPermission(permission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions']})
    },
  })

  const updatePermissionMutation = useMutation({
    mutationFn: ({ permission }: { permission: NewPermission }) => updatePermission(permission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions']})
    },
  })

  const deletePermissionMutation = useMutation({
    mutationFn: (_id: string) => deletePermission(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions']})
    },
  })

  return {
    permissions: allPermissionQuery.data ?? [],
    isLoading: allPermissionQuery.isLoading,
    isError: allPermissionQuery.isError,
    error: allPermissionQuery.error,
    createPermission: createPermissionMutation.mutate,
    updatePermission: updatePermissionMutation.mutate,
    deletePermission: deletePermissionMutation.mutate,
  }
}

export function usePermission(_id: string) {
  return useQuery({
    queryKey: ['permission', _id],
    queryFn: () => getPermissionById(_id),
  })
}

