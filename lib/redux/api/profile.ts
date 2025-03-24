import api from "@/app/services/api";

export const updateUser = async (data: any) => {
  const response = await api.put("user", data);
  return response.data;
};
