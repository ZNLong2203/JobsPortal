import axiosInstance from "@/lib/axios-customize";

export const sendApproveEmail = async (email: string) => {
  const res = await axiosInstance.post('/mail/approve', { 
    mail: email,
    token: 'some-token' 
  });
  return res.data.data;
};

export const sendRejectEmail = async (email: string) => {
  const res = await axiosInstance.post('/mail/reject', { 
    mail: email,
    token: 'some-token' 
  });
  return res.data.data;
};