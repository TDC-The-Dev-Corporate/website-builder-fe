import axios, { AxiosResponse } from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return {
      ...response,
      success: true,
      statusCode: response.status,
    };
  },
  (error) => {
    return Promise.reject({
      statusCode: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    });
  }
);
export default api;
