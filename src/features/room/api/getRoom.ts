import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type getRoomInput = { roomId: string }

export type getRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['$get']>

const responseSchema = toSchema<getRoomResponse>()(
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
    users: z.object({
      id: z.number(),
      googleId: z.string(),
      email: z.string(),
      name: z.string(),
      isAdmin: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      linkedProviders: z.object({
        provider: z.string(),
        isConnected: z.boolean()
      }).array()
    }).array(),
    musics: z.object({
      id: z.number(),
      providedMusicId: z.string(),
      letterId: z.string(),
      artists: z.string(),
      album: z.string(),
      name: z.string(),
      thumbnail: z.string(),
      duration: z.string(),
    }).array(),
    letters: z.object({
      id: z.string(),
      roomId: z.number(),
      radioName: z.string(),
      message: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }).array()
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
  })
  return result
}
