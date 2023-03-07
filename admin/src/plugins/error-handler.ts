export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error) => {
    const { setCurrentError } = useCurrentError()
    // TODO: エラーハンドリングします
    setCurrentError(error as Error)
  }
})
