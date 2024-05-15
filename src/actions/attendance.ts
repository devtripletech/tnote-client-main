"use server"
import { redirect } from "next/navigation"
import getToken from "@/actions/getToken"
import { Attendance, addAttendanceSchema } from "@/lib/validations/attendance"
import { z } from "zod"
import getCurrentUser from "./getCurrentUser"
import { catchError } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { env } from "@/env.mjs"

export const getAttendanceAction = async (): Promise<Attendance[]> => {
  const user = await getCurrentUser()
  return getToken().then(async (token) => {
    try {
      const res = await fetch(
        `${env.API_URL}/horasprojetoindex/${user?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (res.status === 401 || res.status === 400) redirect("/")

      return await res.json()
    } catch (error) {}
  })
}

export const getAttendanceByIdAction = async (
  attendanceId: number
): Promise<Attendance | undefined | null> => {
  try {
    const res = await fetch(`${env.API_URL}/horasprojeto/${attendanceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
    if (res.status === 401 || res.status === 400) redirect("/")
    return res.json()
  } catch (error: any) {}
}

const extendedAttendanceSchema = addAttendanceSchema.extend({
  token: z.string(),
  attendanceId: z.string().optional(),
})
export const addAttendanceAction = async (
  rawInput: z.infer<typeof extendedAttendanceSchema>
) => {
  const input = extendedAttendanceSchema.parse(rawInput)
  return getToken().then(async (token) => {
    const res = await fetch(
      `${env.API_URL}/horasprojeto`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_projeto: input.ID_projeto,
          id_funcionario: input.ID_funcionario,
          horaInicio: input.HoraInicioString,
          horaFim: input.HoraFimString,
          km: input.KM,
          refeicao: input.Refeicao,
          estacionamento: input.Estacionamento,
          outros: input.Outros,
          descricao: input.Descricao,
          valorHora: 0,
          valorKM: 0,
          ticket: "0",
          iD_lancamento_sharepoint: 0,
          curso: input.curso,
          conducoes: input.conducoes,
          alimentacaocliente: input.alimentacaocliente,
        }),
      }
    )
    if (res.status === 401 || res.status === 400) redirect("/")

    const data = await res.json()

    if (data?.error) throw new Error(data?.error)
    revalidatePath("/dashboard/attendance")
  })
}

export async function editAttendanceAction(
  rawInput: z.infer<typeof extendedAttendanceSchema>
) {
  const input = extendedAttendanceSchema.parse(rawInput)

  const res = await fetch(
    `${env.API_URL}/horasprojeto/${input.ID_lancamento}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${input.token}`,
      },
      body: JSON.stringify({
        id_projeto: input.ID_projeto,
        id_funcionario: input.ID_funcionario,
        horaInicio: input.HoraInicioString,
        horaFim: input.HoraFimString,
        km: input.KM,
        refeicao: input.Refeicao,
        estacionamento: input.Estacionamento,
        outros: input.Outros,
        descricao: input.Descricao,
      }),
    }
  )

  if (res.status === 401 || res.status === 400) redirect("/")

  const data = await res.json()

  if (data?.error) throw new Error(data?.error)

  revalidatePath("/dashboard/attendance")
}

export async function duplicateAttendanceAction(id: number) {
  return getToken().then(async (token) => {
    console.log(token)
    const res = await fetch(`${env.API_URL}/horasprojetodup/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 401 || res.status === 400) redirect("/")
    revalidatePath("/dashboard/attendance")
    return await res.json()
  })
}
