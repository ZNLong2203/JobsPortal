import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, getUser, createUser, updateUser, deleteUser, getAllHR, getAllResumeAndJobApplicationByUser } from '@/redux/api/userApi'
import { NewUser, UpdateUser } from '@/types/user'

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
    mutationFn: ({ user }: { user: UpdateUser }) => updateUser(user),
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

export function useAllHR() {
  return useQuery({
    queryKey: ['users/hr'],
    queryFn: () => getAllHR(),
  })
}

export function useAllResumeAndJobApplicationByUser(page: number = 1, limit: number = 10, _id: string) {
  return useQuery({
    queryKey: ['usersResumeAndJobApplication', page, limit, _id],
    queryFn: () => getAllResumeAndJobApplicationByUser(_id, page, limit),
  })
}
