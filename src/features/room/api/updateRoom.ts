import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type updateRoomInput = {
  roomId: string,
  urlName: string,
  roomName: string,
  description: string
}

export type updateRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['$put']>

const responseSchema = toSchema<updateRoomResponse>()(
  z.object({
    id: z.object({ roomId: z.string() }),
    ownerUserId: z.number(),
    displayId: z.string(),
    name: z.string(),
    description: z.string(),
    playlistId: z.object({ playlist_id: z.string() }).optional(),
    provider: z.object({ provider: z.string() }).optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
)

export const updateRoom = async (input: updateRoomInput): GetRequestOutput<updateRoomResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._roomId(input.roomId).$put({
      body: {
        url_name: input.urlName,
        room_name: input.roomName,
        description: input.description
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
