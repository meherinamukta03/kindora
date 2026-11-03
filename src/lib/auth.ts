
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"
const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("kindora");

console.log("Database name:", db.databaseName);


export const auth = betterAuth({


    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },

    // Google OAuth — only wired up when credentials exist in .env,
    // so the dev server keeps working before they are added.
    // socialProviders: {
    //     ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    //         ? {
    //               google: {
    //                   clientId: process.env.GOOGLE_CLIENT_ID,
    //                   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //               },
    //           }
    //         : {}),
    // },

    // Let Google sign-in link to an existing email/password account with the
    // same email (that account is created without email verification).
    // account: {
    //     accountLinking: {
    //         trustedProviders: ["google"],
    //         requireLocalEmailVerified: false,
    //     },
    // },


     plugins: [
        jwt(), 
    ],

session:{

cookieCache:{
    enable:true,
    strategy:'jwt',
    maxAge:60*60*24*7
}


}


});