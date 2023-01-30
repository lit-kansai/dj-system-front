import aspida from '@aspida/axios'
import _axios, { AxiosInstance } from 'axios'
import { CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE } from '@/constants'
import { isDev } from '@/utils/is-dev'
import {
  api,
  logger,
  tokenFetcher,
  requestHandler,
  responseErrorHandler,
  responseHandler,
} from '@/libs'

const axios = (): AxiosInstance => {
  const instance = _axios.create()
  instance.defaults.headers.common[CONTENT_TYPE_KEY] = CONTENT_TYPE_VALUE
  instance.interceptors.request.use((request) => {
    // TODO: ここらへんのDIまとめたい。いちいちisDev?とかするのつらい
    if (isDev) { return requestHandler(request, tokenFetcher.local) }
    return requestHandler(request, tokenFetcher.cookie)
  })
  instance.interceptors.response.use(
    responseHandler,
    (error) => {
      if (_axios.isAxiosError(error)) { return responseErrorHandler(error) }
      logger.log(`unexpected error ${JSON.stringify(error)}`)
    }
  )
  return instance
}

export const apiClient = () => {
  return api(
    aspida(axios(), {
      timeout: 3000,
      baseURL: useRuntimeConfig().public.API_BASE_URL,
      withCredentials: true
    })
  )
}
export type ApiInstance = ReturnType<typeof apiClient>
