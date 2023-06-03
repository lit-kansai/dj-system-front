import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'

export type GetApplemusicAccessTokenResponse = CamelizedAPIResponse<ApiInstance['mc']['user']['link']['applemusic']['$get']>

const responseSchema = toSchema<GetApplemusicAccessTokenResponse>()(
  z.object({
    accessToken: z.string()
  })
)

export const getApplemusicAccessToken = async (): GetRequestOutput<GetApplemusicAccessTokenResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.user.link.applemusic.$get()

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
