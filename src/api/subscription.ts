import API from "./axios";

export const getPlans = () => API.get("/subscriptions/plans");
export const getAllPlans = () => API.get("/subscriptions/plans/all");
export const getMySubscription = () => API.get("/subscriptions/my");
export const subscribeToPlan = (planId: string) =>
  API.post("/subscriptions/subscribe", { planId });
export const getServices = () => API.get("/types/services");