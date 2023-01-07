import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './_roomId@string'
import type { Methods as Methods1 } from './_roomId@string/music/search'
import type { Methods as Methods2 } from './_roomId@string/request'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://raw.githubusercontent.com/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/room'
  const PATH1 = '/music/search'
  const PATH2 = '/request'
  const GET = 'GET'
  const POST = 'POST'

  return {
    _roomId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        music: {
          search: {
            /**
             * @returns 音楽情報の配列
             */
            get: (option: { query: Methods1['get']['query'], config?: T | undefined }) =>
              fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, `${prefix0}${PATH1}`, GET, option).json(),
            /**
             * @returns 音楽情報の配列
             */
            $get: (option: { query: Methods1['get']['query'], config?: T | undefined }) =>
              fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, `${prefix0}${PATH1}`, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods1['get']['query'] } | undefined) =>
              `${prefix}${prefix0}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        },
        request: {
          /**
           * @returns 要求に成功した
           */
          post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH2}`, POST, option).json(),
          /**
           * @returns 要求に成功した
           */
          $post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, `${prefix0}${PATH2}`, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`
        },
        /**
         * @returns Roomの情報が返される
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * @returns Roomの情報が返される
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
