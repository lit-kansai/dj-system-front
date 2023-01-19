import aspida from '@aspida/axios'
import _axios, { AxiosInstance } from 'axios'
import {
  requestHandler,
  responseErrorHandler,
  responseHandler,
} from '../interceptors'
import { tokenFetcher } from '../token-fetcher'
import { api } from '../generated'
import { CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE } from '@/constants'

const axios = (): AxiosInstance => {
  const instance = _axios.create()
  instance.defaults.headers.common[CONTENT_TYPE_KEY] = CONTENT_TYPE_VALUE
  instance.interceptors.request.use((request) => {
    return requestHandler(request, tokenFetcher.cookie)
  })
  instance.interceptors.response.use(responseHandler, responseErrorHandler)
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
