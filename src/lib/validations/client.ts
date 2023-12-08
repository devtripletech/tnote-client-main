import { z } from "zod"

export const clientSchema = z.object({
  ID_cliente: z.number().optional(),
  Nome: z.string(),
  Ativo: z.boolean(),
  ID_sharepoint: z.string().nullable().optional(),
  ID_funcionario: z.string().optional(),
  last_update: z.string().optional(),
})

export type Client = z.infer<typeof clientSchema>
