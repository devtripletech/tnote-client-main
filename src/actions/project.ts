"use server"

import getToken from "@/actions/getToken"
import { Client, clientSchema } from "@/lib/validations/client"
import { Project, projectSchema } from "@/lib/validations/project"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { env } from "@/env.mjs"

export const getProjectsAction = async (): Promise<Project[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/projetos`, {
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

export const getProjectByIdAction = async (
  projectId: number
): Promise<Project | undefined | null> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/projetos/${projectId}`, {
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

export async function editProjectAction(input: z.infer<typeof projectSchema>) {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/projetos/${input.ID_projeto}`, {
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

      revalidatePath("/dashboard/project")

      return data
    } catch (error) {}
  })
}
export const addProjectAction = async (
  input: z.infer<typeof projectSchema>
) => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/projetos`, {
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

      revalidatePath("/dashboard/project")

      return data
    } catch (error) {}
  })
}
