import { Room } from '@/features'

export const useRoomsState = () => {
  const rooms = useState<Room[]>('rooms', () => [])
  const setRoom = (_room: Room) => {
    rooms.value.push(_room)
  }
  const setRooms = (_rooms: Room[]) => {
    rooms.value = _rooms
  }

  return { rooms, setRoom, setRooms }
}
