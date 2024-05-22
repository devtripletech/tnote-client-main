import { z } from "zod"

const toNumber = (value: any) => {
  if (typeof value === "number") {
    return value
  }
  if (typeof value === "string") {
    const parsed = parseFloat(value)
    if (!isNaN(parsed)) {
      return parsed
    }
  }
  throw new Error("Invalid input")
}
export const refundSchema = z.object({
  comentario: z.string().min(1, {
    message: "Digite um comentário",
  }),
  refeicao: z
    .preprocess(
      toNumber,
      z.number({
        invalid_type_error: "O valor deve ser um numero",
      })
    )
    .optional(),
  outros: z
    .preprocess(
      toNumber,
      z.number({
        invalid_type_error: "O valor deve ser um numero",
      })
    )
    .optional(),
  estacionamento: z
    .preprocess(
      toNumber,
      z.number({
        invalid_type_error: "O valor deve ser um numero",
      })
    )
    .optional(),
  id_ponto: z.number(),

  km: z
    .preprocess(
      toNumber,
      z.number({
        invalid_type_error: "O valor deve ser um numero",
      })
    )
    .optional(),
})
export type Refund = z.infer<typeof refundSchema>
