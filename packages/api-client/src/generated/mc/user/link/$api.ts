import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './applemusic'
import type { Methods as Methods1 } from './applemusic/callback'
import type { Methods as Methods2 } from './spotify'
import type { Methods as Methods3 } from './spotify/callback'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://raw.githubusercontent.com/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/mc/user/link/applemusic'
  const PATH1 = '/mc/user/link/applemusic/callback'
  const PATH2 = '/mc/user/link/spotify'
  const PATH3 = '/mc/user/link/spotify/callback'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'

  return {
    applemusic: {
      callback: {
        /**
         * @returns 要求に成功した
         */
        post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json(),
        /**
         * @returns 要求に成功した
         */
        $post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      /**
       * @returns Success
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
      /**
       * @returns Success
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    spotify: {
      callback: {
        /**
         * @returns 要求に成功した
         */
        post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH3, POST, option).json(),
        /**
         * @returns 要求に成功した
         */
        $post: (option: { body: Methods3['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods3['post']['resBody'], BasicHeaders, Methods3['post']['status']>(prefix, PATH3, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`
      },
      /**
       * @returns Success
       */
      get: (option: { query: Methods2['get']['query'], config?: T | undefined }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json(),
      /**
       * @returns Success
       */
      $get: (option: { query: Methods2['get']['query'], config?: T | undefined }) =>
        fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
      /**
       * @returns Success
       */
      delete: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods2['delete']['resBody'], BasicHeaders, Methods2['delete']['status']>(prefix, PATH2, DELETE, option).json(),
      /**
       * @returns Success
       */
      $delete: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods2['delete']['resBody'], BasicHeaders, Methods2['delete']['status']>(prefix, PATH2, DELETE, option).json().then(r => r.body),
      $path: (option?: { method?: 'get' | undefined; query: Methods2['get']['query'] } | undefined) =>
        `${prefix}${PATH2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
