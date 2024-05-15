"use server"

import getToken from "@/actions/getToken"
import { Client, clientSchema } from "@/lib/validations/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { env } from "@/env.mjs"

export const getClientsAction = async (): Promise<Client[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/cliente`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401 || res.status === 400) redirect("/")

      return await res.json()
    } catch (error) {}
  })
}

export const getClientByIdAction = async (
  clientId: number
): Promise<Client | undefined | null> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/cliente/${clientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401 || res.status === 400) redirect("/")

      return await res.json()
    } catch (error) {}
  })
}

export async function editClientAction(input: z.infer<typeof clientSchema>) {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/cliente/${input.ID_cliente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      })
      if (res.status === 401 || res.status === 400) redirect("/")

      const data = await res.json()

      if (data?.error) throw new Error(data?.error)

      revalidatePath("/dashboard/client")

      return data
    } catch (error) {}
  })
}
export const addClientAction = async (input: z.infer<typeof clientSchema>) => {
  return getToken().then(async (token) => {
    const res = await fetch(`${env.API_URL}/cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    })
    if (res.status === 401 || res.status === 400) redirect("/")

    const data = await res.json()

    if (data?.error) throw new Error(data?.error)

    revalidatePath("/dashboard/client")

    return data
  })
}
