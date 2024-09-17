import axios from "axios";
import { getCookie } from "cookies-next";

export const userApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_API_BASE_URL,
});

userApiClient.interceptors.request.use(
  function (config) {
    const token = getCookie("auth");
    if (token && config && config.headers) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
