import { z } from 'zod'

const env = z.object({
  API_URL_PROD: z.string(),
  API_URL_DEV: z.string()
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
