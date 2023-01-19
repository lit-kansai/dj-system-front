import { z } from 'zod'
import { apiClient, ApiInstance } from '@/libs/api'
import { CamelizedAPIResponse, toSchema } from '@/types'
import { GetRequestOutput } from '@/libs'

// 1. request body か query parametersを受け取るinput
export type GetLoginURLInput = { redirectUrl: string }

// 2. aspidaが返す値をキャメルケースに変換する
export type GetLoginUrlResponse = CamelizedAPIResponse<ApiInstance['mc']['auth']['signin']['$get']>

// 3. 2で作った型からzodのschemaを作る
const responseSchema = toSchema<GetLoginUrlResponse>()(
  z.object({
    redirectUrl: z.string()
  })
)

export const getLoginUrl = async (input: GetLoginURLInput): GetRequestOutput<GetLoginUrlResponse> => {
  // 4. NuxtのuseLazyAsyncDataでaspidaをラップする
  const result = await useLazyAsyncData(async () => {
    const response = await apiClient().mc.auth.signin.$get({
      query: { redirect_url: window.location.origin + input.redirectUrl }
    })

    // 5. 返ってくる値をキャメルケースに変換する
    const parseResult = responseSchema.safeParse(response)
    if (!parseResult.success) {
      const { setCurrentError } = useCurrentError()
      setCurrentError(parseResult.error)
      throw parseResult.error
    }
    return parseResult.data
  }, {
    // 後からgetを実行したいときだけ
    immediate: false
  })
  return result
}
