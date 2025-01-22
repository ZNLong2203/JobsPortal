import axiosInstance from "@/lib/axios-customize";
import { Job, NewJob } from "@/types/job";
import { PageData } from "@/types/pagedata";

export const getAllJob = async (page: number = 1, limit: number = 10, query?: string): Promise<{ 
  jobs: Job[], 
  metadata: PageData
}> => {
  const res = await axiosInstance.get('/jobs', {
    params: { page, limit, query }
  })
  return res.data.data
}

export const getJobsByCompany = async (company: string, page: number = 1, limit: number = 10): Promise<{
  jobs: Job[],
  metadata: PageData
}> => {
  const res = await axiosInstance.get(`/jobs`, {
    params: { company, page, limit }
  })
  return res.data.data;
}

export const getJobById = async (_id : string): Promise<Job> => {
  const res = await axiosInstance.get(`/jobs/${_id}`);
  return res.data.data;
}

export const createJob = async (job: NewJob): Promise<Job> => {
  const res = await axiosInstance.post("/jobs", job);
  return res.data.data;
}

export const updateJob = async (job: Job): Promise<Job> => {
  const res = await axiosInstance.patch(`/jobs/${job._id}`, job);
  return res.data.data;
}

export const deleteJob = async (_id: string): Promise<void> => {
  await axiosInstance.delete(`/jobs/${_id}`);
}