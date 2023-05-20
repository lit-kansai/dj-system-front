import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from '.'
import type { Methods as Methods1 } from './link/applemusic'
import type { Methods as Methods2 } from './link/applemusic/callback'
import type { Methods as Methods3 } from './link/spotify'
import type { Methods as Methods4 } from './link/spotify/callback'
import type { Methods as Methods5 } from './playlist'
import type { Methods as Methods6 } from './playlist/_provider_name'
import type { Methods as Methods7 } from './playlist/_provider_name/_playlist_id@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/mc/user'
  const PATH1 = '/mc/user/link/applemusic'
  const PATH2 = '/mc/user/link/applemusic/callback'
  const PATH3 = '/mc/user/link/spotify'
  const PATH4 = '/mc/user/link/spotify/callback'
  const PATH5 = '/mc/user/playlist'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'

  return {
    link: {
      applemusic: {
        callback: {
          /**
           * @returns 要求に成功した
           */
          post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json(),
          /**
           * @returns 要求に成功した
           */
          $post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH2}`
        },
        /**
         * @returns Success
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH1, GET, option).json(),
        /**
         * @returns Success
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      spotify: {
        callback: {
          /**
           * @returns 要求に成功した
           */
          post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH4, POST, option).json(),
          /**
           * @returns 要求に成功した
           */
          $post: (option: { body: Methods4['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH4, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH4}`
        },
        /**
         * @returns Success
         */
        get: (option: { query: Methods3['get']['query'], config?: T | undefined }) =>
          fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json(),
        /**
         * @returns Success
         */
        $get: (option: { query: Methods3['get']['query'], config?: T | undefined }) =>
          fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods3['get']['query'] } | undefined) =>
          `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      }
    },
    playlist: {
      _provider_name: (val1: number | string) => {
        const prefix1 = `${PATH5}/${val1}`

        return {
          _playlist_id: (val2: string) => {
            const prefix2 = `${prefix1}/${val2}`

            return {
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, prefix2, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}`
            }
          },
          /**
           * @returns Success
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * @returns 要求に成功した
           */
          post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody'], BasicHeaders, Methods6['post']['status']>(prefix, prefix1, POST, option).json(),
          /**
           * @returns 要求に成功した
           */
          $post: (option: { body: Methods6['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods6['post']['resBody'], BasicHeaders, Methods6['post']['status']>(prefix, prefix1, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      /**
       * @returns Success
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH5, GET, option).json(),
      /**
       * @returns Success
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, PATH5, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH5}`
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
    /**
     * @returns 要求に成功した
     */
    delete: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['delete']['resBody'], BasicHeaders, Methods0['delete']['status']>(prefix, PATH0, DELETE, option).json(),
    /**
     * @returns 要求に成功した
     */
    $delete: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods0['delete']['resBody'], BasicHeaders, Methods0['delete']['status']>(prefix, PATH0, DELETE, option).json().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
