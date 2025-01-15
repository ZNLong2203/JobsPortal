import axiosInstance from "@/lib/axios-customize";
import { PageData } from "@/types/pagedata";
import { NewPermission, Permission } from "@/types/permission";

export const getAllPermission = async (page: number = 1, limit: number = 10): Promise<{ 
  permissions: Permission[], 
  metadata: PageData
}> => {
  const response = await axiosInstance.get('/permissions', {
    params: { page, limit }
  })
  return response.data.data
}

export const getPermissionById = async (_id: string): Promise<Permission> => {
  const response = await axiosInstance.get(`/permissions/${_id}`)
  return response.data.data
}

export const createPermission = async (permission: NewPermission): Promise<Permission> => {
  const response = await axiosInstance.post('/permissions', permission)
  return response.data.data
}

export const updatePermission = async (permission: Permission): Promise<Permission> => {
  const response = await axiosInstance.patch(`/permissions/${permission._id}`, permission)
  return response.data.data
}

export const deletePermission = async (_id: string): Promise<void> => {
  await axiosInstance.delete(`/permissions/${_id}`)
}
