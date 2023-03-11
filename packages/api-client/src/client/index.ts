import aspida from '@aspida/axios'
import _axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE } from '../constants'
import { api } from '../generated'

export const aspidaAxios = ({
  requestInterceptor,
  responseInterceptor,
  responseErrorIntercepter
}: {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig<{}>,
  responseInterceptor: (config: AxiosResponse) => AxiosResponse,
  responseErrorIntercepter: (error: AxiosError) => any
} = {
  requestInterceptor: (config: AxiosRequestConfig) => config,
  responseInterceptor: (response: AxiosResponse) => response,
  responseErrorIntercepter: (error: AxiosError) => error,
}): AxiosInstance => {
  const instance = _axios.create()
  instance.defaults.headers.common[CONTENT_TYPE_KEY] = CONTENT_TYPE_VALUE
  instance.interceptors.request.use(requestInterceptor)
  instance.interceptors.response.use(responseInterceptor, responseErrorIntercepter)
  return instance
}

export type GenerateApiClientInputs = {
    timeout: number,
    baseURL: string,
    withCredentials: boolean
}

export const generateApiClient = (
  axios: AxiosInstance, 
  { timeout, baseURL, withCredentials }: GenerateApiClientInputs
): ReturnType<typeof api<ReturnType<typeof aspida>>> => {
  return api(
    aspida(axios, {
      timeout: timeout,
      baseURL,
      withCredentials: withCredentials
    })
  )
}

export type ApiInstance = ReturnType<typeof generateApiClient>
