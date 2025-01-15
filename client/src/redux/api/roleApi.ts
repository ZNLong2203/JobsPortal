import axiosInstance from "@/lib/axios-customize";
import { PageData } from "@/types/pagedata";
import { Role } from "@/types/role";

export const getAllRole = async (page: number = 1, limit: number = 10): Promise<{
  roles: Role[],
  metadata: PageData
}> => {
  const res = await axiosInstance.get('/roles', {
    params: { page, limit }
  })
  return res.data.data
}

export const getRoleById = async (_id: string): Promise<Role> => {
  const res = await axiosInstance.get(`/roles/${_id}`);
  return res.data.data;
}

export const createRole = async (role: Role): Promise<Role> => {
  const res = await axiosInstance.post("/roles", role);
  return res.data.data;
}

export const updateRole = async (role: Role): Promise<Role> => {
  const res = await axiosInstance.patch(`/roles/${role._id}`, role);
  return res.data.data;
}

export const deleteRole = async (_id: string): Promise<void> => {
  await axiosInstance.delete(`/roles/${_id}`);
}