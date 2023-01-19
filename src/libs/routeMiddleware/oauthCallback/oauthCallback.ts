import { googleOAuthQuerySchema, GoogleOAuthQuery } from './schema'
import { logger } from '@/libs'
import { APPLE_MUSIC_API_CALLBACK_PATH, GOOGLE_API_CALLBACK_PATH, SPOTIFY_API_CALLBACK_PATH } from '@/constants'
import { LocationQuery } from '@/types'

export const oauthCallback = (
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
  }
) => {
  // TODO: 必要なQueryParametersなかったらreturnする
  if (path === GOOGLE_API_CALLBACK_PATH) {
    const parseResult = googleOAuthQuerySchema.safeParse(query)
    if (!parseResult.success) { logger.log('invalid parameters', query); return }
    callbacks.google(parseResult.data)
  }
  if (path === SPOTIFY_API_CALLBACK_PATH) {
    callbacks.spotify(query)
  }
  if (path === APPLE_MUSIC_API_CALLBACK_PATH) {
    callbacks.apple(query)
  }
}
