import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY, MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME } from '@/constants'

export const useRequestTimer = () => {
  const intervalTime = ref(MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME)

  // 音楽をリクエストしたとき
  const requestMusic = () => {
    const now = new Date().getTime()
    localStorage.setItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY, String(now + intervalTime.value))
  }

  // 残り時間(秒)
  const waitingTime = () => {
    const now = new Date().getTime()
    const allowTime = Number(localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY) ?? '')
    return allowTime !== 0 ? Math.floor((allowTime - now) / 1000) % 60 : 0
  }

  // 音楽リクエストが許可されるか
  const isAllowRequestMusic = () => {
    return waitingTime() <= 0
  }

  return {
    requestMusic, waitingTime, isAllowRequestMusic
  }
}
