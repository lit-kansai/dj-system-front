import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods1 } from './_roomId@string'
import type { Methods as Methods2 } from './_roomId@string/letter/_letterId@string'
import type { Methods as Methods3 } from './_roomId@string/letters'
import type { Methods as Methods4 } from './_roomId@string/music/_musicId@string'
import type { Methods as Methods5 } from './_roomId@string/musics'
import type { Methods as Methods6 } from './_roomId@string/playlist'
import type { Methods as Methods7 } from './_roomId@string/playlist/music'
import type { Methods as Methods0 } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://raw.githubusercontent.com/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/mc/room'
  const PATH1 = '/letter'
  const PATH2 = '/letters'
  const PATH3 = '/music'
  const PATH4 = '/musics'
  const PATH5 = '/playlist'
  const PATH6 = '/playlist/music'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    _roomId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        letter: {
          _letterId: (val2: string) => {
            const prefix2 = `${prefix0}${PATH1}/${val2}`

            return {
              /**
               * @returns 要求に成功した
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods2['delete']['resBody'], BasicHeaders, Methods2['delete']['status']>(prefix, prefix2, DELETE, option).json(),
              /**
               * @returns 要求に成功した
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods2['delete']['resBody'], BasicHeaders, Methods2['delete']['status']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}`
            }
          }
        },
        letters: {
          /**
           * @returns Success
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, `${prefix0}${PATH2}`, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, `${prefix0}${PATH2}`, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`
        },
        music: {
          _musicId: (val2: string) => {
            const prefix2 = `${prefix0}${PATH3}/${val2}`

            return {
              /**
               * @returns 要求に成功した
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods4['delete']['resBody'], BasicHeaders, Methods4['delete']['status']>(prefix, prefix2, DELETE, option).json(),
              /**
               * @returns 要求に成功した
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods4['delete']['resBody'], BasicHeaders, Methods4['delete']['status']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}`
            }
          }
        },
        musics: {
          /**
           * @returns Success
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, `${prefix0}${PATH4}`, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, `${prefix0}${PATH4}`, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH4}`
        },
        playlist: {
          music: {
            /**
             * @returns 要求に成功した
             */
            post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods7['post']['resBody'], BasicHeaders, Methods7['post']['status']>(prefix, `${prefix0}${PATH6}`, POST, option).json(),
            /**
             * @returns 要求に成功した
             */
            $post: (option: { body: Methods7['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods7['post']['resBody'], BasicHeaders, Methods7['post']['status']>(prefix, `${prefix0}${PATH6}`, POST, option).json().then(r => r.body),
            /**
             * @returns 要求に成功した
             */
            delete: (option: { body: Methods7['delete']['reqBody'], config?: T | undefined }) =>
              fetch<Methods7['delete']['resBody'], BasicHeaders, Methods7['delete']['status']>(prefix, `${prefix0}${PATH6}`, DELETE, option).json(),
            /**
             * @returns 要求に成功した
             */
            $delete: (option: { body: Methods7['delete']['reqBody'], config?: T | undefined }) =>
              fetch<Methods7['delete']['resBody'], BasicHeaders, Methods7['delete']['status']>(prefix, `${prefix0}${PATH6}`, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix0}${PATH6}`
          },
          /**
           * @returns Success
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, `${prefix0}${PATH5}`, GET, option).json(),
          /**
           * @returns Success
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods6['get']['resBody'], BasicHeaders, Methods6['get']['status']>(prefix, `${prefix0}${PATH5}`, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix0}${PATH5}`
        },
        /**
         * @returns Roomの詳細情報が返される
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * @returns Roomの詳細情報が返される
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        /**
         * @param option.body - created_atとupdated_atは自動設定
         * @returns 更新後のRoom情報が返される
         */
        put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).json(),
        /**
         * @param option.body - created_atとupdated_atは自動設定
         * @returns 更新後のRoom情報が返される
         */
        $put: (option: { body: Methods1['put']['reqBody'], config?: T | undefined }) =>
          fetch<Methods1['put']['resBody'], BasicHeaders, Methods1['put']['status']>(prefix, prefix0, PUT, option).json().then(r => r.body),
        /**
         * @returns 要求に成功した
         */
        delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['delete']['resBody'], BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).json(),
        /**
         * @returns 要求に成功した
         */
        $delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods1['delete']['resBody'], BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).json().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
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
     * @returns 作成されたRoom情報が返される
     */
    post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
    /**
     * @returns 作成されたRoom情報が返される
     */
    $post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
