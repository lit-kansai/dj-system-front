import { z } from 'zod'
import { Ref } from 'nuxt/dist/app/compat/capi'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { ApiInstance, GetRequestOutput, apiClient } from '@/libs'

export type GetRoomLettersInput = { roomId: Ref<string> }

export type GetRoomLettersResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_room_id']>['letters']['$get']>

const responseSchema = toSchema<GetRoomLettersResponse>()(
  z.object({
    id: z.number(),
    roomId: z.number(),
    radioName: z.string().optional(),
    message: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    musics: z.object({
      id: z.number(),
      providedMusicId: z.string(),
      letterId: z.number().optional(),
      artist: z.string(),
      album: z.string(),
      name: z.string(),
      thumbnail: z.string(),
      duration: z.number()
    }).array()
  }).array()
)

export const getRoomLetters = async (input: GetRoomLettersInput): GetRequestOutput<GetRoomLettersResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._room_id(input.roomId.value).letters.$get()

    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      const { setCurrentError } = useCurrentError()
      setCurrentError(parseResult.error)
      throw parseResult.error
    }
    return parseResult.data
  }, { immediate: false })
  result.pending.value = false
  return result
}
