import {
  MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY,
  MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME
} from '@/constants'
const KEY = MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY
const COOLTIME = MEMBER_REQUEST_ALLOW_INTERVAL_DEFAULT_TIME

export const setDefaultCooltime = () => {
  const now = new Date().getTime()
  localStorage.setItem(KEY, String(now + COOLTIME))
}

export const setPreviousCooltime = () => {
  const now = new Date().getTime()
  localStorage.setItem(KEY, String(now - 10000))
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

export const isCooltimeEmpty = (): boolean => {
  return !localStorage.getItem(KEY)
}
