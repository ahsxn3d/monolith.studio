import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (user.email === "ahsxn3d@gmail.com") {
        return true;
      }
      return false; // Block the login
    },
  },
  pages: {
    error: "/", // Redirect to home if access is denied
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
