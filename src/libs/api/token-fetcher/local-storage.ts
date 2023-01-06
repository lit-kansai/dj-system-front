import { TokenFetcher } from '../interceptors'

export const local: TokenFetcher = {
  fetch: () => {
    const data = localStorage.getItem('userInfo')
    if (!data) {
      return null
    }
    const { token } = JSON.parse(data) as { token: string }
    return token || null
  },
}
