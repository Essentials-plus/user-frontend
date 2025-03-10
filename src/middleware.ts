import routes, {
  authneticatedRoutes,
  guestRoutes,
  unAuthneticatedRoutes,
} from "@/config/routes";
import {
  authTokenCookieName,
  authUserCookieName,
  guestIdCookieName,
  redirectUriQueryKey,
} from "@/constants";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const unAuthneticatedRoutesRegex = new RegExp(unAuthneticatedRoutes.join("|"));
const authneticatedRoutesRegex = new RegExp(authneticatedRoutes.join("|"));
const guestRoutesRegex = new RegExp(guestRoutes.join("|"));

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const getRedirectUrl = (
    redirectTo: string,
    {
      skipAppendRedirectUri,
    }: {
      skipAppendRedirectUri?: boolean;
    } = {},
  ) => {
    const nextUrl = new URL(request.nextUrl);
    if (!skipAppendRedirectUri) {
      nextUrl.searchParams.append(redirectUriQueryKey, nextUrl.pathname);
    }
    nextUrl.pathname = redirectTo;
    return nextUrl;
  };

  const pathname = request.nextUrl.pathname;

  const authToken = !!request.cookies.get(authTokenCookieName)?.value;
  const user = !!request.cookies.get(authUserCookieName)?.value;
  const guestUserValue = request.cookies.get(guestIdCookieName)?.value;

  const guestUser = !!(guestUserValue === "undefined"
    ? undefined
    : guestUserValue);

  const hasAuth = authToken && user;

  if (pathname.match(unAuthneticatedRoutesRegex) && hasAuth) {
    return NextResponse.redirect(
      getRedirectUrl(routes.home, {
        skipAppendRedirectUri: true,
      }),
    );
  }

  if (pathname.match(authneticatedRoutesRegex) && !hasAuth) {
    return NextResponse.redirect(getRedirectUrl(routes.logIn));
  }

  if (pathname.match(guestRoutesRegex) && !hasAuth && !guestUser) {
    return NextResponse.redirect(getRedirectUrl(routes.logIn));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
