import { LocationQuery } from '@dj-system/utils'
import { logger, googleOAuthQuerySchema } from '@/libs'
import { GOOGLE_API_CALLBACK_URL, USER_INFO } from '@/constants'
import { auth } from '@/features'

export const google = async (input: {query: LocationQuery}) => {
  const parseResult = googleOAuthQuerySchema.safeParse(input.query)
  if (!parseResult.success) { logger.log('invalid parameters', input.query); return }
  const { code } = parseResult.data
  const { data } = await auth.api.registerUser({
    code,
    redirectUrl: GOOGLE_API_CALLBACK_URL
  })
  // TODO: エラーハンドリング
  // TODO: Cookieに保存するようにする
  if (!data.value) { return }
  // dev環境ならlocalStorageに保存する
  localStorage.setItem(USER_INFO, JSON.stringify(data.value))
}
