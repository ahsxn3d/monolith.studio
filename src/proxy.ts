import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect unauthenticated users back to the homepage
  },
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
