import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'
import { SPOTIFY_API_CALLBACK_URL } from '@/constants'

export type GetSpotifyOauthURLResponse = CamelizedAPIResponse<ApiInstance['mc']['user']['link']['spotify']['$get']>

const responseSchema = toSchema<GetSpotifyOauthURLResponse>()(
  z.object({
    redirectUrl: z.string()
  })
)

export const getSpotifyOAuthUrl = async (): GetRequestOutput<GetSpotifyOauthURLResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.user.link.spotify.$get({
      query: { redirect_url: SPOTIFY_API_CALLBACK_URL }
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
