import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from '.'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (
    baseURL === undefined ? 'https://raw.githubusercontent.com/' : baseURL
  ).replace(/\/$/, '')
  const PATH0 = '/mc/auth/signin/callback'
  const POST = 'POST'

  return {
    /**
     * @returns Success
     */
    post: (option: {
      body: Methods0['post']['reqBody']
      config?: T | undefined
    }) =>
      fetch<
      Methods0['post']['resBody'],
      BasicHeaders,
      Methods0['post']['status']
      >(prefix, PATH0, POST, option).json(),
    /**
     * @returns Success
     */
    $post: (option: {
      body: Methods0['post']['reqBody']
      config?: T | undefined
    }) =>
      fetch<
      Methods0['post']['resBody'],
      BasicHeaders,
      Methods0['post']['status']
      >(prefix, PATH0, POST, option)
        .json()
        .then(r => r.body),
    $path: () => `${prefix}${PATH0}`,
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
