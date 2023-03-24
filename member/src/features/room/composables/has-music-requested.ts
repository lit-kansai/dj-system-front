export const useHasMusicRequested = () => {
  const hasMusicRequested = useState<boolean>('hasMusicRequested', () => false)
  const setHasMusicRequested = (_hasMusicRequested: boolean) => {
    hasMusicRequested.value = _hasMusicRequested
  }
  return { hasMusicRequested, setHasMusicRequested }
}
