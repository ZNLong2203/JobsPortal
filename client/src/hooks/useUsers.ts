import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, getUser, createUser, updateUser, deleteUser } from '@/constants/callapi'
import { NewUser, User } from '@/types/user'

export function useUsers(page: number = 1, limit: number = 10) {
  const queryClient = useQueryClient()

  const allUserQuery = useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => getUsers(page, limit),
  })

  const createUserMutation = useMutation({
    mutationFn: (user: NewUser) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const updateUserMutation = useMutation({
    mutationFn: ({ user }: { user: User }) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: (_id: string) => deleteUser(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    users: allUserQuery.data ?? [],
    isLoading: allUserQuery.isLoading,
    isError: allUserQuery.isError,
    error: allUserQuery.error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  }
}

export function useUser(_id: string) {
  return useQuery({
    queryKey: ['user', _id],
    queryFn: () => getUser(_id),
  })
}

