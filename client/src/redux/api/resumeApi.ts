import axiosInstance from "@/lib/axios-customize";
import { Resume, NewResume } from "@/types/resume";
import { PageData } from "@/types/pagedata";

export const getAllResume = async (page: number = 1, limit: number = 10): Promise<{ 
  resumes: Resume[], 
  metadata: PageData
}> => {
  const res = await axiosInstance.get('/resumes', {
    params: { page, limit }
  })
  return res.data.data
}

export const getResumeById = async (_id: string): Promise<Resume> => {
  const res = await axiosInstance.get(`/resumes/${_id}`);
  return res.data.data;
}

export const createResume = async (resume: NewResume): Promise<Resume> => {
  const res = await axiosInstance.post("/resumes", resume);
  return res.data.data;
}

export const updateResume = async (resume: Resume): Promise<Resume> => {
  const res = await axiosInstance.patch(`/resumes/${resume._id}`, resume);
  return res.data.data;
}

export const deleteResume = async (_id: string): Promise<void> => {
  await axiosInstance.delete(`/resumes/${_id}`);
}