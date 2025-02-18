/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios-customize"

export const getAdminStatistics = async (): Promise<any> => {
  const response = await axiosInstance.get('/statistics/admin')
  return response.data.data
}

export const getCompanyStatistics = async (): Promise<any> => {
  const response = await axiosInstance.get('/statistics/company')
  return response.data.data
}

export const getHRStatistics = async (): Promise<any> => {
  const response = await axiosInstance.get('/statistics/hr')
  return response.data.data
}

export const getUserStatistics = async (): Promise<any> => {
  const response = await axiosInstance.get('/statistics/user')
  return response.data.data
}