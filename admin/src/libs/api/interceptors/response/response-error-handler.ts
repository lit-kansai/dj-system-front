import { AxiosError } from 'axios'
import { LOGIN_PAGE, USER_INFO } from '@/constants'

export const responseErrorHandler = (error: AxiosError) => {
  const { setCurrentError } = useCurrentError()
  const appConfig = useAppConfig()
  if (error.code === '401') {
    console.log('token removed')
    localStorage.removeItem(USER_INFO)
    navigateTo(LOGIN_PAGE)
  }
  /* eslint-disable no-console */
  // TODO: ここらへん雑すぎ
  if (appConfig.dev) { console.error(error) }
  setCurrentError(new Error(JSON.stringify(error.toJSON)))
  return Promise.reject(new Error(JSON.stringify(error.toJSON)))
}
