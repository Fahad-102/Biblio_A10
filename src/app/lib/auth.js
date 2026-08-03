const { betterAuth } = require("better-auth");
const { MongoClient } = require("mongodb");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME || "biblio-drop_db";

if (!uri) throw new Error("Missing MONGODB_URI in environment variables");

const client = new MongoClient(uri);
const db = client.db(dbName);

const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://biblio-drop-a10.vercel.app",
    "https://biblio-server-a10.vercel.app"
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
        input: true,
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
      sameSite: "none",        
      secure: true,        
      partitioned: true,   
    },
  },
});


module.exports = { auth };