import { room } from '@/features'
import { getRouteParams } from '@/utils'
import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY } from '@/constants'

const isSearchOrRootPath = (path: string): boolean => {
  const searchPath = /^\/[a-zA-Z0-9_-]+(\/search)?\/?$/
  const rootPath = /^\/[a-zA-Z0-9_-]+\/?$/
  return searchPath.test(path) || rootPath.test(path)
}

const isCooltimeOrRequestedPath = (path: string): boolean => {
  const cooltimePaths = /^\/[a-zA-Z0-9_-]+\/(requested|cooltime)\/?$/
  return cooltimePaths.test(path)
}
const isCooltimePath = (path: string): boolean => {
  const cooltimePaths = /^\/[a-zA-Z0-9_-]+\/cooltime\/?$/
  return cooltimePaths.test(path)
}

const removeExpiredCooltime = () => {
  const cooltime = localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
  // cooltimeあるけど現在時刻より前やったら消しつつ遷移
  const currentTime = new Date().getTime()
  if (currentTime >= Number(cooltime)) { localStorage.removeItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY) }
}

export default defineNuxtRouteMiddleware(async ({ path }) => {
  if (process.server) { return }
  removeExpiredCooltime()
  const roomRouteParams = getRouteParams.room()
  if (roomRouteParams) {
    const roomId = roomRouteParams.id
    const { error } = await room.api.getRoomOverview({ roomId })
    // ルームが見つからなかったとき(今のやつやと404以外もなのであまり良くないかも)
    if (error.value) { throw createError({ statusCode: 404, statusMessage: 'Page Not Found' }) }

    // cooltime, requestのとき
    if (isCooltimeOrRequestedPath(path)) {
      const cooltime = localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
      if (!cooltime) { return navigateTo(`/${roomId}`) }
    }

    if (isSearchOrRootPath(path)) {
      const cooltime = localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
      console.log(isCooltimePath(path), path)
      if (!isCooltimePath(path) && cooltime) { return navigateTo(`/${roomId}/cooltime`) }
    }
  }
})
