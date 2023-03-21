import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY } from '@/constants'

export const removeExpiredCooltime = () => {
  const cooltime = localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
  // cooltimeあるけど現在時刻より前やったら消しつつ遷移
  const currentTime = new Date().getTime()
  if (currentTime >= Number(cooltime)) { localStorage.removeItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY) }
}
