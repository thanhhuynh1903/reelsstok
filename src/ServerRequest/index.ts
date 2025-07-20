import axios from "axios";

export const login = async (email: string, password: string) => {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      email,
      password,
    })
    .then((repsonse) => {
      try {        
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
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      username,
      email,
      password,
    })
    .then((response) => {
      return response;
    });
};
