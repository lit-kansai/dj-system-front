import { createRoomHandler } from './create-room'
import { getRoomHandler } from './get-room'
import { getUserHandler } from './get-user'
import { errorHandler } from './error'
export const handlers = [
  errorHandler,
  getRoomHandler,
  createRoomHandler,
  getUserHandler
]
