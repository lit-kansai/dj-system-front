import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type deleteRoomInput = {
  roomId: string
}

export type deleteRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['$delete']>

const responseSchema = toSchema<deleteRoomResponse>()(
  z.object({
    ok: z.boolean()
  })
)

export const deleteRoom = async (input: deleteRoomInput): GetRequestOutput<deleteRoomResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._roomId(input.roomId).$delete()

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
