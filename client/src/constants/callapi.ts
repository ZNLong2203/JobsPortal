/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios-customize";
import { Company, NewCompany } from "@/types/company";
import { Job, NewJob } from "@/types/job";
import { Resume, NewResume } from "@/types/resume";

// Company
export const getAllCompany = async (): Promise<any> => {
  const res = await axiosInstance.get("/company");
  return res.data.data;
}

export const getCompanyById = async (id: string): Promise<Company> => {
  const res = await axiosInstance.get(`/company/${id}`);
  return res.data.data;
}

export const createCompany = async (company: NewCompany): Promise<Company> => {
  const res = await axiosInstance.post("/company", company);
  return res.data.data;
}

export const updateCompany = async (id: string, company: NewCompany): Promise<Company> => {
  const res = await axiosInstance.patch(`/company/${id}`, company);
  return res.data.data;
}

export const deleteCompany = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/company/${id}`);
}

// Job
export const getAllJob = async (): Promise<any> => {
  const res = await axiosInstance.get("/job");
  return res.data.data;
}

export const getJobById = async (id : string): Promise<Job> => {
  const res = await axiosInstance.get(`/job/${id}`);
  return res.data.data;
}

export const createJob = async (job: NewJob): Promise<Job> => {
  const res = await axiosInstance.post("/job", job);
  return res.data.data;
}

export const updateJob = async (id: string, job: NewJob): Promise<Job> => {
  const res = await axiosInstance.patch(`/job/${id}`, job);
  return res.data.data;
}

export const deleteJob = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/job/${id}`);
}

// Resume
export const getAllResume = async (): Promise<any> => {
  const res = await axiosInstance.get("/resume");
  return res.data.data;
}

export const getResumeById = async (id: string): Promise<Resume> => {
  const res = await axiosInstance.get(`/resume/${id}`);
  return res.data.data;
}

export const createResume = async (resume: NewResume): Promise<Resume> => {
  const res = await axiosInstance.post("/resume", resume);
  return res.data.data;
}

export const updateResume = async (id: string, resume: NewResume): Promise<Resume> => {
  const res = await axiosInstance.patch(`/resume/${id}`, resume);
  return res.data.data;
}

export const deleteResume = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/resume/${id}`);
}