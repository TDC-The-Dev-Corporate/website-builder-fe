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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  window.location.href = `${baseUrl}auth/google`;
};

export const sendOtpEmail = async (data: any) => {
  const response = await api.post("auth/sendOTP", data);
  return response.data;
};

export const resetForgottenPassword = async (data: ForgotPassword) => {
  const response = await api.patch("auth/resetPassword", data);
  return response.data;
};
