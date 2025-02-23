import axiosInstance from "@/lib/axios-customize";
import { Subscriber } from "@/types/subscriber";

export const getAllSubscribers = async (): Promise<Subscriber[]> => {
  const response = await axiosInstance.get('/subscribers');
  return response.data.data;
};

export const createSubscriber = async (data: Omit<Subscriber, '_id'>) => {
  const response = await axiosInstance.post('/subscribers', data);
  return response.data.data;
};

export const deleteSubscriber = async (id: string) => {
  const response = await axiosInstance.delete(`/subscribers/${id}`);
  return response.data;
};