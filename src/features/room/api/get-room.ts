import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type GetRoomInput = { roomId: string }

export type GetRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_roomId']>['$get']>

const userSchema = toSchema<GetRoomResponse['users']>()(
  z.object({
    id: z.number(),
    googleId: z.string(),
    email: z.string(),
    name: z.string(),
    icon: z.string(),
    isAdmin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    linkedProviders: z.union([
      z.undefined(),
      z.object({
        provider: z.string(),
        isConnected: z.boolean()
      }).array()])
  }).array(),
)
const musicsSchema = toSchema<GetRoomResponse['musics']>()(
  z.object({
    id: z.number(),
    providedMusicId: z.string(),
    letterId: z.union([z.string(), z.undefined()]),
    artists: z.string(),
    album: z.string(),
    name: z.string(),
    thumbnail: z.string(),
    duration: z.string(),
    letter: z.object({
      id: z.string(),
      roomId: z.number(),
      radioName: z.string(),
      message: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  }).array()
)
const lettersSchema = toSchema<GetRoomResponse['letters']>()(
  z.object({
    id: z.string(),
    roomId: z.number(),
    radioName: z.string(),
    message: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    musics: musicsSchema
  }).array()
)

const responseSchema = toSchema<GetRoomResponse>()(
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
    users: userSchema,
    musics: musicsSchema,
    letters: lettersSchema
  })
)

export const getRoom = async (input: GetRoomInput): GetRequestOutput<GetRoomResponse> => {
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
