import axiosInstance from "@/lib/axios-customize";
import axios from "axios";

interface AuthResponse {
  access_token: string;
  userInfo: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const registerApi = async (name: string, email: string, password: string) => {
  const response = await axios.post('https://cors-anywhere.herokuapp.com/https://jobs-portal-zkare.up.railway.app/api/v1/auth/register', 
    { name, email, password },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};

export const loginApi = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/login', { username, password })
  return response.data.data
}

export const logoutApi = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout')
}

export const loginWithGoogleApi = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`

export const loginWithGithubApi = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`

export const handleOAuthSuccess = async (provider: string) => {
  const response = await axiosInstance.get(`/api/auth/${provider}/callback`);
  return response.data.data;
};
