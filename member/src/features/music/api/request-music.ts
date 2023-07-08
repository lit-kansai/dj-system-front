import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { apiClient, ApiInstance, PostRequestOutput } from '@/libs'

export type RequestMusicResponse = CamelizedAPIResponse<ReturnType<ApiInstance['room']['_room_id']>['request']['$post']>
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
    const response = await apiClient().room._room_id(input.roomId).request.post({
      body: {
        musics: input.musics,
        radio_name: input.radioName,
        message: input.message
      }
    })
    const parseResult = responseSchema.safeParse(response.body)
    if (!parseResult.success) {
      throw parseResult.error
    }
    return parseResult.data
  }, {
    immediate: false
  })
  result.pending.value = false
  return result
}
