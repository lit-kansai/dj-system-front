import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type GetUserProvider = {
  code: string
  redirectUrl: string
}

export type GetUserProviderResponse = CamelizedAPIResponse<ApiInstance['mc']['user']['$get']>

const responseSchema = toSchema<GetUserProviderResponse>()(
  z.object({
    id: z.number(),
    googleId: z.string(),
    email: z.string(),
    name: z.string(),
    icon: z.string(),
    isAdmin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    linkedProviders: z.array(z.object({
      provider: z.enum(['spotify', 'applemusic']),
      isConnected: z.boolean(),
    }))
  })
)

type _GetUserProviderOutput = z.infer<typeof responseSchema>
type GetUserProviderOutput = _GetUserProviderOutput['linkedProviders']

export const getUserProvider = async (): GetRequestOutput<GetUserProviderOutput> => {
  const result = await useAsyncData(async () => {
    const response = await apiClient().mc.user.$get()

    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      const { setCurrentError } = useCurrentError()
      setCurrentError(parseResult.error)
      throw parseResult.error
    }
    return parseResult.data.linkedProviders
  })
  return {
    ...result
  }
}
