import { parseJson } from "@/hooks/useUserSession";
import { getCookie } from "cookies-next";
import { AppContext } from "next/app";

const AuthRouteRegex =
  /\/register\/verify\/(.*)?|\/register|\/log-in|\/lost-password|\/password-reset\/(.*)?/g;

const UserRouteRegex =
  /\/meal-box-settings|\/account-information|\/order-history/g;

const ProtectedRoutes = async ({ ctx: { req, res, pathname } }: AppContext) => {
  const serverClientRedirect = async (redirect?: string) => {
    if (res) {
      res.writeHead(302, {
        Location: redirect || "/log-in",
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end();
    } else {
      if (typeof window !== "undefined") {
        (window as Window).location = redirect || "/log-in";
        await new Promise(() => {});
      }
    }
  };

  try {
    const token = getCookie("auth", {
      req,
      res,
    });
    const userStr = getCookie("user", {
      req,
      res,
    });

    const isValid = token && userStr;

    if (!isValid) throw new Error();

    const isMatch = pathname.match(AuthRouteRegex);
    if (isMatch) await serverClientRedirect("/");

    return {
      token,
      user: parseJson(userStr),
    };
  } catch (err) {
    const isMatch = pathname.match(UserRouteRegex);
    if (isMatch) await serverClientRedirect("/log-in");
    return {};
  }
};

export default ProtectedRoutes;
