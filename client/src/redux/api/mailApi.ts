import axiosInstance from "@/lib/axios-customize";

interface EmailInfo {
  mail: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
}

export const sendApproveEmail = async (emailInfo: EmailInfo) => {
  const res = await axiosInstance.post('/mail/approve', emailInfo);
  return res.data;
};

export const sendRejectEmail = async (emailInfo: EmailInfo) => {
  const res = await axiosInstance.post('/mail/reject', emailInfo);
  return res.data;
};