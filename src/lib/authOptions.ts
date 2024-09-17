import publicApiClient from "@/api-clients/public-api-client";
import { User } from "@/types/api-responses/users";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/log-in",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      id: "auth",
      name: "User Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { data } = await publicApiClient.post(
          "/auth/user/login",
          credentials,
        );

        const user: User = data.user;

        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          profile: user.profile,
        };
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || "",
    //   clientSecret: process.env.GOOGLE_SECRET || "",

    //   profile: async (profile, tokens) => {
    //     try {
    //       const { data } = await client.query({
    //         query: GET_STUDENT,
    //         variables: { email: profile.email },
    //       });
    //       const std = data.student;
    //       return {
    //         id: std.id,
    //         name: std.name,
    //         email: std.email,
    //         profile: std.profile,
    //         joinedAt: std.joinedAt,
    //       };
    //     } catch (error) {
    //       const { data } = await client.mutate({
    //         mutation: CREATE_STUDENT,
    //         variables: {
    //           input: {
    //             name: profile.name,
    //             email: profile.email,
    //             profile: profile.picture,
    //             verified: true,
    //           },
    //         },
    //       });

    //       const std = data.createStudent;
    //       return {
    //         id: std.id,
    //         name: std.name,
    //         email: std.email,
    //         profile: std.profile,
    //         joinedAt: std.joinedAt,
    //       };
    //     }
    //   },
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID || "",
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",

    //   profile: async (profile, tokens) => {
    //     try {
    //       const { data } = await client.query({
    //         query: GET_STUDENT,
    //         variables: { email: Number(profile.email) },
    //       });
    //       const std = data.student;
    //       return {
    //         id: std.id,
    //         name: std.name,
    //         email: std.email,
    //         profile: std.profile,
    //         joinedAt: std.joinedAt,
    //       };
    //     } catch (error) {
    //       const { data } = await client.mutate({
    //         mutation: CREATE_STUDENT,
    //         variables: {
    //           input: {
    //             name: profile.name,
    //             email: profile.email,
    //             profile: profile.picture.data.url,
    //             verified: true,
    //           },
    //         },
    //       });

    //       const std = data.createStudent;
    //       return {
    //         id: std.id,
    //         name: std.name,
    //         email: std.email,
    //         profile: std.profile,
    //         joinedAt: std.joinedAt,
    //       };
    //     }
    //   },
    // }),
    // AppleProvider({
    //   clientId: process.env.GITHUB_ID || "",
    //   clientSecret: process.env.GITHUB_SECRET || "",

    //   profile: async (profile, tokens) => {
    //     try {
    //       const { data } = await client.query({
    //         query: GET_STUDENT,
    //         variables: { email: profile.email },
    //       });
    //       const std = data.student;
    //       return {
    //         id: std.id,
    //         name: std.name,
    //         email: std.email,
    //         profile: std.profile,
    //         joinedAt: std.joinedAt,
    //       };
    //     } catch (error) {
    //       const { data } = await client.mutate({
    //         mutation: CREATE_STUDENT,
    //         variables: {
    //           input: {
    //             name: profile.name ?? profile.login,
    //             email: profile.email,
    //             profile: profile.avatar_url,
    //             verified: true,
    //           },
    //         },
    //       });

    //       const std = data.createStudent;
    //       return {
    //         id: std.id,
    //         name: std.name,
    //         email: std.email,
    //         profile: std.profile,
    //         joinedAt: std.joinedAt,
    //       };
    //     }
    //   },
    // }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) token.user = user as any;
      if (trigger === "update" && session.user) {
        token.user = session.user;
      }
      return token;
    },

    async session({ token, session }: any) {
      session.user = token.user;
      return session;
    },
  },
};
