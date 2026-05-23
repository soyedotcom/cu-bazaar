import { api } from "./axios";

export const signinUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/signin", data);
  return res.data;
};

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  hall: string;
  room: string;
}) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const getUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const signoutUser = async () => {
  const res = await api.post("/auth/signout");
  return res.data;
};
