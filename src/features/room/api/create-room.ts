import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type CreateRoomInput = {
  urlName: string
  roomName: string,
  description: string,
  provider: string,
}

export type CreateRoomResponse = CamelizedAPIResponse<ApiInstance['mc']['room']['$post']>

const responseSchema = toSchema<CreateRoomResponse>()(
  z.object({
    urlName: z.string(),
    roomName: z.string(),
    description: z.string(),
    provider: z.string(),
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
  result.pending.value = false
  return result
}
