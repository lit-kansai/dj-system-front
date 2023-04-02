import { music, room } from '@/features'

export default defineNuxtPlugin(async () => {
  if (useRuntimeConfig().public.MOCK_ENABLED) {
    const { worker } = await import('@/libs/msw')
    worker.use(
      room.msw.roomOverviewResponseHandler,
      music.msw.searchMusicsHandler,
      music.msw.requestMusicHandler,
      music.msw.getTop50MusicsHandler
    )
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
})
