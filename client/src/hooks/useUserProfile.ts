import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserProfile, ProfileFieldEnum } from '@/types/userProfile'
import { getUserProfile, removeUserProfileField, updateUserProfile } from '@/redux/api/userApi'

export function useUserProfile(userId: string) {
  const queryClient = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  })

  const updateProfileMutation = useMutation({
    mutationFn: (profile: UserProfile) => updateUserProfile(userId, profile),
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