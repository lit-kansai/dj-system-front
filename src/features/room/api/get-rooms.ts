import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type getRoomsResponse = CamelizedAPIResponse<ApiInstance['mc']['room']['$get']>

const responseSchema = toSchema<getRoomsResponse>()(
  z.object({
    id: z.number(),
    ownerUserId: z.number(),
    displayId: z.string(),
    name: z.string(),
    description: z.string(),
    playlistId: z.union([z.string(), z.undefined()]),
    provider: z.union([z.string(), z.undefined()]),
    createdAt: z.string(),
    updatedAt: z.string(),
  }).array()
)

export const getRooms = async (): GetRequestOutput<getRoomsResponse> => {
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
