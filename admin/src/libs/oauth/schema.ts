import { z } from 'zod'

export const googleOAuthQuerySchema = z.object({
  code: z.string(),
})

export const spotifyOAuthQuerySchema = z.object({
  code: z.string(),
})

export type GoogleOAuthQuery = z.infer<typeof googleOAuthQuerySchema>
export type SpotifyOAuthQuery = z.infer<typeof spotifyOAuthQuerySchema>
