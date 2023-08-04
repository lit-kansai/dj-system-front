export const useRetryStatus = () => {
  const retryStatus = useState<Record<string, boolean>>('retry-status', () => { return {} })
  const setRetryStatus = (payload: {path: string, isRetrying: boolean}): void => {
    const { path, isRetrying } = payload
    retryStatus.value[path] = isRetrying
  }

  const isRetrying = (): boolean => {
    return Object.keys(retryStatus.value).some((key) => {
      return retryStatus.value[key]
    })
  }

  return {
    retryStatus,
    setRetryStatus,
    isRetrying
  }
}
