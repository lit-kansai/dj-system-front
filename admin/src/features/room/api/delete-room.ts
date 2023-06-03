import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'

export type DeleteRoomInput = {
  roomId: string
}

export type DeleteRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_room_id']>['$delete']>

const responseSchema = toSchema<DeleteRoomResponse>()(
  z.object({
    ok: z.boolean()
  })
)

export const deleteRoom = async (input: DeleteRoomInput): GetRequestOutput<DeleteRoomResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._room_id(input.roomId).$delete()

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
