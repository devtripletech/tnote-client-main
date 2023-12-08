import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: "",
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const response = await fetch(
          `http://apptnote.eastus.cloudapp.azure.com:3000/login`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          }
        )

        const data = await response.json()
        const user = {
          id: data?.email,
          email: data?.email,
          role: data?.role,
          accessToken: data?.token,
        }

        if (response.ok && user) {
          return user
        }
        return null
      },
    }),
  ],
  callbacks: {
    // async signIn({ account }) {
    //   if (
    //     !account?.scope?.includes("https://www.googleapis.com/auth/calendar")
    //   ) {
    //     return "/register/connect-calendar/?error=permissions"
    //   }
    //   return true
    // },
    session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          role: token.role,
          Key: token.randomKey,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          accessToken: u.accessToken,
          role: u.role,
          Key: u.randomKey,
        }
      }
      return token
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  // debug: process.env.NODE_ENV === "development",
  // session: {
  //   strategy: "jwt",
  // },
  // secret: process.env.NEXTAUTH_SECRET,
}
