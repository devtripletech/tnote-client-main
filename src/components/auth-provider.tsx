"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"

export interface AuthProvideProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProvideProps) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  )
}
