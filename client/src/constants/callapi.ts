/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios-customize";
import { Company, NewCompany } from "@/types/company";
import { Job, NewJob } from "@/types/job";
import { Resume, NewResume } from "@/types/resume";
import { User, NewUser } from "@/types/user";
import { PageData } from "@/types/pagedata";

// Users
export const getUsers = async (page: number = 1, limit: number = 10): Promise<{ 
  users: User[], 
  metadata: { 
    total: number, 
    page: number, 
    totalPages: number, 
    limit: number 
  } 
}> => {
  const res = await axiosInstance.get('/users', {
    params: { page, limit }
  })
  return res.data.data
}

export const getUser = async (id: string): Promise<User> => {
  const res = await axiosInstance.get(`/users/${id}`)
  return res.data.data
}

export const createUser = async (user: NewUser): Promise<User> => {
  const res = await axiosInstance.post('/users', user)
  return res.data.data
}

export const updateUser = async (user: User): Promise<User> => {
  const res = await axiosInstance.put(`/users/${user._id}`, user)
  return res.data.data
}

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`)
}

// Company
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

// Job
export const getAllJob = async (page: number = 1, limit: number = 10): Promise<{ 
  jobs: Job[], 
  metadata: PageData
}> => {
  const res = await axiosInstance.get('/jobs', {
    params: { page, limit }
  })
  return res.data.data
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

// Resume
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