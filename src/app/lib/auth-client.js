import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin; 
  }
  return process.env.BETTER_AUTH_URL || "https://biblio-drop-a10.vercel.app"; 
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl(),
    plugins: [jwtClient()]
});

export const { signIn, signUp, signOut, useSession } = authClient;