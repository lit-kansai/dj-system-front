import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { ApiInstance } from '@dj-system/api-client'
import { GetRequestOutput, apiClient } from '@/libs'

export type GetRoomInput = { roomId: string }

export type GetRoomResponse = CamelizedAPIResponse<ReturnType<ApiInstance['mc']['room']['_room_id']>['$get']>

const usersSchema = toSchema<GetRoomResponse['users']>()(
  z.object({
    id: z.number(),
    googleId: z.string(),
    email: z.string(),
    name: z.string(),
    icon: z.string(),
    isAdmin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    linkedProviders: z.object({
      provider: z.string(),
      isConnected: z.boolean(),
    }).array().optional()
  }).array()
)

const musicsSchema = toSchema<GetRoomResponse['musics']>()(
  z.object({
    id: z.number(),
    providedMusicId: z.string(),
    letterId: z.string().optional(),
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
      updatedAt: z.string()
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
    musics: z.object({
      id: z.number(),
      providedMusicId: z.string(),
      letterId: z.string().optional(),
      artists: z.string(),
      album: z.string(),
      name: z.string(),
      thumbnail: z.string(),
      duration: z.string(),
    }).array()
  }).array()
)

const responseSchema = toSchema<GetRoomResponse>()(
  z.object({
    id: z.number(),
    ownerUserId: z.number(),
    displayId: z.string(),
    name: z.string(),
    description: z.string(),
    playlistId: z.string().optional(),
    provider: z.string().optional(),
    roomCooltime: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    users: usersSchema,
    musics: musicsSchema,
    letters: lettersSchema,
  })
)

export const getRoom = async (input: GetRoomInput): GetRequestOutput<GetRoomResponse> => {
  const result = await useAsyncData(async () => {
    const response = await apiClient().mc.room._room_id(input.roomId).$get()

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
