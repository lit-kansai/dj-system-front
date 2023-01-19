import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

// 1. request body か query parametersを受け取るinput
export type RegisterUserInput = {
  code: string
  redirectUrl: string
}

// 2. aspidaが返す値をキャメルケースに変換する
export type RegisterUserResponse = CamelizedAPIResponse<ApiInstance['mc']['auth']['signin']['callback']['$post']>

// 3. 2で作った型からzodのschemaを作る
const responseSchema = toSchema<RegisterUserResponse>()(
  z.object({
    apiToken: z.string(),
    userId: z.number()
  })
)

export const registerUser = async (input: RegisterUserInput): GetRequestOutput<RegisterUserResponse> => {
  // 4. NuxtのuseLazyAsyncDataでaspidaをラップする
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.auth.signin.callback.$post({
      body: {
        code: input.code,
        redirect_url: input.redirectUrl
      }
    })
    // 5. 返ってくる値をキャメルケースに変換する
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
