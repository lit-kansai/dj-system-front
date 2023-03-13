import { GOOGLE_API_CALLBACK_PATH, SPOTIFY_API_CALLBACK_PATH } from '@/constants'
import { room } from '@/features'
import { logger, tokenFetcher } from '@/libs'

export default defineNuxtRouteMiddleware(async ({ path }) => {
  if (path === GOOGLE_API_CALLBACK_PATH || path === SPOTIFY_API_CALLBACK_PATH) { return }
  if (!tokenFetcher.fetch()) { return }

  const { rooms, setRooms } = useRoomsState()
  if (rooms.value.length) { return }

  const { data, error } = await room.api.getRooms()
  if (!data.value) { return }
  if (error.value) { logger.log(JSON.stringify(error.value)) }
  setRooms(data.value)
})
