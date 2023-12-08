import { authOptions } from "@/lib/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getServerSession(authOptions)) as any
  const token = session?.user?.accessToken

  if (req.method === "GET") {
    const response = await fetch(
      `http://apptnote.eastus.cloudapp.azure.com:3000/cliente`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const clients = await response.json()
    res.status(200).json(clients)
  } else if (req.method === "POST") {
    const data = req.body

    const response = await fetch(
      `http://apptnote.eastus.cloudapp.azure.com:3000/cliente`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const newItem = await response.json()
    res.status(201).json(newItem)
  } else {
    res.status(405).json({ error: "Método não permitido" })
  }
}
