import { redirect } from "next/navigation"
import { env } from "@/env.mjs"

export const verifyEmailAction = async ({ email }: { email: string }) => {
  try {
    console.log("recover password " + email)

    const res = await fetch(`${env.API_URL}/recoverpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })

    console.log(res)

    if (res.status === 401 || res.status === 400) redirect("/")

    const data = await res.json()
    console.log(data)

    if (data?.error) throw new Error(data?.error)

    return data
  } catch (error) {
    console.log(error)
    throw error
    //throw new Error("Um erro ocorreu na geração do token")
  }
}

export const changePasswordAction = async ({
  password,
  token,
}: {
  password: string
  token: string
}) => {
  try {
    const res = await fetch(`${env.API_URL}/changepassword?id=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: password }),
    })
    if (res.status === 401 || res.status === 400) redirect("/")

    const data = await res.json()

    if (data?.error) throw new Error(data?.error)

    return data
  } catch (error) {}
}
