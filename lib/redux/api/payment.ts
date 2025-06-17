import api from "@/app/services/api";

export const doPayment = async (data: any) => {
  const response = await api.post("payments/create-payment-intent", data);
  return response.data;
};
