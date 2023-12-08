"use server"
import { authOptions } from "@/lib/auth"

import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions)

    // if (!session?.user?.email) {
    //   return null
    // }
    return session?.user
  } catch (error: any) {
    return null
  }
}
export default getCurrentUser
