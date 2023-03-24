type Cooltime = {
  min: string,
  sec: string,
}
export const useCooltime = () => {
  const cooltime = useState<Cooltime | null>('cooltime', () => null)
  const setCooltime = (_room: Cooltime) => {
    cooltime.value = _room
  }

  return { cooltime, setCooltime }
}
