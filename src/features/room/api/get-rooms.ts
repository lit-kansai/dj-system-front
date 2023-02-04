import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type GetRoomsResponse = CamelizedAPIResponse<ApiInstance['mc']['room']['$get']>

const responseSchema = toSchema<GetRoomsResponse>()(
  z.object({
    id: z.number(),
    ownerUserId: z.number(),
    displayId: z.string(),
    name: z.string(),
    description: z.string(),
    playlistId: z.string(),
    provider: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }).array()
)

export const getRooms = async (): GetRequestOutput<GetRoomsResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room.$get()

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
