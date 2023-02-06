import { room } from '@/features'
import { logger } from '@/libs'

export default defineNuxtRouteMiddleware(async () => {
  const { rooms, setRooms } = useRoomsState()
  if (!rooms) { return }

  const { data, error } = await room.api.getRooms()
  if (!data.value) { return }
  if (!error.value) { logger.log(JSON.stringify(error.value)) }
  setRooms(data.value)
})
