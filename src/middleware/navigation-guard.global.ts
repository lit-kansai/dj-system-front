import { tokenRequired, isDev } from '@/utils'
import { LOGIN_PAGE, GOOGLE_API_CALLBACK_PATH, SPOTIFY_API_CALLBACK_PATH } from '@/constants'
import { oauth, tokenFetcher } from '@/libs'

export default defineNuxtRouteMiddleware(async ({ path, query }) => {
  // TODO: テストできるようにええ感じにしたい
  const token = (isDev ? tokenFetcher.local : tokenFetcher.cookie).fetch()
  switch (path) {
    case '/': {
      if (!token) { return navigateTo('/login') }
      break
    }
    case LOGIN_PAGE: {
      if (token) { return navigateTo('/') }
      break
    }
    case GOOGLE_API_CALLBACK_PATH: {
      await oauth.google({ query })
      return navigateTo('/')
    }
    case SPOTIFY_API_CALLBACK_PATH: {
      // TODO: これからじっそうするで
      break
    }
    default: {
      if (!tokenRequired(path)) { return }
      if (!token) { return navigateTo('/login') }
    }
  }
})
