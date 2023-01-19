import { registerUser } from '@/features/auth/api'
import { oauthCallback } from '@/libs/routeMiddleware/oauthCallback/oauthCallback'
import { GOOGLE_API_CALLBACK_URL } from '@/constants'

export default defineNuxtRouteMiddleware((to) => {
  oauthCallback(to.path, to.query, {
    google: async (e) => {
      await registerUser({
        code: e.code,
        redirectUrl: GOOGLE_API_CALLBACK_URL
      })
    },
    apple: async (_) => {},
    spotify: async (_) => {},
  })
})
