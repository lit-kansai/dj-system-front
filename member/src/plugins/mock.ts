export default defineNuxtPlugin(async () => {
  if (useRuntimeConfig().public.MOCK_ENABLED) {
    const { worker } = await import('@/libs/msw')
    await worker.start()
  }
})
