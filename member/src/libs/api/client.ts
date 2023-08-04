import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  ApiInstance as _ApiInstance,
  aspidaAxios,
  generateApiClient,
} from '@dj-system/api-client'
import { camelToSnake, snakeToCamel } from '@dj-system/utils'
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry'

const requestInterceptor = (request: AxiosRequestConfig) => {
  const { retryStatus, setRetryStatus } = useRetryStatus()
  if (request.url && !retryStatus.value[request.url]) {
    // 初回だけ
    setRetryStatus({ path: request.url, isRetrying: false })
  }
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
  return response
}

const responseErrorIntercepter = (error: AxiosError) => {
  const { setRetryStatus } = useRetryStatus()
  if (error.config.url) {
    setRetryStatus({ path: error.config.url, isRetrying: false })
  }
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
  const { setRetryStatus } = useRetryStatus()
  if (requestConfig.url) {
    setRetryStatus({ path: requestConfig.url, isRetrying: true })
  }
}

const retryCondition = (error: AxiosError<unknown, unknown>) => {
  return isNetworkOrIdempotentRequestError(error) ||
    error.message.toLowerCase().includes('timeout') ||
    error.response!.statusText.toLowerCase().includes('timeout')
}

axiosRetry(axios, {
  // 実質無限ローディング
  retries: 99,
  retryCondition,
  onRetry,
  shouldResetTimeout: true,
  retryDelay: (_) => { return 1000 }
})

export const apiClient = () => {
  return generateApiClient(axios, {
    baseURL: useRuntimeConfig().public.BASE_API_URL,
    timeout: 3000,
    withCredentials: true,
  })
}

export type ApiInstance = _ApiInstance;
