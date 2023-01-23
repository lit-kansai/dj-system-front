import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type CreateRoomInput = {
  id: string,
  urlName: string,
  roomName: string,
  description: string,
  provider: string,
  playlistId: string | null
}

export type CreateRoomResponse = CamelizedAPIResponse<ApiInstance['mc']['room']['$post']>

const responseSchema = toSchema<CreateRoomResponse>()(
  z.object({
    id: z.string(),
    urlName: z.string(),
    roomName: z.string(),
    description: z.string(),
    provider: z.string(),
    playlistId: z.string(),
  })
)

export const createRoom = async (input: CreateRoomInput): GetRequestOutput<CreateRoomResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room.$post({
      body: {
        url_name: input.urlName,
        room_name: input.roomName,
        description: input.description,
        provider: input.provider,
        playlist_id: input.playlistId ?? undefined
      }
    })

    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      const { setCurrentError } = useCurrentError()
      setCurrentError(parseResult.error)
      throw parseResult.error
    }
    return parseResult.data
  }, {
    immediate: false
  })
  return result
}
