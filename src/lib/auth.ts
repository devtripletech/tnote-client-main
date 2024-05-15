import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { env } from "@/env.mjs"

export const authOptions: NextAuthOptions = {
  providers: [
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

        const response = await fetch(`${env.API_URL}/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        })

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
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
}
