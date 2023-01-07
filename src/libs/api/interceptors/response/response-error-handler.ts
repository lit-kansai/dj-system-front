export const responseErrorHandler = (error: unknown) => {
  const { setCurrentError } = useCurrentError()
  const appConfig = useAppConfig()
  /* eslint-disable no-console */
  if (appConfig.dev) { console.error(error) }
  if (!(error instanceof Error)) {
    setCurrentError(new Error(JSON.stringify(error)))
    return Promise.reject(error)
  }
  setCurrentError(error)
  return Promise.reject(error)
}
