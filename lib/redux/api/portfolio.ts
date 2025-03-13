import api from "@/app/services/api";

export const createPortfolio = async (data: any) => {
  const response = await api.post("portfolios", data);
  return response.data;
};

export const getPortfolioByUserName = async (name: string) => {
  const response = await api.get(`portfolios/userByName/${name}`);
  return response.data;
};
