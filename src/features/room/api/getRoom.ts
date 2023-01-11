import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type getRoomInput = { roomId: string }

export type getRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['room']['_roomId']>['$get']>

const responseSchema = toSchema<getRoomResponse>()(
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string()
  })
)

export const getRoom = async (input: getRoomInput): GetRequestOutput<getRoomResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().room._roomId(input.roomId).$get()

    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      const { setCurrentError } = useCurrentError()
      setCurrentError(parseResult.error)
      throw parseResult.error
    }
    return parseResult.data
  }, {
  })
  return result
}
