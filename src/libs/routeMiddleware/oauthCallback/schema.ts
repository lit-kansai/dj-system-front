import { z } from 'zod'

export const googleOAuthQuerySchema = z.object({
  code: z.string(),
})

export type GoogleOAuthQuery = z.infer<typeof googleOAuthQuerySchema>
