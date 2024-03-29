import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'

export type GetRoomMusicsInput = { roomId: string }

export type GetRoomMusicsResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_room_id']>['musics']['$get']>

const responseSchema = toSchema<GetRoomMusicsResponse>()(
  z.object({
    id: z.number(),
    providedMusicId: z.string(),
    letterId: z.number(),
    artist: z.string(),
    album: z.string(),
    name: z.string(),
    thumbnail: z.string(),
    duration: z.number(),
    letter: z.object({
      id: z.number(),
      roomId: z.number(),
      radioName: z.string(),
      message: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  }).array()
)

export const getRoomMusics = async (input: GetRoomMusicsInput): GetRequestOutput<GetRoomMusicsResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._room_id(input.roomId).musics.$get()

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
