import aspida from '@aspida/axios'
import _axios from 'axios'
import {
  requestHandler,
  responseErrorHandler,
  responseHandler,
} from '../interceptors'
import { tokenFetcher } from '../token-fetcher'
import { api } from '../generated'
import { CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE } from '@/constants'

export const axios = _axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})
axios.defaults.headers.common[CONTENT_TYPE_KEY] = CONTENT_TYPE_VALUE
axios.interceptors.request.use((request) => {
  requestHandler(request, tokenFetcher.cookie)
})
axios.interceptors.response.use(responseHandler, responseErrorHandler)

export const apiClient = api(
  aspida(axios, {
    timeout: 3000,
  })
)
