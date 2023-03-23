import { RoomOverview } from '../'

export const useRoomState = () => {
  const currentRoom = useState<RoomOverview | null>('currentRoom', () => null)
  const setCurrentRoom = (_room: RoomOverview) => {
    currentRoom.value = _room
  }

  return { currentRoom, setCurrentRoom }
}
