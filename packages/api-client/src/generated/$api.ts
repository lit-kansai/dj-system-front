import type { AspidaClient, BasicHeaders } from 'aspida'
import { dataToURLString } from 'aspida'
import type { Methods as Methods0 } from './mc/auth/signin'
import type { Methods as Methods1 } from './mc/auth/signin/callback'
import type { Methods as Methods2 } from './mc/room'
import type { Methods as Methods3 } from './mc/room/_room_id@string'
import type { Methods as Methods4 } from './mc/room/_room_id@string/letter/_letterId@string'
import type { Methods as Methods5 } from './mc/room/_room_id@string/letters'
import type { Methods as Methods6 } from './mc/room/_room_id@string/music/_musicId@string'
import type { Methods as Methods7 } from './mc/room/_room_id@string/musics'
import type { Methods as Methods8 } from './mc/room/_room_id@string/playlist'
import type { Methods as Methods9 } from './mc/room/_room_id@string/playlist/music'
import type { Methods as Methods10 } from './mc/user'
import type { Methods as Methods11 } from './mc/user/link/applemusic'
import type { Methods as Methods12 } from './mc/user/link/applemusic/callback'
import type { Methods as Methods13 } from './mc/user/link/spotify'
import type { Methods as Methods14 } from './mc/user/link/spotify/callback'
import type { Methods as Methods15 } from './mc/user/playlist'
import type { Methods as Methods16 } from './mc/user/playlist/_provider_name@string'
import type { Methods as Methods17 } from './mc/user/playlist/_provider_name@string/_playlist_id@string'
import type { Methods as Methods18 } from './room/_room_id@string'
import type { Methods as Methods19 } from './room/_room_id@string/music/search'
import type { Methods as Methods20 } from './room/_room_id@string/music/top'
import type { Methods as Methods21 } from './room/_room_id@string/request'

export const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://raw.githubusercontent.com/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/mc/auth/signin'
  const PATH1 = '/mc/auth/signin/callback'
  const PATH2 = '/mc/room'
  const PATH3 = '/letter'
  const PATH4 = '/letters'
  const PATH5 = '/music'
  const PATH6 = '/musics'
  const PATH7 = '/playlist'
  const PATH8 = '/playlist/music'
  const PATH9 = '/mc/user'
  const PATH10 = '/mc/user/link/applemusic'
  const PATH11 = '/mc/user/link/applemusic/callback'
  const PATH12 = '/mc/user/link/spotify'
  const PATH13 = '/mc/user/link/spotify/callback'
  const PATH14 = '/mc/user/playlist'
  const PATH15 = '/room'
  const PATH16 = '/music/search'
  const PATH17 = '/music/top'
  const PATH18 = '/request'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    mc: {
      auth: {
        signin: {
          callback: {
            /**
             * @returns Success
             */
            post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json(),
            /**
             * @returns Success
             */
            $post: (option: { body: Methods1['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods1['post']['resBody'], BasicHeaders, Methods1['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH1}`
          },
          /**
           * @returns Success
           */
          get: (option: { query: Methods0['get']['query'], config?: T | undefined }) =>
            fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option: { query: Methods0['get']['query'], config?: T | undefined }) =>
            fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods0['get']['query'] } | undefined) =>
            `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      },
      room: {
        _room_id: (val2: string) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            letter: {
              _letterId: (val4: string) => {
                const prefix4 = `${prefix2}${PATH3}/${val4}`

                return {
                  /**
                   * @returns 要求に成功した
                   */
                  delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods4['delete']['resBody'], BasicHeaders, Methods4['delete']['status']>(prefix, prefix4, DELETE, option).json(),
                  /**
                   * @returns 要求に成功した
                   */
                  $delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods4['delete']['resBody'], BasicHeaders, Methods4['delete']['status']>(prefix, prefix4, DELETE, option).json().then(r => r.body),
                  $path: () => `${prefix}${prefix4}`
                }
              }
            },
            letters: {
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, `${prefix2}${PATH4}`, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, `${prefix2}${PATH4}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH4}`
            },
            music: {
              _musicId: (val4: string) => {
                const prefix4 = `${prefix2}${PATH5}/${val4}`

                return {
                  /**
                   * @returns 要求に成功した
                   */
                  delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods6['delete']['resBody'], BasicHeaders, Methods6['delete']['status']>(prefix, prefix4, DELETE, option).json(),
                  /**
                   * @returns 要求に成功した
                   */
                  $delete: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods6['delete']['resBody'], BasicHeaders, Methods6['delete']['status']>(prefix, prefix4, DELETE, option).json().then(r => r.body),
                  $path: () => `${prefix}${prefix4}`
                }
              }
            },
            musics: {
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, `${prefix2}${PATH6}`, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods7['get']['resBody'], BasicHeaders, Methods7['get']['status']>(prefix, `${prefix2}${PATH6}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH6}`
            },
            playlist: {
              music: {
                /**
                 * @returns 要求に成功した
                 */
                post: (option: { body: Methods9['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods9['post']['resBody'], BasicHeaders, Methods9['post']['status']>(prefix, `${prefix2}${PATH8}`, POST, option).json(),
                /**
                 * @returns 要求に成功した
                 */
                $post: (option: { body: Methods9['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods9['post']['resBody'], BasicHeaders, Methods9['post']['status']>(prefix, `${prefix2}${PATH8}`, POST, option).json().then(r => r.body),
                /**
                 * @returns 要求に成功した
                 */
                delete: (option: { body: Methods9['delete']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods9['delete']['resBody'], BasicHeaders, Methods9['delete']['status']>(prefix, `${prefix2}${PATH8}`, DELETE, option).json(),
                /**
                 * @returns 要求に成功した
                 */
                $delete: (option: { body: Methods9['delete']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods9['delete']['resBody'], BasicHeaders, Methods9['delete']['status']>(prefix, `${prefix2}${PATH8}`, DELETE, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix2}${PATH8}`
              },
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, `${prefix2}${PATH7}`, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods8['get']['resBody'], BasicHeaders, Methods8['get']['status']>(prefix, `${prefix2}${PATH7}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH7}`
            },
            /**
             * @returns Roomの詳細情報が返される
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix2, GET, option).json(),
            /**
             * @returns Roomの詳細情報が返される
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            /**
             * @param option.body - created_atとupdated_atは自動設定
             * @returns 更新後のRoom情報が返される
             */
            put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix2, PUT, option).json(),
            /**
             * @param option.body - created_atとupdated_atは自動設定
             * @returns 更新後のRoom情報が返される
             */
            $put: (option: { body: Methods3['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods3['put']['resBody'], BasicHeaders, Methods3['put']['status']>(prefix, prefix2, PUT, option).json().then(r => r.body),
            /**
             * @returns 要求に成功した
             */
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods3['delete']['resBody'], BasicHeaders, Methods3['delete']['status']>(prefix, prefix2, DELETE, option).json(),
            /**
             * @returns 要求に成功した
             */
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods3['delete']['resBody'], BasicHeaders, Methods3['delete']['status']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`
          }
        },
        /**
         * @returns Success
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json(),
        /**
         * @returns Success
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods2['get']['resBody'], BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).json().then(r => r.body),
        /**
         * @returns 作成されたRoom情報が返される
         */
        post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json(),
        /**
         * @returns 作成されたRoom情報が返される
         */
        $post: (option: { body: Methods2['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods2['post']['resBody'], BasicHeaders, Methods2['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`
      },
      user: {
        link: {
          applemusic: {
            callback: {
              /**
               * @returns 要求に成功した
               */
              post: (option: { body: Methods12['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods12['post']['resBody'], BasicHeaders, Methods12['post']['status']>(prefix, PATH11, POST, option).json(),
              /**
               * @returns 要求に成功した
               */
              $post: (option: { body: Methods12['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods12['post']['resBody'], BasicHeaders, Methods12['post']['status']>(prefix, PATH11, POST, option).json().then(r => r.body),
              $path: () => `${prefix}${PATH11}`
            },
            /**
             * @returns Success
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH10, GET, option).json(),
            /**
             * @returns Success
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods11['get']['resBody'], BasicHeaders, Methods11['get']['status']>(prefix, PATH10, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH10}`
          },
          spotify: {
            callback: {
              /**
               * @returns 要求に成功した
               */
              post: (option: { body: Methods14['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods14['post']['resBody'], BasicHeaders, Methods14['post']['status']>(prefix, PATH13, POST, option).json(),
              /**
               * @returns 要求に成功した
               */
              $post: (option: { body: Methods14['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods14['post']['resBody'], BasicHeaders, Methods14['post']['status']>(prefix, PATH13, POST, option).json().then(r => r.body),
              $path: () => `${prefix}${PATH13}`
            },
            /**
             * @returns Success
             */
            get: (option: { query: Methods13['get']['query'], config?: T | undefined }) =>
              fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(prefix, PATH12, GET, option).json(),
            /**
             * @returns Success
             */
            $get: (option: { query: Methods13['get']['query'], config?: T | undefined }) =>
              fetch<Methods13['get']['resBody'], BasicHeaders, Methods13['get']['status']>(prefix, PATH12, GET, option).json().then(r => r.body),
            /**
             * @returns Success
             */
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods13['delete']['resBody'], BasicHeaders, Methods13['delete']['status']>(prefix, PATH12, DELETE, option).json(),
            /**
             * @returns Success
             */
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods13['delete']['resBody'], BasicHeaders, Methods13['delete']['status']>(prefix, PATH12, DELETE, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods13['get']['query'] } | undefined) =>
              `${prefix}${PATH12}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        },
        playlist: {
          _provider_name: (val3: string) => {
            const prefix3 = `${PATH14}/${val3}`

            return {
              _playlist_id: (val4: string) => {
                const prefix4 = `${prefix3}/${val4}`

                return {
                  /**
                   * @returns Success
                   */
                  get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods17['get']['resBody'], BasicHeaders, Methods17['get']['status']>(prefix, prefix4, GET, option).json(),
                  /**
                   * @returns Success
                   */
                  $get: (option?: { config?: T | undefined } | undefined) =>
                    fetch<Methods17['get']['resBody'], BasicHeaders, Methods17['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                  $path: () => `${prefix}${prefix4}`
                }
              },
              /**
               * @returns Success
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods16['get']['resBody'], BasicHeaders, Methods16['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              /**
               * @returns 要求に成功した
               */
              post: (option: { body: Methods16['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods16['post']['resBody'], BasicHeaders, Methods16['post']['status']>(prefix, prefix3, POST, option).json(),
              /**
               * @returns 要求に成功した
               */
              $post: (option: { body: Methods16['post']['reqBody'], config?: T | undefined }) =>
                fetch<Methods16['post']['resBody'], BasicHeaders, Methods16['post']['status']>(prefix, prefix3, POST, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`
            }
          },
          /**
           * @returns Success
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(prefix, PATH14, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods15['get']['resBody'], BasicHeaders, Methods15['get']['status']>(prefix, PATH14, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH14}`
        },
        /**
         * @returns Success
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH9, GET, option).json(),
        /**
         * @returns Success
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods10['get']['resBody'], BasicHeaders, Methods10['get']['status']>(prefix, PATH9, GET, option).json().then(r => r.body),
        /**
         * @returns 要求に成功した
         */
        delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods10['delete']['resBody'], BasicHeaders, Methods10['delete']['status']>(prefix, PATH9, DELETE, option).json(),
        /**
         * @returns 要求に成功した
         */
        $delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods10['delete']['resBody'], BasicHeaders, Methods10['delete']['status']>(prefix, PATH9, DELETE, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH9}`
      }
    },
    room: {
      _room_id: (val1: string) => {
        const prefix1 = `${PATH15}/${val1}`

        return {
          music: {
            search: {
              /**
               * @returns 音楽情報の配列
               */
              get: (option: { query: Methods19['get']['query'], config?: T | undefined }) =>
                fetch<Methods19['get']['resBody'], BasicHeaders, Methods19['get']['status']>(prefix, `${prefix1}${PATH16}`, GET, option).json(),
              /**
               * @returns 音楽情報の配列
               */
              $get: (option: { query: Methods19['get']['query'], config?: T | undefined }) =>
                fetch<Methods19['get']['resBody'], BasicHeaders, Methods19['get']['status']>(prefix, `${prefix1}${PATH16}`, GET, option).json().then(r => r.body),
              $path: (option?: { method?: 'get' | undefined; query: Methods19['get']['query'] } | undefined) =>
                `${prefix}${prefix1}${PATH16}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            },
            top: {
              /**
               * @returns Success
               */
              get: (option?: { query?: Methods20['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                fetch<Methods20['get']['resBody'], BasicHeaders, Methods20['get']['status']>(prefix, `${prefix1}${PATH17}`, GET, option).json(),
              /**
               * @returns Success
               */
              $get: (option?: { query?: Methods20['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                fetch<Methods20['get']['resBody'], BasicHeaders, Methods20['get']['status']>(prefix, `${prefix1}${PATH17}`, GET, option).json().then(r => r.body),
              $path: (option?: { method?: 'get' | undefined; query: Methods20['get']['query'] } | undefined) =>
                `${prefix}${prefix1}${PATH17}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            }
          },
          request: {
            /**
             * @returns 要求に成功した
             */
            post: (option: { body: Methods21['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods21['post']['resBody'], BasicHeaders, Methods21['post']['status']>(prefix, `${prefix1}${PATH18}`, POST, option).json(),
            /**
             * @returns 要求に成功した
             */
            $post: (option: { body: Methods21['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods21['post']['resBody'], BasicHeaders, Methods21['post']['status']>(prefix, `${prefix1}${PATH18}`, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix1}${PATH18}`
          },
          /**
           * @returns Roomの情報が返される
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods18['get']['resBody'], BasicHeaders, Methods18['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns Roomの情報が返される
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods18['get']['resBody'], BasicHeaders, Methods18['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
