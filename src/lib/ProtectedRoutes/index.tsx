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

    // const isMatch = pathname.match(AuthRouteRegex);
    // if (isMatch) await serverClientRedirect(routes.home);

    return {
      token,
      user: parseJson(userStr),
    };
  } catch (err) {
    // const isMatch = pathname.match(UserRouteRegex);
    // if (isMatch) await serverClientRedirect(routes.logIn);
    return {};
  }
};

export default ProtectedRoutes;
