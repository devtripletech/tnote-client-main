import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    API_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  emptyStringAsUndefined: true,
})
