import { z } from 'zod'

const env = z.object({
  NODE_ENV: z.string(),
  BASE_API_URL: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
