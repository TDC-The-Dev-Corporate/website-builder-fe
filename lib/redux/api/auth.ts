import api from "@/app/services/api";

export const registerUser = async (data: any) => {
  const response = await api.post("auth/register", data);
  return response.data;
};

export const verify = async (data: any) => {
  const response = await api.post("auth/verifyUser", data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await api.post("auth/login", data);
  return response.data;
};

export const googleAuth = async () => {
  window.location.href = "http://localhost:3001/auth/google";
};

export const sendOtp = async (data: any) => {
  const response = await api.post("auth/sendOTP", data);
  return response.data;
};
