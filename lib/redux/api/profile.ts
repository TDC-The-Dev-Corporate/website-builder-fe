import api from "@/app/services/api";

export const updateUser = async (data: any) => {
  const response = await api.put("user", data);
  return response.data;
};

export const removeUser = async () => {
  const response = await api.delete("user");
  return response.data;
};
