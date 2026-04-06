import API from "./axios";


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  status: string;
  data: {
    users: User[];
    total: number;
    page: number;
    limit: number;
  };
}

export const updateProfile = async (
  firstName: string,
  lastName: string
) => {
  const res = await API.put("/auth/update_profile", {
    firstName,
    lastName,
  });

  return res.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const res = await API.put("/auth/change_password", {
    currentPassword,
    newPassword,
  });

  return res.data;
};

export const getUsers = async (page = 1, limit = 6) => {
  const res = await API.get<GetUsersResponse>(
    `/auth/users?page=${page}&limit=${limit}`
  );

  return res.data;
};