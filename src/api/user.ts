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