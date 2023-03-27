export const useRequestMusicLoading = () => {
  const requestMusicLoading = useState<boolean>('useRequestMusicLoading', () => false)
  const setRequestMusicLoading = (_requestMusicLoading: boolean) => {
    requestMusicLoading.value = _requestMusicLoading
  }
  return { requestMusicLoading, setRequestMusicLoading }
}
