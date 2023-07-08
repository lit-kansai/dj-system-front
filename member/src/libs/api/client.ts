import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  ApiInstance as _ApiInstance,
  aspidaAxios,
  generateApiClient,
} from '@dj-system/api-client'
import { camelToSnake, snakeToCamel } from '@dj-system/utils'

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

export const apiClient = () => {
  return generateApiClient(axios, {
    baseURL: useRuntimeConfig().public.BASE_API_URL,
    timeout: 7000,
    withCredentials: true,
  })
}
export type ApiInstance = _ApiInstance;
