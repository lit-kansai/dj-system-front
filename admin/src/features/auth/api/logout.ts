import { useUserState } from '@/composables/useUserState'
import { isDev } from '@/utils/is-dev'
import { USER_INFO } from '@/constants'

export const logout = () => {
  const userState = useUserState()
  if (isDev) {
    localStorage.removeItem(USER_INFO)
  } else {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }
  userState.setState(null)
}
