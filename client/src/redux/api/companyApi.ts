import axiosInstance from "@/lib/axios-customize";
import { Company, NewCompany } from "@/types/company";
import { PageData } from "@/types/pagedata";

export const getAllCompany = async (page: number = 1, limit: number = 10): Promise<{ 
  companies: Company[], 
  metadata: PageData
}> => {
  const res = await axiosInstance.get('/company', {
    params: { page, limit }
  })
  return res.data.data
}

export const getCompanyById = async (_id: string): Promise<Company> => {
  const res = await axiosInstance.get(`/company/${_id}`);
  return res.data.data;
}

export const createCompany = async (company: NewCompany): Promise<Company> => {
  const res = await axiosInstance.post("/company", company);
  return res.data.data;
}

export const updateCompany = async (company: Company): Promise<Company> => {
  const res = await axiosInstance.patch(`/company/${company._id}`, company);
  return res.data.data;
}

export const deleteCompany = async (_id: string): Promise<void> => {
  await axiosInstance.delete(`/company/${_id}`);
}