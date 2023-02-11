import { getRooms, getRoom, getRoomDetail, updateRoom, createRoom, deleteRoom } from './api'
export const room = {
  api: {
    getRoom,
    getRoomDetail,
    getRooms,
    updateRoom,
    createRoom,
    deleteRoom
  }
}
export * from './domain'
