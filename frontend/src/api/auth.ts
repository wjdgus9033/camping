import { api } from "./axios";

export const signupApi = (data: any) => {
  return api.post("/auth/signup", data);
};
export const checkUseridApi = (userid: string) => {
  return api.get(`/auth/check-userid?userid=${userid}`);
};

export const loginApi = (data: { userid: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const getMyInfoApi = () => {
  return api.get("/auth/me");
};