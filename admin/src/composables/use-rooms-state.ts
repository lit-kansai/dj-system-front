import { Room } from '@/features'

export const useRoomsState = () => {
  const rooms = useState<Room[]>('rooms', () => [])
  const setRoom = (_room: Room) => {
    rooms.value.push(_room)
  }
  const setRooms = (_rooms: Room[]) => {
    rooms.value = _rooms
  }
  const spliceRoom = (_displayId: string) => {
    const result = rooms.value.findIndex(room => room.displayId === _displayId)
    rooms.value.splice(result)
  }

  return { rooms, setRoom, setRooms, spliceRoom }
}
