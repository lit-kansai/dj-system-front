import { useUserState } from '@/composables/useUserState'
import { getUser } from '@/features/user'
import { User } from '@/types'

export default defineNuxtRouteMiddleware(async ({ path }) => {
  const userState = useUserState()

  if (path === '/login') {
    userState.setState(null)
  } else if (!userState.isNull) {
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
    userState.setState(user)
  }
})
