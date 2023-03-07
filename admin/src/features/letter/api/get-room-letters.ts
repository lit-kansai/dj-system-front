import { z } from 'zod'
import { Ref } from 'nuxt/dist/app/compat/capi'
import { apiClient } from '@/libs/api'
import { _CamelizedAPIResponse } from '@/types'
import { GetRequestOutput } from '@/libs'

export type GetRoomLettersInput = { roomId: Ref<string> }

const responseSchema = z.object({
  id: z.number(),
  roomId: z.number(),
  radioName: z.string(),
  message: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  musics: z.object({
    id: z.number(),
    providedMusicId: z.string(),
    letterId: z.number(),
    artists: z.union([z.string(), z.undefined()]),
    album: z.string(),
    name: z.string(),
    thumbnail: z.string(),
    duration: z.number()
  }).array()
}).array()

export type GetRoomLettersResponse = _CamelizedAPIResponse<z.infer<typeof responseSchema>>

// NOTE: Swaggerと実際の方が違うので保留
// const responseSchema = toSchema<Partial<GetRoomLettersResponse>>()(
//   z.object({
//     id: z.string(),
//     roomId: z.number(),
//     radioName: z.string(),
//     message: z.string(),
//     createdAt: z.string(),
//     updatedAt: z.string(),
//     musics: z.object({
//       id: z.number(),
//       providedMusicId: z.string(),
//       letterId: z.string(),
//       artists: z.string(),
//       album: z.string(),
//       name: z.string(),
//       thumbnail: z.string(),
//       duration: z.string()
//     }).array()
//   }).array()
// )

export const getRoomLetters = async (input: GetRoomLettersInput): GetRequestOutput<GetRoomLettersResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room._roomId(input.roomId.value).letters.$get()

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
