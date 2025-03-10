import publicApiClient from "@/api-clients/public-api-client";
import Button from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import routes from "@/config/routes";
import {
  guestLoginQueryKey,
  redirectUriQueryKey,
  tempAuthTokenCookieName,
} from "@/constants";
import { useUserSession } from "@/hooks/useUserSession";
import { cn } from "@/lib/utils";
import { deleteCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  token: string;
  isAlreadyVerified: boolean;
  data: any;
  redirectTo: string;
};

function VerifyToken({ isAlreadyVerified, data, redirectTo }: Props) {
  const router = useRouter();
  const { login, deleteGuestUserId } = useUserSession();

  useEffect(() => {
    const autoLogin = async () => {
      deleteCookie(tempAuthTokenCookieName);
      deleteGuestUserId();

      login(
        data.token,
        {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          profile: data.user.profile,
          access: data.user.access,
        },
        true,
      );

      if (redirectTo) {
        const url = new URL(window.location.href);
        url.searchParams.delete(redirectUriQueryKey);
        url.pathname = redirectTo;
        router.push(url);
        return;
      } else if (router.query[guestLoginQueryKey] === "true") {
        await router.push(routes.checkout);
        return;
      } else {
        await router.push(routes.logIn);
        return;
      }
    };

    const timeout = setTimeout(() => {
      autoLogin();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data, deleteGuestUserId, isAlreadyVerified, login, redirectTo, router]);

  return (
    <div className="flex h-[400px] items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <>
          {!isAlreadyVerified ? (
            <>
              <div className="text-center text-4xl font-bold">
                Gebruiker succesvol geverifieerd
              </div>
              <div className="pt-10"></div>
              <div className="flex items-center gap-5">
                <Button
                  intent={"outline-primary"}
                  onClick={() => router.push(routes.logIn)}
                >
                  <Spinner className={cn("w-5")} />U wordt ingelogd...
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-4xl font-bold">
                Gebruiker al geverifieerd of ongeldig token
              </div>
              <div className="pt-10"></div>

              <div>
                <Button
                  intent={"outline-primary"}
                  onClick={() => router.push(routes.logIn)}
                >
                  Terug naar Inloggen
                </Button>
              </div>
            </>
          )}
        </>

        <div className="pt-5"></div>
      </div>
    </div>
  );
}

export default VerifyToken;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const token = query.token || "";
    const redirectTo = query[redirectUriQueryKey] || "";

    if (!token) throw new Error();

    let isAlreadyVerified = false;

    let data = null;

    try {
      const res = await publicApiClient.post("/auth/user/signup/verify", {
        token,
      });
      data = res.data;
    } catch (error) {
      isAlreadyVerified = true;
    }

    return {
      props: {
        token: token,
        isAlreadyVerified,
        data: data.data,
        redirectTo,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: routes.logIn,
        permanent: false,
      },
    };
  }
};
