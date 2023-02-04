export default defineNuxtPlugin(async () => {
  if (useRuntimeConfig().public.MOCK_ENABLED) {
    const { worker } = await import('@/mocks')
    worker.start()
    worker.printHandlers()
  }
})
