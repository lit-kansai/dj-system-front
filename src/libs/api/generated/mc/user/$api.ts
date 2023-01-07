import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods1 } from './link/spotify'
import type { Methods as Methods2 } from './link/spotify/callback'
import type { Methods as Methods3 } from './playlist'
import type { Methods as Methods4 } from './playlist/_provider@string'
import type { Methods as Methods5 } from './playlist/_provider@string/_playlist_id@string'
import type { Methods as Methods0 } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (
    baseURL === undefined ? 'https://raw.githubusercontent.com/' : baseURL
  ).replace(/\/$/, '')
  const PATH0 = '/mc/user'
  const PATH1 = '/mc/user/link/spotify'
  const PATH2 = '/mc/user/link/spotify/callback'
  const PATH3 = '/mc/user/playlist'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'

  return {
    link: {
      spotify: {
        callback: {
          /**
           * @returns 要求に成功した
           */
          post: (option: {
            body: Methods2['post']['reqBody']
            config?: T | undefined
          }) =>
            fetch<
            Methods2['post']['resBody'],
            BasicHeaders,
            Methods2['post']['status']
            >(prefix, PATH2, POST, option).json(),
          /**
           * @returns 要求に成功した
           */
          $post: (option: {
            body: Methods2['post']['reqBody']
            config?: T | undefined
          }) =>
            fetch<
            Methods2['post']['resBody'],
            BasicHeaders,
            Methods2['post']['status']
            >(prefix, PATH2, POST, option)
              .json()
              .then(r => r.body),
          $path: () => `${prefix}${PATH2}`,
        },
        /**
         * @returns Success
         */
        get: (option: {
          query: Methods1['get']['query']
          config?: T | undefined
        }) =>
          fetch<
          Methods1['get']['resBody'],
          BasicHeaders,
          Methods1['get']['status']
          >(prefix, PATH1, GET, option).json(),
        /**
         * @returns Success
         */
        $get: (option: {
          query: Methods1['get']['query']
          config?: T | undefined
        }) =>
          fetch<
          Methods1['get']['resBody'],
          BasicHeaders,
          Methods1['get']['status']
          >(prefix, PATH1, GET, option)
            .json()
            .then(r => r.body),
        $path: (
          option?:
          | { method?: 'get' | undefined; query: Methods1['get']['query'] }
          | undefined
        ) =>
          `${prefix}${PATH1}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
    },
    playlist: {
      _provider: (val1: string) => {
        const prefix1 = `${PATH3}/${val1}`

        return {
          _playlist_id: (val2: string) => {
            const prefix2 = `${prefix1}/${val2}`

            return {
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                Methods5['get']['resBody'],
                BasicHeaders,
                Methods5['get']['status']
                >(prefix, prefix2, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<
                Methods5['get']['resBody'],
                BasicHeaders,
                Methods5['get']['status']
                >(prefix, prefix2, GET, option)
                  .json()
                  .then(r => r.body),
              $path: () => `${prefix}${prefix2}`,
            }
          },
          /**
           * @returns Success
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
            Methods4['get']['resBody'],
            BasicHeaders,
            Methods4['get']['status']
            >(prefix, prefix1, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<
            Methods4['get']['resBody'],
            BasicHeaders,
            Methods4['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then(r => r.body),
          /**
           * @returns 要求に成功した
           */
          post: (option: {
            body: Methods4['post']['reqBody']
            config?: T | undefined
          }) =>
            fetch<
            Methods4['post']['resBody'],
            BasicHeaders,
            Methods4['post']['status']
            >(prefix, prefix1, POST, option).json(),
          /**
           * @returns 要求に成功した
           */
          $post: (option: {
            body: Methods4['post']['reqBody']
            config?: T | undefined
          }) =>
            fetch<
            Methods4['post']['resBody'],
            BasicHeaders,
            Methods4['post']['status']
            >(prefix, prefix1, POST, option)
              .json()
              .then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        }
      },
      /**
       * @returns Success
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
        Methods3['get']['resBody'],
        BasicHeaders,
        Methods3['get']['status']
        >(prefix, PATH3, GET, option).json(),
      /**
       * @returns Success
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<
        Methods3['get']['resBody'],
        BasicHeaders,
        Methods3['get']['status']
        >(prefix, PATH3, GET, option)
          .json()
          .then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
    },
    /**
     * @returns Success
     */
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
      Methods0['get']['resBody'],
      BasicHeaders,
      Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    /**
     * @returns Success
     */
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<
      Methods0['get']['resBody'],
      BasicHeaders,
      Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then(r => r.body),
    /**
     * @returns 要求に成功した
     */
    delete: (option?: { config?: T | undefined } | undefined) =>
      fetch<
      Methods0['delete']['resBody'],
      BasicHeaders,
      Methods0['delete']['status']
      >(prefix, PATH0, DELETE, option).json(),
    /**
     * @returns 要求に成功した
     */
    $delete: (option?: { config?: T | undefined } | undefined) =>
      fetch<
      Methods0['delete']['resBody'],
      BasicHeaders,
      Methods0['delete']['status']
      >(prefix, PATH0, DELETE, option)
        .json()
        .then(r => r.body),
    $path: () => `${prefix}${PATH0}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
