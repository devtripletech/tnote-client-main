import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email({
    message: "Entre com email válido",
  }),
  password: z.string(),
  // .min(8, {
  //   message: "Password must be at least 8 characters long",
  // })
  // .max(100)
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
  //   message:
  //     "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
  // }),
})
export const userPayloadSchema = z.object({
  role: z.number(),
  email: z.string(),
})
export type UserPayload = z.infer<typeof userPayloadSchema>

export const verfifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
})

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
})

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não combinam",
    path: ["confirmPassword"],
  })
