import api from "@/app/services/api";

export const createPortfolio = async (data: any) => {
  const response = await api.post("portfolios", data);
  return response.data;
};
