import { CurrentUser } from '@/features/user/domain'

export const useUserState = () => {
  const state = useState<CurrentUser>('user', () => null)
  const setState = (user: CurrentUser): void => {
    state.value = user
  }

  return {
    state,
    setState
  }
}
