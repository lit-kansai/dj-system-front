import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'

export type IntegrateAppleMusicInput = { musicUserToken: string, accessToken: string }

export type IntegrateApplemusicResponse = CamelizedAPIResponse<ApiInstance['mc']['user']['link']['applemusic']['callback']['$post']>

const responseSchema = toSchema<IntegrateApplemusicResponse>()(
  z.object({
    ok: z.boolean()
  })
)

export const getApplemusicAccessToken = async (input: IntegrateAppleMusicInput): GetRequestOutput<IntegrateApplemusicResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.user.link.applemusic.callback.$post({
      body: {
        music_user_token: input.musicUserToken,
        access_token: input.accessToken
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
