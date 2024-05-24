import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const BASE_URL = process.env.NEXT_PUBLIC_APP_API;

        const LOGIN_URL = `${BASE_URL}/login`;

        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const res = await fetch(LOGIN_URL, {
            method: "POST",
            body: JSON.stringify(credentialDetails),
            headers: { Accept: "application/json", "Content-Type": "application/json" },
          });

          let data = await res.json();

          if (res.status === 200) return { user: data?.data?.token };
          if (!res.ok) throw data?.data?.errors;
        } catch (error) {
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 60,
  },
};
