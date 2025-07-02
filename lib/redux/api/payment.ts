import api from "@/app/services/api";

export const doPayment = async (data: any) => {
  const response = await api.post("payments/create-payment-intent", data);
  return response.data;
};

export const createSubsscription = async (data: any) => {
  const response = await api.post("payments/create-subscription", data);
  return response.data;
};

export const fetchSubscriptionStatus = async () => {
  try {
    const response = await api.get("/payments/current-subscription");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch subscription status", err);
    return null;
  }
};
