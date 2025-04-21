import { authTokenCookieName, authUserCookieName } from "@/constants";
import { parseJson } from "@/hooks/useUserSession";
import { getCookie } from "cookies-next";
import { AppContext } from "next/app";

const ProtectedRoutes = async ({ ctx: { req, res } }: AppContext) => {
  try {
    const token = getCookie(authTokenCookieName, {
      req,
      res,
    });
    const userStr = getCookie(authUserCookieName, {
      req,
      res,
    });

    const isValid = token && userStr;

    if (!isValid) throw new Error();

    return {
      token,
      user: parseJson(userStr),
    };
  } catch (err) {
    return {};
  }
};

export default ProtectedRoutes;
