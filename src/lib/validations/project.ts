import { z } from "zod"

export const projectSchema = z.object({
  ID_projeto: z.number().optional(),
  Nome: z.string(),
  Inicio: z.string().optional(),
  Termino: z.string().optional(),
  Status: z.string().optional(),
  Reembolsavel: z.string().optional(),
  ID_Cliente: z.number(),
  Spiceworks: z.string().optional(),
  GerenteTecnico: z.string(),
  ID_projeto_sharepoint: z.number().optional(),
  Descricao: z.string(),
})

export type Project = z.infer<typeof projectSchema>
