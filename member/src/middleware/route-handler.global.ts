import { room, useHasMusicRequested, useRequestTimer, useRoomState } from '@/features'
import { getRouteParams } from '@/utils'
import { MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY } from '@/constants'

const isRootPath = (path: string): boolean => {
  const rootPath = /^\/[a-zA-Z0-9_-]+$/
  return rootPath.test(path)
}

const extractPath = (path: string): string | null => {
  const cooltimePaths = /^\/[a-zA-Z0-9_-]+\/(requested|cooltime|search)\/?$/
  const match = path.match(cooltimePaths)
  if (match && match[1]) { return match[1] }

  return null
}

export default defineNuxtRouteMiddleware(async ({ path }) => {
  if (process.server) { return }
  const { removeExpiredCooltime } = useRequestTimer()
  removeExpiredCooltime()
  const roomRouteParams = getRouteParams.room()
  if (roomRouteParams) {
    const roomId = roomRouteParams.id
    const { data, error } = await room.api.getRoomOverview({ roomId })
    // ルームが見つからなかったとき(今のやつやと404以外もなのであまり良くないかも)
    if (error.value) { throw createError({ statusCode: 404, statusMessage: 'Room Not Found' }) }
    if (data.value) {
      const { setCurrentRoom } = useRoomState()
      setCurrentRoom(data.value)
    }

    const cooltime = localStorage.getItem(MEMBER_ALLOW_REQUEST_TIME_LOCAL_STORAGE_KEY)
    if (isRootPath(path)) {
      // navigateToだとバグるので
      if (cooltime) { window.location.href = `/${roomId}/cooltime`; return }
      return
    }

    const roomPagePath = extractPath(path)
    if (roomPagePath === 'search') {
      if (cooltime) { window.location.href = `/${roomId}/cooltime`; return }
      return
    }

    if (roomPagePath === 'cooltime') {
      if (!cooltime) { return navigateTo(`/${roomId}`) }
      return
    }

    if (roomPagePath === 'requested') {
      const { hasMusicRequested } = useHasMusicRequested()
      if (!hasMusicRequested.value) { return navigateTo(`/${roomId}/cooltime`) }
      if (!cooltime) { return navigateTo(`/${roomId}`) }
    }
  }
})
