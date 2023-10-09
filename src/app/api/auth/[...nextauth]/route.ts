import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import type { NextAuthOptions, Session } from 'next-auth'
import { User } from "@prisma/client";
import { prisma } from "@/server/db";
import { NextApiRequest } from "next";

export const nextAuthOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,  //env("DATABASE_URL")?
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        })
        , CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.

            //default signin page input fields
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },

            authorize: async (credentials, req) => {
                // Add logic here to look up the user from the credentials supplied
                console.log('SIGN,****************');
                return { email: 'qwe' } as User
                // const user = await prisma.user.findFirst({
                //     where: {
                //         email: credentials?.username,
                //     }
                // });
                // if (user) {
                //     // Any object returned will be saved in `user` property of the JWT
                //     return user;
                // } else {
                //     // If you return null then an error will be displayed advising the user to check their details.
                //     return null;

                //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                // }
            },
        }),
    ],
    // pages: {
    //     // signIn: "/auth/login", // sign() artik default sayfaya degil buraya yonlendirilir.
    // },

    session: {
        strategy: 'jwt', //! diger providerlar'i eziyor dc vb.
        maxAge: 24 * 60 * 60 * 30, // 30 Days   //next-auth-token cookie will be set to expired in 30 days.
        //on expire. when user refresh the page, will log-out
    },

    callbacks: {
        //@ts-ignore
        jwt: async ({ token, account, session, user }) => {
            'token is the jwt token that next-auth will use to authenticate the user.(next-auth generates it) (dcrypt version of token)';

            'onemsiz'
            'account ilk defa giris yapildiginda hangi providerla giris yaptigi bilgisini tutuyor. bunun disinda undefined';
            `user ilk defa giris yapildigina user bilgisi tutar. bunun disinda undefined,
             credential ise yukaridaki credential-> authorize callback'den donen User.` // type PrismaUser | AdapterUser (discrod vb)
            'session hep undefined??'
            'token bunlarin hepsini icern jwt tokenin dcrypt edilmis hali.'

            'burada tokeni degistirebiliriz.'
            
            return { ...token, tes: 'asd' };
        },
        session: async ({ session, token }) => {
            `sesion.user =prismaUser(authorize callback'den donen) | adapterUser.`
            'token jwt den donen token. dilersek nextin generat ettigi tokeni yukarida degistirebiliriz.'
            return session
        },
    },
};


const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

