import { tokenRequired, isDev } from '@/utils'
import { LOGIN_PAGE, GOOGLE_API_CALLBACK_PATH, SPOTIFY_API_CALLBACK_PATH, SETTINGS_PAGE } from '@/constants'
import { oauth, tokenFetcher } from '@/libs'
import { getUser } from '@/features/user'

export default defineNuxtRouteMiddleware(async ({ path, query }) => {
  // TODO: テストできるようにええ感じにしたい

  // FIXME: Cookie動いてないので一旦LocalStorageで
  const token = (isDev ? tokenFetcher.local : tokenFetcher.local).fetch()
  // const token = (isDev ? tokenFetcher.local : tokenFetcher.cookie).fetch()
  switch (path) {
    case '/': {
      if (!token) { return navigateTo(LOGIN_PAGE) }
      break
    }
    case LOGIN_PAGE: {
      if (token) { return navigateTo('/') }
      break
    }
    case GOOGLE_API_CALLBACK_PATH: {
      await oauth.google({ query })
      const { data, error } = await getUser()
      if (error.value) { throw new Error(JSON.stringify(error.value)) }
      useUserState().setState(data.value)
      return navigateTo('/')
    }
    case SPOTIFY_API_CALLBACK_PATH: {
      // TODO: これからじっそうするで
      await oauth.spotify({ query })
      const { data, error } = await getUser()
      if (error.value) { throw new Error(JSON.stringify(error.value)) }
      useUserState().setState(data.value)
      return navigateTo(SETTINGS_PAGE)
    }
    default: {
      if (!tokenRequired(path)) { return }
      if (!token) { return navigateTo(LOGIN_PAGE) }
    }
  }
})
