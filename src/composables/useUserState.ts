import { CurrentUser } from '@/types'

export const useUserState = () => {
  const state = useState<CurrentUser>('user', () => null)
  const setState = (user: CurrentUser): void => {
    state.value = user
  }
  const isNull = state.value === null

  return {
    state,
    setState,
    isNull
  }
}
