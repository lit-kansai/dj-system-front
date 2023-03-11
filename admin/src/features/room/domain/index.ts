import { z } from 'zod'
import { SnakeToCamel, toSchema } from '@dj-system/utils'

export type _Room = {
  id: number
  owner_user_id: number
  display_id: string
  name: string
  description: string
  playlist_id?: string | undefined
  provider?: string | undefined
  created_at: string
  updated_at: string
}

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
