import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiInstance as _ApiInstance, aspidaAxios, generateApiClient } from '@dj-system/api-client'
import { isDev } from '@/utils/is-dev'
import {
  tokenFetcher,
  requestHandler,
  responseErrorHandler,
  responseHandler,
} from '@/libs'

const requestInterceptor = (request: AxiosRequestConfig) => {
  if (isDev) { return requestHandler(request, tokenFetcher.local) }
  // FIXME: Cookie動いてないので一旦LocalStorageで
  return requestHandler(request, tokenFetcher.local)
  // return requestHandler(request, tokenFetcher.cookie)
}

const responseInterceptor = (response: AxiosResponse) => responseHandler(response)

const responseErrorIntercepter = (error: AxiosError) => responseErrorHandler(error)

const axios = aspidaAxios({
  requestInterceptor,
  responseInterceptor,
  responseErrorIntercepter
})

export const apiClient = () => {
  return generateApiClient(axios, {
    baseURL: useRuntimeConfig().public.BASE_API_URL,
    timeout: 3000,
    withCredentials: true
  })
}
export type ApiInstance = _ApiInstance
