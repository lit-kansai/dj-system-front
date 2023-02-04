import { logger, spotifyOAuthQuerySchema } from '@/libs'
import { LocationQuery } from '@/types'
import { integrateSpotify } from '@/features/auth/api/'

export const spotify = async (input: {query: LocationQuery}) => {
  // TODO: エラーハンドリングしよう
  const parseResult = spotifyOAuthQuerySchema.safeParse(input.query)
  if (!parseResult.success) { logger.log('invalid parameters', input.query); return }
  const { code } = parseResult.data
  const { data } = await integrateSpotify({ code })
  return data.value
}
