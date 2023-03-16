import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY, MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME } from '@/constants'

export const useRequestTimer = () => {
  const intervalTime = ref(MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME)

  // 音楽をリクエストしたとき
  const requestMusic = () => {
    const now = new Date().getTime()
    localStorage.setItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY, String(now + intervalTime.value))
  }

  // 残り時間(ミリ秒)
  const waitingTime = () => {
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
    return waitingTime().ms <= 0
  }

  return {
    requestMusic, waitingTime, isAllowRequestMusic
  }
}
