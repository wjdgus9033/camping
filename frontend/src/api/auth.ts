import { api } from "./axios";

export const signupApi = (data: any) => {
  return api.post("/auth/signup", data);
};
export const checkUseridApi = (userid: string) => {
  return api.get(`/check-userid?userid=${userid}`);
};

export const loginApi = (data: any) => {
  return api.post("/auth/login", data);
};