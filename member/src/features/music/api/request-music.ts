import { z } from 'zod'
import { CamelizedAPIResponse, toSchema, _CamelizedAPIResponse } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance, PostRequestOutput } from '@/libs'

export type RequestMusicResponse = CamelizedAPIResponse<ReturnType<ApiInstance['room']['_roomId']>['request']['$post']>
export type RequestMusicInput = {
  roomId: string,
  musics: string[],
  radioName: string,
  message: string
}

const responseSchema = toSchema<RequestMusicResponse>()(
  z.object({
    ok: z.boolean()
  })
)
export const requestMusic = (input: RequestMusicInput): PostRequestOutput<RequestMusicResponse> => {
  const result = useLazyAsyncData(async () => {
    const response = await apiClient().room._roomId(input.roomId).request.$post({
      body: {
        musics: input.musics,
        radio_name: input.radioName,
        message: input.message
      }
    })
    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      // const { setCurrentError } = useCurrentError()
      // setCurrentError(parseResult.error)
      // throw parseResult.error
      throw parseResult.error
    }
    return parseResult.data
  }, {
    immediate: false
  })
  result.pending.value = false
  return result
}
