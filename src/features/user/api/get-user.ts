import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

export type GetUserResponse = CamelizedAPIResponse<ApiInstance['mc']['user']['$get']>

const linkedProvidersSchema = toSchema<GetUserResponse['linkedProviders']>()(
  z.union([
    z.object({
      provider: z.string(),
      isConnected: z.boolean(),
    }).array(),
    z.undefined()
  ])
)
const responseSchema = toSchema<GetUserResponse>()(
  z.object({
    id: z.number(),
    googleId: z.string(),
    email: z.string(),
    name: z.string(),
    icon: z.string(),
    isAdmin: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    linkedProviders: linkedProvidersSchema
  })
)

export const getUser = async (): GetRequestOutput<GetUserResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.user.$get()

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
