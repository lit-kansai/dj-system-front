import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type GetRoomLettersInput = { roomId: string }

export type GetRoomLettersResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['letters']['$get']>

const responseSchema = toSchema<GetRoomLettersResponse>()(
  z.object({
    id: z.string(),
    roomId: z.number(),
    radioName: z.string(),
    message: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    musics: z.object({
      id: z.number(),
      providedMusicId: z.string(),
      letterId: z.string(),
      artists: z.string(),
      album: z.string(),
      name: z.string(),
      thumbnail: z.string(),
      duration: z.string()
    }).array()
  }).array()
)

export const getRoomLetters = async (input: GetRoomLettersInput): GetRequestOutput<GetRoomLettersResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._roomId(input.roomId).letters.$get()

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
