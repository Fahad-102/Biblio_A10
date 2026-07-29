import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME || "biblio-drop_db";

if (!uri) throw new Error("Missing MONGODB_URI in environment variables");

const client = new MongoClient(uri);
const db = client.db(dbName);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    "http://localhost:3000",
    "https://biblio-drop-a10.vercel.app"
  ],

  database: mongodbAdapter(db),

  emailAndPassword: { 
    enabled: true 
  }, 

  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }, 
  },

  // 🔥 1. Additional Fields Config + Field Mapping Fix
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true, // Registration এর সময় input নিতে সাহায্য করবে
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
    },
  },

  // 🔥 2. Session Payload এ role ফিল্ডটি বাধ্যতামূলকভাবে নিয়ে আসার জন্য
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    additionalFields: {
      user: {
        role: {
          type: "string",
        }
      }
    }
  },

  plugins: [
    jwt({
      jwt: {
        // 🔥 3. JWT Token এর ভেতরেও role যুক্ত রাখা
        definePayload: (user) => ({
          id: user.id,
          email: user.email,
          role: user.role?.toLowerCase() || "user",
        }),
      },
    }),
  ],
});