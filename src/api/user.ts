import API from "./axios";

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