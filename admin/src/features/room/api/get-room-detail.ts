import { z } from 'zod'
import { Ref } from 'nuxt/dist/app/compat/capi'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'

export type GetRoomDetailInput = { roomId: Ref<string> }
export type _GetRoomDetailResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['$get']>
export type GetRoomDetailResponse = Omit<_GetRoomDetailResponse, 'users' | 'musics' | 'letters'>
const responseSchema = toSchema<Partial<GetRoomDetailResponse>>()(
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
    roomCooltime: z.number(),
  })
)

export const getRoomDetail = async (input: GetRoomDetailInput): GetRequestOutput<GetRoomDetailResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._roomId(input.roomId.value).$get()

    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      const { setCurrentError } = useCurrentError()
      setCurrentError(parseResult.error)
      throw parseResult.error
    }
    return parseResult.data
  }, { immediate: false })
  result.pending.value = false
  return result
}
