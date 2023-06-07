import { useUserState } from '@/composables/useUserState'
import { GOOGLE_API_CALLBACK_PATH, SPOTIFY_API_CALLBACK_PATH, APPLE_MUSIC_API_CALLBACK_PATH } from '@/constants'
import { getUser } from '@/features/user'
import { User } from '@/features/user/domain'
import { tokenFetcher } from '@/libs'

export default defineNuxtRouteMiddleware(async ({ path }) => {
  // NOTE: OAuth周りのルーティングの時はstateを更新しない
  if (
    path === GOOGLE_API_CALLBACK_PATH ||
    path === SPOTIFY_API_CALLBACK_PATH ||
    path === APPLE_MUSIC_API_CALLBACK_PATH
  ) { return }
  if (!tokenFetcher.fetch()) { return }

  const userState = useUserState()
  if (path !== '/login' && !userState.state.value) {
    const result = await getUser()
    const { data, error } = result
    if (error.value) {
      alert(JSON.stringify(error.value))
      return
    }
    if (!data.value) { return }

    const user: User = {
      id: data.value.id,
      googleId: data.value.googleId,
      email: data.value.email,
      name: data.value.name,
      icon: data.value.icon,
      isAdmin: data.value.isAdmin,
      createdAt: data.value.createdAt,
      updatedAt: data.value.updatedAt,
      linkedProviders: data.value.linkedProviders ? data.value.linkedProviders : null
    }
    console.log({ user })
    userState.setState(user)
  }
})
