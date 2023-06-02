import { cookie } from './cookie'
import { local } from './local-storage'
import { isDev } from '@/utils'
export const tokenFetcher = {
  cookie,
  local,
  fetch: (): string | null => {
    if (isDev) { return local.fetch() }
    // FIXME: Cookie動いてないので一旦LocalStorageで
    return local.fetch()
    // return cookie.fetch()
  }
}
