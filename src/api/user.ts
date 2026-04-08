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

// types.ts
export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface UsersResponse {
  data: User[];
  pagination: Pagination;
}

export interface GetUsersApiResponse {
  data: UsersResponse; // <-- matches res.data.data
  message: string;
  requestId: string;
  status: string;
  timestamp: string;
}

export const getUsers = async (page: number, limit: number): Promise<UsersResponse> => {
  const res = await API.get<GetUsersApiResponse>(`/auth/users?page=${page}&limit=${limit}`);
  return res.data.data; // now this matches UsersResponse
};