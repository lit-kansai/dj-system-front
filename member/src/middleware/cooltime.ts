import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY } from '@/constants'
import { useRequestTimer, useCooltime } from '@/features'

export default defineNuxtRouteMiddleware(() => {
  const { intervalTime } = useRequestTimer()
  const { setCooltime } = useCooltime()
  if (!localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)) { return }
  const { sec, min } = intervalTime()
  setCooltime({ min, sec })
})
