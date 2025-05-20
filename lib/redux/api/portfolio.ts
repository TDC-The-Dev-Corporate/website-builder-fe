import api from "@/app/services/api";

export const createPortfolio = async (data: any) => {
  const response = await api.post("portfolios", data);
  return response.data;
};

export const updatePortfolio = async (id: string, data: any) => {
  const response = await api.patch(`portfolios/${id}`, data);
  return response.data;
};

export const getPortfolioByUserName = async (name: string) => {
  const response = await api.get(`portfolios/userByName/${name}`);
  return response.data;
};

export const getPortfolios = async () => {
  const response = await api.get(`portfolios/userDrafts`, {
    headers: {
      "Cache-Control": "max-age=3600", // 1 hour
    },
  });
  return response.data;
};

export const clearCache = async () => {
  const response = await api.get(`portfolios/clearCache`, {});
  return response.data;
};

export const publish = async (id: string) => {
  const response = await api.put(`portfolios/publish/${id}`);
  return response.data;
};

export const remove = async (id: string) => {
  const response = await api.delete(`portfolios/${id}`);
  return response.data;
};
