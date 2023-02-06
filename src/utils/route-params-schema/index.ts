import { z } from 'zod'

export const routeParamsSchema = {
  room: z.object({
    id: z.string()
  })
}

export const getRouteParams = {
  room: (): z.infer<typeof routeParamsSchema.room> => {
    const parseResult = routeParamsSchema.room.safeParse(useRoute().params)
    if (!parseResult.success) { throw new Error('unreachable error') }
    return parseResult.data
  }
}
