import { z } from 'zod'
import { SnakeToCamel } from '@dj-system/utils'
import { apiClient, GetRequestOutput } from '@/libs'

export type CreateRoomInput = {
  urlName: string
  roomName: string,
  description: string,
  provider: string,
}

const responseSchema = z.object({
  id: z.number(),
  ownerUserId: z.number(),
  displayId: z.string(),
  name: z.string(),
  description: z.string(),
  playlistId: z.union([z.string(), z.undefined()]),
  provider: z.union([z.string(), z.undefined()]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

type ResponseSchema = z.infer<typeof responseSchema>
export type CreateRoomResponse = SnakeToCamel<ResponseSchema>
// export type CreateRoomResponse = CamelizedAPIResponse<ApiInstance['mc']['room']['$post']>

// NOTE: Swaggerの仕様と異なるレスポンスが返ってきてるので一旦放置
// const responseSchema = toSchema<CreateRoomResponse>()(
//   z.object({
//     urlName: z.string(),
//     roomName: z.string(),
//     description: z.string(),
//     provider: z.string(),
//   })
// )

export const createRoom = async (input: CreateRoomInput): GetRequestOutput<CreateRoomResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.room.$post({
      body: {
        url_name: input.urlName,
        room_name: input.roomName,
        description: input.description,
        provider: input.provider.toLowerCase(),
      }
      /* eslint-disable @typescript-eslint/no-explicit-any  */
    }) as any // TODO: Swagger更新され次第更新する

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
  result.pending.value = false
  return result
}
