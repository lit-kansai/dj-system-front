import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'
import { SPOTIFY_API_CALLBACK_URL } from '@/constants'

export type IntegrateSpotifyInput = { code: string }

export type IntegrateSpotifyResponse = CamelizedAPIResponse<ApiInstance['mc']['user']['link']['spotify']['callback']['$post']>

const responseSchema = toSchema<IntegrateSpotifyResponse>()(
  z.object({
    ok: z.boolean()
  })
)

export const integrateSpotify = async (input: IntegrateSpotifyInput): GetRequestOutput<IntegrateSpotifyResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.user.link.spotify.callback.$post({
      body: {
        redirect_url: SPOTIFY_API_CALLBACK_URL,
        code: input.code
      }
    })

    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      const { setCurrentError } = useCurrentError()
      setCurrentError(parseResult.error)
      throw parseResult.error
    }
    return parseResult.data
  })
  return result
}
