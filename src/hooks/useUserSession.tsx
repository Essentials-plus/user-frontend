import {
  authTokenCookieName,
  authUserCookieName,
  guestIdCookieName,
} from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookie } from "react-use";

export type UserSession = {
  id: string;
  name: string;
  email: string;
  profile?: string;
  access: string;
};

export type GuestUser = null | {
  idOrEmail: string;
};

type Props = {
  children: ReactNode;
  session: { user: UserSession; token: string };
};

type UserSessionProvider = {
  user: UserSession | undefined;
  // eslint-disable-next-line no-unused-vars
  login: (token: string, user: UserSession, remember?: boolean) => any;
  logout: () => any;
  // eslint-disable-next-line no-unused-vars
  update: (u: Partial<UserSession>) => UserSession;
  guestUserId: string | null;
  updateGuestUserId: (
    // eslint-disable-next-line no-unused-vars
    newValue: string,
    // eslint-disable-next-line no-unused-vars
    options?: Cookies.CookieAttributes | undefined,
  ) => void;
  deleteGuestUserId: () => void;
  refetchGuestUserId: () => void;
};

const UserSessionContext = createContext<UserSessionProvider>(
  {} as UserSessionProvider,
);

function UserSessionProvider({ children, session }: Props) {
  const [user, setUser] = useState<UserSession | undefined>(session.user);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [guestUserId, updateGuestUserId, deleteGuestUserId] =
    useCookie(guestIdCookieName);

  function login(token: string, user: UserSession, remember?: boolean) {
    const expires = remember ? new Date(Date.now() + 87400e6) : undefined;
    setCookie(authTokenCookieName, token, { expires });
    setUser(user);
    setCookie(authUserCookieName, JSON.stringify(user), { expires });
    queryClient.resetQueries();
  }

  function logout() {
    deleteCookie(authTokenCookieName);
    deleteCookie(authUserCookieName);
    setUser(undefined);
    queryClient.resetQueries();
  }

  function update(u: Partial<UserSession>) {
    const newUser = { ...session?.user, ...u };
    setUser(newUser);
    setCookie(authUserCookieName, JSON.stringify(newUser));
    return newUser;
  }

  const refetchGuestUserId = useCallback(() => {
    const guestUserIdOrEmail = getCookie(guestIdCookieName);
    if (guestIdCookieName) {
      updateGuestUserId(guestUserIdOrEmail as string);
    }
  }, [updateGuestUserId]);

  useEffect(() => {
    refetchGuestUserId();
  }, [refetchGuestUserId, updateGuestUserId]);

  useEffect(() => {
    refetchGuestUserId();
  }, [router.pathname, refetchGuestUserId]);

  return (
    <UserSessionContext.Provider
      value={{
        login,
        logout,
        update,
        user,
        guestUserId:
          guestUserId === "undefined" || guestUserId === "null"
            ? null
            : guestUserId,
        updateGuestUserId,
        deleteGuestUserId,
        refetchGuestUserId,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  return useContext(UserSessionContext);
}

export function parseJson<T>(d?: string): T | undefined {
  try {
    return JSON.parse(d || "");
  } catch (error) {
    return undefined;
  }
}

export default UserSessionProvider;
