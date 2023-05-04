import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'

export type updateRoomInput = {
  roomId: string,
  urlName: string,
  roomName: string,
  description: string
}

export type updateRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['$put']>

const responseSchema = toSchema<updateRoomResponse>()(
  z.object({
    id: z.number(),
    ownerUserId: z.number(),
    displayId: z.string(),
    name: z.string(),
    description: z.string(),
    playlistId: z.string().optional(),
    provider: z.string().optional(),
    roomCooltime: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
)

// room_cooltimeの設定ができるようにする
export const updateRoom = async (input: updateRoomInput): GetRequestOutput<updateRoomResponse> => {
  const result = await useAsyncData(async () => {
    const response = await apiClient().mc.room._roomId(input.roomId).$put({
      body: {
        url_name: input.urlName,
        room_name: input.roomName,
        description: input.description,
        room_cooltime: 300
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
  result.pending.value = false
  return result
}
