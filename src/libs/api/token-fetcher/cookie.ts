import { TokenFetcher } from '../interceptors'
import { COOKIE_AUTHORIZATION_KEY } from '@/constants'

export const cookie: TokenFetcher = {
  fetch: () => {
    const token = useCookie(COOKIE_AUTHORIZATION_KEY).value
    return token || null
  },
}
