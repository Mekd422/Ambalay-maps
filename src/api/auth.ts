import API from "./axios";

export const signup = (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => API.post("/auth/signup", data);

export const signin = (data: {
  email: string;
  password: string;
}) => API.post("/auth/signin", data);