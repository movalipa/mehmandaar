import { loadEnvConfig } from "@next/env"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

// if running without nextjs - load manually
if (!process.env.DATABASE_URL) {
  loadEnvConfig(process.cwd())
}

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    SESSION_SECRET: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
})
