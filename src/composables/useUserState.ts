import { CurrentUser } from '@/types'

export const useUserState = () => {
  const userState = useState<CurrentUser>('user', () => null)
  const setUserState = (user: CurrentUser): void => {
    userState.value = user
  }

  return {
    userState,
    setUserState
  }
}
