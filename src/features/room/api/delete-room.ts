import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type DeleteRoomInput = {
  roomId: string
}

export type DeleteRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['$delete']>

const responseSchema = toSchema<DeleteRoomResponse>()(
  z.object({
    ok: z.boolean()
  })
)

export const deleteRoom = async (input: DeleteRoomInput): GetRequestOutput<DeleteRoomResponse> => {
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
