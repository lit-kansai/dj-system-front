import { AxiosRequestConfig } from 'axios'
import { AUTHRIZATION_HEADER_FIELD, LOGIN_PAGE } from '@/constants'
import { camelToSnake, tokenRequired } from '@/utils'

export type TokenFetcher = {
  fetch: () => string | null;
};

export const requestHandler = (
  request: AxiosRequestConfig<{}>,
  tokenFetcher: TokenFetcher
): AxiosRequestConfig<{}> => {
  if (request.data) {
    const _data = camelToSnake(request.data)
    if (_data) { request.data = _data }
  }

  const { url } = request
  if (url && !tokenRequired(url)) { return request }

  const controller = new AbortController()
  request.signal = controller.signal
  const token = tokenFetcher.fetch()
  if (!token) {
    controller.abort()
    navigateTo(LOGIN_PAGE)
    return request
  }
  if (request.headers) {
    request.headers[AUTHRIZATION_HEADER_FIELD] = token
  }

  return request
}
