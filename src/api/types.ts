import API from "./axios";

interface TypesApiResponse<T> {
  status: string;
  data: T;
  message: string;
  timestamp: string;
  requestId: string;
}

export const getServiceGrants = async () => {
  const res = await API.get<TypesApiResponse<string[]>>("/types/service_grants");
  return res.data.data ?? [];
};
