import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY, MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME } from '@/constants'

export const useRequestTimer = () => {
  const _intervalTime = ref(MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME)

  // 音楽をリクエストしたとき
  const requestMusic = () => {
    const now = new Date().getTime()
    localStorage.setItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY, String(now + _intervalTime.value))
  }

  // 残り時間(ミリ秒)
  const intervalTime = () => {
    const now = new Date().getTime()
    const allowRequestTime = Number(localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY) ?? '')
    const ms = Math.floor((allowRequestTime - now) / 1000)
    return {
      ms,
      min: ('00' + Math.floor(ms / 60) % 60).slice(-2),
      sec: ('00' + ms % 60).slice(-2)
    }
  }

  // 音楽リクエストが許可されるか
  const isAllowRequestMusic = () => {
    const requestAllowedTime = localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
    const currentTime = new Date().getTime()
    const isExpired = currentTime >= Number(requestAllowedTime)
    return isExpired
  }

  const removeExpiredCooltime = () => {
    if (isAllowRequestMusic()) {
      localStorage.removeItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
    }
  }

  return {
    requestMusic, intervalTime, isAllowRequestMusic, removeExpiredCooltime
  }
}
