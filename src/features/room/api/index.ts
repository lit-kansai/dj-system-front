import { getRoom } from './getRoom'
import { updateRoom } from './updateRoom'
import { createRoom } from './create-room'
import { deleteRoom } from './delete-room'
export * from './getRoom'
export * from './updateRoom'
export * from './create-room'
export * from './delete-room'
export const api = {
  getRoom,
  updateRoom,
  createRoom,
  deleteRoom
}
