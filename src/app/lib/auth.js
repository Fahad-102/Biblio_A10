import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]); 

import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI
const dbName = process.env.AUTH_DB_NAME

const client = new MongoClient(uri);
const db = client.db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID , 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }, 
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "user",
      },
      plan: {
        defaultValue: "free"
      },
    },
  },
  session:{
    cookieCache:{
      enable:true,
      strategy:'jwt',
      maxAge:60 * 24 * 30
    },
  },
  plugins:[jwt()]
});