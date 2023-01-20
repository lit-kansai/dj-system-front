import { googleOAuthQuerySchema, GoogleOAuthQuery } from './schema'
import { logger } from '@/libs'
import { APPLE_MUSIC_API_CALLBACK_PATH, GOOGLE_API_CALLBACK_PATH, SPOTIFY_API_CALLBACK_PATH } from '@/constants'
import { LocationQuery } from '@/types'

export const oauthCallback = async (
  path: string,
  query: LocationQuery,
  callbacks: {
    google: (params: GoogleOAuthQuery) => Promise<void>
    spotify: (params: LocationQuery) => Promise<void>
    apple: (params: LocationQuery) => Promise<void>
  } = {
    google: async (_) => {},
    spotify: async (_) => {},
    apple: async (_) => {},
  },
) => {
  switch (path) {
    case GOOGLE_API_CALLBACK_PATH: {
      const parseResult = googleOAuthQuerySchema.safeParse(query)
      if (!parseResult.success) { logger.log('invalid parameters', query); return }
      await callbacks.google(parseResult.data)
      break
    }
    case SPOTIFY_API_CALLBACK_PATH: {
      await callbacks.spotify(query)
      break
    }
    case APPLE_MUSIC_API_CALLBACK_PATH: {
      await callbacks.apple(query)
      break
    }
  }
}
