import apiClient from "@/API/axios";
import useAuth from "@/hooks/useAuth";
import { AxiosResponse } from 'axios';

export const login = async (email: string, password: string) => {
  return await apiClient
    .post("/api/login", {
      email,
      password,
    })
    .then((repsonse) => {
      try {
        console.log("response", repsonse);
        useAuth.setUserToken(repsonse.data.token);
        return repsonse;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    });
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  return await apiClient
    .post("/api/register", {
      username,
      email,
      password,
    })
    .then((response) => {
      console.log("response", response);
      return response;
    });
};
