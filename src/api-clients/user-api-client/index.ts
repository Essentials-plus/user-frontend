import { authTokenCookieName } from "@/constants";
import axios from "axios";
import { getCookie } from "cookies-next";

export const userApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_API_BASE_URL,
});

userApiClient.interceptors.request.use(
  function (config) {
    const token = getCookie(authTokenCookieName);
    if (token && config && config.headers) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// userApiClient.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error instanceof AxiosError) {
//       if (error.response?.status === 401) {
//         deleteCookie(authTokenCookieName);
//         deleteCookie(authUserCookieName);

//         toast.error(
//           getApiErrorMessage(
//             error,
//             "Uw sessie is verlopen. Meld u opnieuw aan.",
//           ),
//         );
//         setTimeout(() => {
//           window.location.href = routes.logIn;
//         }, 2000);
//       }
//     }
//     return Promise.reject(error);
//   },
// );
