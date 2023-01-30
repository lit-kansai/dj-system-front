import { logger, googleOAuthQuerySchema } from '@/libs'
import { isDev } from '@/utils'
import { GOOGLE_API_CALLBACK_URL, USER_INFO } from '@/constants'
import { LocationQuery } from '@/types'

export const google = async (input: {query: LocationQuery}) => {
  const parseResult = googleOAuthQuerySchema.safeParse(input.query)
  if (!parseResult.success) { logger.log('invalid parameters', input.query); return }
  const { code } = parseResult.data
  const { data } = await registerUser({
    code,
    redirectUrl: GOOGLE_API_CALLBACK_URL
  })
  if (isDev) {
    // TODO: エラーハンドリング
    if (!data.value) { return }
    // dev環境ならlocalStorageに保存する
    localStorage.setItem(USER_INFO, JSON.stringify(data.value))
  }
}
