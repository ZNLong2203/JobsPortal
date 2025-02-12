import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, getUser, createUser, updateUser, deleteUser, getAllHR, getUserProfile, updateUserProfile, removeUserProfileField } from '@/redux/api/userApi'
import { NewUser, UpdateUser } from '@/types/user'
import { ProfileFieldEnum, UpdateUserProfileDto } from '@/types/userProfile'

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


export function useUserProfile(userId: string) {
  const queryClient = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  })

  const updateProfileMutation = useMutation({
    mutationFn: (profile: UpdateUserProfileDto) => updateUserProfile(userId, profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', userId] })
    },
  })

  const removeProfileFieldMutation = useMutation({
    mutationFn: ({ field, itemId }: { field: ProfileFieldEnum, itemId?: string }) => 
      removeUserProfileField(userId, field, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', userId] })
    },
  })

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile: updateProfileMutation.mutate,
    removeProfileField: removeProfileFieldMutation.mutate,
  }
}