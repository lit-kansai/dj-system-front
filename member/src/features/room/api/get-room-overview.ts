import { z } from 'zod'
import { _CamelizedAPIResponse } from '@dj-system/utils'
import { GetRequestOutput, apiClient } from '@/libs'

export type GetRoomInput = { roomId: string }
const responseSchema = z.object({
  description: z.string(),
  id: z.string(),
  name: z.string()
})

export type GetRoomResponse = _CamelizedAPIResponse<z.infer<typeof responseSchema>>

export const getRoomOverview = async (input: GetRoomInput): GetRequestOutput<GetRoomResponse> => {
  const result = await useAsyncData(async () => {
    const response = await apiClient().room._room_id(input.roomId).$get()

    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      // const { setCurrentError } = useCurrentError()
      // setCurrentError(parseResult.error)
      // throw parseResult.error
      throw parseResult.error
    }
    return parseResult.data
  })
  return result
}
