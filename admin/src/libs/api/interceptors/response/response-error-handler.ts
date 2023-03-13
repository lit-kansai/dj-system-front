import axios, { AxiosError } from 'axios'
import { tokenFetcher } from '@/libs'
import { LOGIN_PAGE, USER_INFO } from '@/constants'
import { isDev } from '@/utils'

export const responseErrorHandler = (error: AxiosError) => {
  const { setCurrentError } = useCurrentError()
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    if (!status) { throw new Error('status error not found') }
    if (status === 401 || tokenFetcher.fetch()) {
      localStorage.removeItem(USER_INFO)
      navigateTo(LOGIN_PAGE)
    }
  }
  /* eslint-disable no-console */
  // TODO: ここらへん雑すぎ
  if (isDev) { console.error(JSON.stringify(error)) }
  setCurrentError(new Error(JSON.stringify(error.toJSON)))
  return Promise.reject(new Error(JSON.stringify(error.toJSON)))
}
