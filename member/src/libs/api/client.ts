import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  ApiInstance as _ApiInstance,
  aspidaAxios,
  generateApiClient,
} from '@dj-system/api-client'
import { camelToSnake, snakeToCamel } from '@dj-system/utils'
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry'

const requestInterceptor = (request: AxiosRequestConfig) => {
  if (request.data) {
    const _data = camelToSnake(request.data)
    if (_data) {
      request.data = _data
    }
  }
  return request
}
const responseInterceptor = (response: AxiosResponse) => {
  response.data = snakeToCamel(response.data)
  console.log({ response })
  return response
}
const responseErrorIntercepter = (error: AxiosError) => {
  // TODO: エラーハンドリング
  throw error
}

const axios = aspidaAxios({
  requestInterceptor,
  responseInterceptor,
  responseErrorIntercepter,
})

const onRetry = (
  retryCount: number,
  error: Error,
  requestConfig: AxiosRequestConfig
) => {
  console.log({ retryCount })
  console.log({ error })
  console.log({ requestConfig })
}

const retryCondition = (error: AxiosError<unknown, unknown>) => {
  return isNetworkOrIdempotentRequestError(error) ||
    error.message.includes('timeout')
}

axiosRetry(axios, {
  retryCondition,
  onRetry,
  shouldResetTimeout: true,
  retryDelay: (_) => { return 1000 }
})

export const apiClient = () => {
  return generateApiClient(axios, {
    baseURL: useRuntimeConfig().public.BASE_API_URL,
    timeout: 5000,
    withCredentials: true,
  })
}
export type ApiInstance = _ApiInstance;
