import { authTokenCookieName, guestIdCookieName } from "@/constants";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const guestApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GUEST_API_BASE_URL,
});

guestApiClient.interceptors.request.use(
  function (config) {
    const token = getCookie(authTokenCookieName);
    const guestId = getCookie(guestIdCookieName);
    if (token && config && config.headers) {
      config.headers["authorization"] = token;
    }
    if (guestId) {
      config.headers[guestIdCookieName] = guestId;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
guestApiClient.interceptors.response.use(
  function (response) {
    if (response.data?.guestId) {
      setCookie(guestIdCookieName, response.data.guestId);
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default guestApiClient;
