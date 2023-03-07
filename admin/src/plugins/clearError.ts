export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error:cleared', () => {
    const { setCurrentError } = useCurrentError()
    setCurrentError(null)
  })
})
