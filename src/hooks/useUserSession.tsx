import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { ReactNode, createContext, useContext, useState } from "react";

export type UserSession = {
  id: string;
  name: string;
  email: string;
  profile?: string;
  access: string;
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
};

const UserSessionContext = createContext<UserSessionProvider>(
  {} as UserSessionProvider,
);

function UserSessionProvider({ children, session }: Props) {
  const [user, setUser] = useState<UserSession | undefined>(session.user);
  const queryClient = useQueryClient();

  function login(token: string, user: UserSession, remember?: boolean) {
    const expires = remember ? new Date(Date.now() + 87400e6) : undefined;
    setCookie("auth", token, { expires });
    setUser(user);
    setCookie("user", JSON.stringify(user), { expires });
    queryClient.resetQueries();
  }

  function logout() {
    deleteCookie("auth");
    deleteCookie("user");
    setUser(undefined);
    queryClient.resetQueries();
  }

  function update(u: Partial<UserSession>) {
    const newUser = { ...session?.user, ...u };
    setUser(newUser);
    setCookie("user", JSON.stringify(newUser));
    return newUser;
  }

  return (
    <UserSessionContext.Provider value={{ login, logout, update, user }}>
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
