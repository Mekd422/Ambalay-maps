import API from "./axios";

export const getPlans = () => API.get("/subscriptions/plans");
export const getAllPlans = () => API.get("/subscriptions/plans/all");
export const getMySubscription = () => API.get("/subscriptions/my");
export const subscribeToPlan = (planId: string) =>
  API.post("/subscriptions/subscribe", { planId });
export const getServices = () => API.get("/types/services");

export const togglePlanActive = (planId: string) =>
  API.post("/subscriptions/toggle_active", { id: planId });

export const createPlan = (plan: {
  label: string;
  description: string;
  items: { service: string; amount: number }[];
}) => API.post("/subscriptions/create_plan", plan);