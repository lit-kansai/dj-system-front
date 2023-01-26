import { isDev } from '../utils/is-dev'
import { registerUser } from '@/features/auth/api'
import { oauthCallback } from '@/libs/routeMiddleware/oauthCallback/oauthCallback'
import { USER_INFO, GOOGLE_API_CALLBACK_PATH, GOOGLE_API_CALLBACK_URL, SPOTIFY_API_CALLBACK_PATH, APPLE_MUSIC_API_CALLBACK_PATH } from '@/constants'

const isCallbackPath = (path: string): boolean => {
  return path === GOOGLE_API_CALLBACK_PATH ||
    path === SPOTIFY_API_CALLBACK_PATH ||
    path === APPLE_MUSIC_API_CALLBACK_PATH
}

export default defineNuxtRouteMiddleware(async ({ path, query }) => {
  if (!isCallbackPath(path)) { return }
  await oauthCallback(path, query, {
    google: async (e) => {
      // TODO: ここらへんのDIまとめたい。いちいちisDev?とかするのつらい
      if (isDev) {
        // TODO: エラーハンドリング
        const { data } = await registerUser({
          code: e.code,
          redirectUrl: GOOGLE_API_CALLBACK_URL
        })
        if (!data.value) { return }
        // dev環境ならlocalStorageに保存する
        localStorage.setItem(USER_INFO, JSON.stringify(data.value))
        return
      }
      await registerUser({
        code: e.code,
        redirectUrl: GOOGLE_API_CALLBACK_URL
      })
    },
    apple: async (_) => {},
    spotify: async (_) => {},
  })
  return navigateTo('/')
})
