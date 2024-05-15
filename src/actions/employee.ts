"use server"

import getToken from "@/actions/getToken"
import {
  Employee,
  EmployeeCity,
  EmployeeHours,
  EmployeePosition,
  TechnicalManager,
  employeeSchema,
} from "@/lib/validations/employee"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { env } from "@/env.mjs"

export const getEmployeesAction = async (): Promise<Employee[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/funcionario`, {
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

export const listEmployeesReportAction = async (): Promise<Employee[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/funcionario`, {
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

export const getEmployeePositionAction = async (): Promise<
  EmployeePosition[]
> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/cargo`, {
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

export const getEmployeeHoursAction = async (): Promise<EmployeeHours[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/horario`, {
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

export const getEmployeeCityAction = async (): Promise<EmployeeCity[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/cidade`, {
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

export const getEmployeeByIdAction = async (
  employeeId: string
): Promise<Employee | undefined | null> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/funcionario/${employeeId}`, {
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

export async function editEmployeeAction(
  input: z.infer<typeof employeeSchema>
) {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(
        `${env.API_URL}/funcionario/${input.ID_funcionario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      )
      if (res.status === 401 || res.status === 400) redirect("/")

      const data = await res.json()

      if (data?.error) throw new Error(data?.error)

      revalidatePath("/dashboard/employee")

      return data
    } catch (error) {}
  })
}
export const addEmployeeAction = async (
  input: z.infer<typeof employeeSchema>
) => {
  return getToken().then(async (token) => {
    const res = await fetch(`${env.API_URL}/funcionario`, {
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

    revalidatePath("/dashboard/employee")

    return data
  })
}

export const getManagerAction = async (): Promise<TechnicalManager[]> => {
  return getToken().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/projetosgerente`, {
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
