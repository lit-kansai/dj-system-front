<template>
  <div>
    <RoomHeader :is-show-search="true" />
    <div class="wrapper">
      <music-loading v-if="state.loading" />
      <div v-else-if="state.musics.length === 0">
        <p>楽曲が見つかりませんでした</p>
      </div>
      <MusicList v-else :musics="state.musics" :on-click-submit-button="requestMusic" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { music, useRequestTimer } from '@/features'
  import { RequestMusicInput, SearchMusicInput, SearchMusicResponse } from '@/features/music/api'
  const route = useRoute()
  const router = useRouter()
  const requestTimer = useRequestTimer()

  const musicInit: SearchMusicResponse = []
  const state = reactive({
    musics: musicInit,
    loading: true,
  })

  watch(router.currentRoute, (currentRoute, _) => {
    fetchMusics(currentRoute.query.q?.toString() ?? '')
  })

  const fetchMusics = async (query: string) => {
    state.loading = true
    if (query === '') { state.loading = false; return }
    const requestMusicInput: SearchMusicInput = {
      roomId: `${route.params.id}`,
      query
    }
    const result = music.api.searchMusics(requestMusicInput)
    await result.execute()
    if (!result.data.value) { state.loading = false; return }
    state.musics = result.data.value
    state.loading = false
  }

  const requestMusic = async (musicId: string, radioName: string, message: string) => {
    const roomId: string = String(route.params.id)
    const requestMusicInput: RequestMusicInput = {
      roomId,
      musics: [musicId],
      radioName,
      message
    }

    const result = music.api.requestMusic(requestMusicInput)
    await result.execute()
    if (result.data.value) {
      requestTimer.requestMusic()
      await navigateTo(`/${roomId}/requested`)
    } else {
      alert(result.error.value)
    }
  }

  onMounted(async () => {
    const query = router.currentRoute.value.query.q?.toString() ?? ''
    await fetchMusics(query)
  })
</script>

<style scoped lang="scss">
</style>
