import { guestIdCookieName } from "@/constants";
import axios from "axios";
import { getCookie } from "cookies-next";

const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "hi",
  },
});

publicApiClient.interceptors.request.use(
  function (config) {
    const guestId = getCookie(guestIdCookieName);
    if (guestId) {
      config.headers[guestIdCookieName] = guestId;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default publicApiClient;
