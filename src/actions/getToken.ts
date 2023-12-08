"use server"
import { authOptions } from "@/lib/auth"
import { User } from "@/types"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

const getToken = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return null
    }
    const user = session.user as User

    return user.accessToken
  } catch (error: any) {
    return null
  }
}
export default getToken
