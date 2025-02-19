import axiosInstance from "@/lib/axios-customize";
import { User, NewUser, UpdateUser } from "@/types/user";
import { PageData } from "@/types/pagedata";
import { ProfileFieldEnum, UpdateUserProfileDto, UserProfile } from "@/types/userProfile";
import { Resume } from "@/types/resume";

export const getUsers = async (page: number = 1, limit: number = 10): Promise<{ 
  users: User[], 
  metadata: PageData
}> => {
  const res = await axiosInstance.get('/users', {
    params: { page, limit }
  })
  return res.data.data
}

export const getUser = async (_id: string): Promise<User> => {
  const res = await axiosInstance.get(`/users/${_id}`)
  return res.data.data
}

export const getAllHR = async (): Promise<User[]> => {
  const res = await axiosInstance.get('/users/hr')
  return res.data.data
}

export const getAllResumeAndJobApplicationByUser = async (
  _id: string, 
  page: number = 1, 
  limit: number = 10
): Promise<{ 
  resumes: Resume[], 
  metadata: PageData
}> => {
  const res = await axiosInstance.get(`/users/${_id}/resumes`, {
    params: { page, limit }
  })
  return res.data.data
}

export const createUser = async (user: NewUser): Promise<User> => {
  const res = await axiosInstance.post('/users', user)
  return res.data.data
}

export const updateUser = async (user: UpdateUser): Promise<User> => {
  const res = await axiosInstance.patch(`/users/${user._id}`, user)
  return res.data.data
}

export const deleteUser = async (_id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${_id}`)
}

export const getUserProfile = async (_id: string): Promise<UserProfile> => {
  const res = await axiosInstance.get(`/users/${_id}/profile`)
  return res.data.data
}

export const updateUserProfile = async (id: string, profile: UpdateUserProfileDto): Promise<UserProfile> => {
  const res = await axiosInstance.patch(`/users/${id}/profile`, profile)
  return res.data.data
}

export const removeUserProfileField = async (
  id: string, 
  field: ProfileFieldEnum,
  itemId?: string
): Promise<void> => {
  const url = itemId 
    ? `/users/${id}/profile/${field}?itemId=${itemId}`
    : `/users/${id}/profile/${field}`
  await axiosInstance.delete(url)
}