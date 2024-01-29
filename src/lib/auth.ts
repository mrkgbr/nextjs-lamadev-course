import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { TUser, User } from "./models";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";

const login = async (credentials: { username: string; password: string }) => {
  try {
    connectToDb();
    const user: TUser | null = await User.findOne({
      username: credentials.username,
    });
    if (!user || !user.password) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password.toString(),
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials): Promise<any> {
        try {
          const user = await login(
            credentials as { username: string; password: string }
          );
          console.log(user);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        connectToDb();
        try {
          if (!profile) throw new Error("missing data");
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            if (!profile.login || !profile.email)
              throw new Error("missing data");
            const newUser = new User({
              //@ts-ignore
              username: profile.login,
              email: profile.email,
              //@ts-ignore
              image: profile.avatar_url,
              isAdmin: false,
            });

            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
} satisfies NextAuthConfig);
