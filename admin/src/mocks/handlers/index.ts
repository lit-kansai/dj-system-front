import { createRoomHandler } from './create-room'
import { getRoomHandler } from './get-room'
import { getUserHandler } from './get-user'
export const handlers = [
  getRoomHandler,
  createRoomHandler,
  getUserHandler
]
