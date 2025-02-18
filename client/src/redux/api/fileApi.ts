import axiosInstance from "@/lib/axios-customize";

export const uploadResume = async (formData: FormData) => {
  const res = await axiosInstance.post('/files/upload/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
};

export const uploadCompanyImage = async (formData: FormData) => {
  const res = await axiosInstance.post('/files/upload/company-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
}