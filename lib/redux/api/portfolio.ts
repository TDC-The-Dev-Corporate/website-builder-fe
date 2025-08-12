import api from "@/app/services/api";

// Retry helper function
const retry = async (fn: () => Promise<any>, retries: number = 3, delay: number = 1000): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && error.statusCode >= 500) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const createPortfolio = async (data: any) => {
  return retry(async () => {
    const response = await api.post("portfolios", data);
    return response.data;
  });
};

export const updatePortfolio = async (id: string, data: any) => {
  return retry(async () => {
    const response = await api.patch(`portfolios/${id}`, data);
    return response.data;
  });
};

export const getPortfolioByUserName = async (name: string) => {
  const response = await api.get(`portfolios/userByName/${name}`);
  console.log("portfolio response", response);
  return response.data;
};

export const getPortfolios = async () => {
  return retry(async () => {
    const response = await api.get(`portfolios/userDrafts`, {
      headers: {
        "Cache-Control": "max-age=3600", // 1 hour
      },
    });
    return response.data;
  });
};

export const clearCache = async () => {
  return retry(async () => {
    const response = await api.get(`portfolios/clearCacheById`, {});
    return response.data;
  });
};

export const publish = async (id: string) => {
  return retry(async () => {
    const response = await api.put(`portfolios/publish/${id}`);
    return response.data;
  });
};

export const remove = async (id: string) => {
  return retry(async () => {
    const response = await api.delete(`portfolios/${id}`);
    return response.data;
  });
};
