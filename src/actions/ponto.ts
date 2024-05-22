"use server"

import getToken from "@/actions/getToken"
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from "next/cache"
import { env } from "@/env.mjs"
import { Project, projectSchema } from "@/lib/validations/project"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { refundSchema } from "@/lib/validations/reembolso"

interface PontoResponse {
  Entrada: string
  Saida: string
  dia: string
}

export const getPontoListAction = async (
  email: string
): Promise<PontoResponse[]> => {
  noStore()
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/ponto/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401 || res.status === 400) redirect("/")

      const data = await res.json()

      if (data?.error) throw new Error(data?.error)

      return data
    } catch (error) {}
  })
}

export const registerPontoAction = async (email: string) => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/ponto/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      revalidatePath("/ponto")

      return data
    } catch (error) {}
  })
}

interface RegisterReembolsoProps {
  email: string
  input: z.infer<typeof refundSchema>
}
export const registerReembolsoAction = async ({
  email,
  input,
}: RegisterReembolsoProps) => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/reembolsotokenponto/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      })

      const data = await res.json()
      revalidatePath("/reembolso")

      return data
    } catch (error) {}
  })
}

export interface ReembolsoResponse {
  PontoID: number
  DIA: string

  E_1: string
  S_1: string

  E_2: string
  S_2: string

  E_3: string
  S_3: string

  KM: number
  REFEICAO: string
  ESTACIONAMENTO: string
  OUTROS: string
}

export const getReembolsoList = async (
  email: string
): Promise<ReembolsoResponse[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/reembolsobuscalist/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      return data.resultado
    } catch (error) {}
  })
}
