const { betterAuth } = require("better-auth");
const { MongoClient } = require("mongodb");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { jwt } = require("better-auth/plugins");

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

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true,
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
    },
  },

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

  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",        secure: true,        
      partitioned: true,   
    },
  },

  plugins: [
    jwt({
      jwt: {
        definePayload: (user) => ({
          id: user.id,
          email: user.email,
          role: user.role?.toLowerCase() || "user",
        }),
      },
    }),
  ],
});