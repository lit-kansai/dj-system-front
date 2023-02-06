import { z } from 'zod'
import { Room as _Room } from '@/libs/api/generated/@types'
import { SnakeToCamel, toSchema } from '@/types'

export const roomSchema = toSchema<SnakeToCamel<_Room>>()(
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
  })
)

export type Room = z.infer<typeof roomSchema>
