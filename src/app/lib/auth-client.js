import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin; 
  }
  const envUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
  return envUrl.replace(/\s+/g, "").trim();
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [jwtClient()]
});

export const { signIn, signUp, signOut, useSession } = authClient;