import api from "@/app/services/api";

export const getTemplates = async () => {
  const response = await api.get("templates", {});
  return response.data;
};
