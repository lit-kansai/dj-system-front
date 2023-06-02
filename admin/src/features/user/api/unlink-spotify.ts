import { z } from 'zod'
import { CamelizedAPIResponse } from '@dj-system/utils'
import { apiClient, ApiInstance } from '@/libs'

export type DeleteUnlinkSpotify = CamelizedAPIResponse<ApiInstance['mc']['user']['link']['spotify']['$delete']>

const responseSchema = z.object({
  ok: z.boolean()
})

export const deleteUnlinkSpotify = async () => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.user.link.spotify.$delete()

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
