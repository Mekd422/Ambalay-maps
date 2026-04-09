import API from "./axios";

export const getPlans = () => API.get("/subscriptions/plans");
export const getAllPlans = () => API.get("/subscriptions/plans/all");
export const getMySubscription = () => API.get("/subscriptions/my");
export const subscribeToPlan = (planId: string) =>
  API.post("/subscriptions/subscribe", { planId });
export const getServices = () => API.get("/types/services");

export const togglePlanActive = async (planId: string) => {
  return API.post(`/plans/${planId}/toggle`);
};

export const createPlan = async (plan: { label: string; description: string }) => {
  return API.post(`/plans`, plan);
};