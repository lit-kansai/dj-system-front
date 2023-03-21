import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { apiClient, ApiInstance, GetRequestOutput } from '@/libs'

export type GetTop50MusicsResponse = CamelizedAPIResponse<ReturnType<ApiInstance['room']['_roomId']>['music']['top']['$get']>

export type GetTop50MusicsInput = {
  roomId: string,
}

const responseSchema = toSchema<GetTop50MusicsResponse>()(
  z.array(
    z.object({
      id: z.string(),
      artists: z.string(),
      album: z.string(),
      name: z.string(),
      thumbnail: z.string(),
      duration: z.number()
    })
  )
)

export const getTop50Musics = (input: GetTop50MusicsInput): GetRequestOutput<GetTop50MusicsResponse> => {
  const result = useLazyAsyncData(async () => {
    const response = await apiClient().room._roomId(input.roomId).music.top.$get()
    const parseResult = responseSchema.safeParse(response)
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
