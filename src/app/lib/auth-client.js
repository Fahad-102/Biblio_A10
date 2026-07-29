import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const getBaseUrl = () => {
  // ১. ব্রাউজার রানটাইমে বর্তমান অরিজিন (যেমন http://localhost:3000) নিবে
  if (typeof window !== "undefined") {
    return window.location.origin; 
  }
  
  // ২. SSR-এর সময় .env এর URL নিবে, কোনো কারণে ফাঁকা স্পেস থাকলে তা মুছে দিবে
  const envUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
  return envUrl.replace(/\s+/g, "").trim();
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [jwtClient()]
});

export const { signIn, signUp, signOut, useSession } = authClient;