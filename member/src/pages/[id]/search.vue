<template>
  <div>
    <RoomHeader :is-show-search="true" />
    <div class="wrapper">
      <music-loading v-if="state.loading" />
      <div v-else-if="state.musics.length === 0">
        <p>楽曲が見つかりませんでした</p>
      </div>
      <div v-else class="music-list">
        <h2>検索結果</h2>
        <p>好きな曲を選択してみよう！</p>
        <MusicList :musics="state.musics" :on-click-submit-button="requestMusic" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { music, useHasMusicRequested, useRequestTimer, useRoomState } from '@/features'
  import { RequestMusicInput, SearchMusicInput, SearchMusicResponse } from '@/features/music/api'
  const { currentRoom } = useRoomState()
  const route = useRoute()
  const router = useRouter()
  const requestTimer = useRequestTimer()

  useHead({
    title: `${currentRoom.value?.name ?? ''}`,
    meta: [
      { property: 'og:title', content: `${currentRoom.value?.name ?? ''} | DJ Gassi System` },
    ]
  })

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
    const { setRequestMusicLoading } = useRequestMusicLoading()
    const roomId: string = String(route.params.id)
    const requestMusicInput: RequestMusicInput = {
      roomId,
      musics: [musicId],
      radioName,
      message
    }

    const result = music.api.requestMusic(requestMusicInput)
    setRequestMusicLoading(true)
    await result.execute()
    if (result.data.value) {
      requestTimer.requestMusic()
      const { setHasMusicRequested } = useHasMusicRequested()
      setHasMusicRequested(true)
      await navigateTo(`/${roomId}/requested`)
    } else {
      alert(result.error.value)
    }
    setRequestMusicLoading(true)
  }

  onMounted(async () => {
    const query = router.currentRoute.value.query.q?.toString() ?? ''
    await fetchMusics(query)
  })
</script>

<style scoped lang="scss">
  // これ書かないとglobalのものが反映されない時がある
  .wrapper {}
  .music-list {
    margin-top: 20px;
    @include pc() {
      margin: 110px auto;
    }
    h2 {
      margin-bottom: 5px;
    }
    p {
      font-weight: 400;
      font-size: 13px;
      color: $color-gray;
      margin-bottom: 0;
      @include pc() {
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 30px;
      }
    }
  }
</style>
