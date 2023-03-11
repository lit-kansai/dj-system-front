import { z } from 'zod'
import { CamelizedAPIResponse, toSchema } from '@dj-system/utils'
import { GetRequestOutput, apiClient, ApiInstance } from '@/libs'

export type RegisterUserInput = {
  code: string
  redirectUrl: string
}

export type RegisterUserResponse = CamelizedAPIResponse<ApiInstance['mc']['auth']['signin']['callback']['$post']>

const responseSchema = toSchema<RegisterUserResponse>()(
  z.object({
    apiToken: z.string(),
    userId: z.number()
  })
)

export const registerUser = async (input: RegisterUserInput): GetRequestOutput<RegisterUserResponse> => {
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.auth.signin.callback.$post({
      body: {
        code: input.code,
        redirect_url: input.redirectUrl
      }
    })

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
