import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME;

if (!uri) throw new Error("Missing MONGODB_URI");

const client = new MongoClient(uri);
const db = client.db(dbName);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://biblio-a10.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_build",
  
  database: mongodbAdapter(db, {
    client: client
  }),
  
  emailAndPassword: { 
    enabled: true, 
  }, 
  
  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID || "", 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", 
    }, 
  },
  
  user: {
    additionalFields: {
      role: { defaultValue: "user" },
      plan: { defaultValue: "free" },
    },
  },
  
  session: {
    cookieCache: {
      enable: true,
      strategy: 'jwt',
      maxAge: 60 * 24 * 30 
    },
  },
  
  plugins: [jwt()]
});