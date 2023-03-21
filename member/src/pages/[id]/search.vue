<template>
  <div class="wrapper">
    <div v-if="state.loading" class="loading"><music-loading /></div>
    <div v-else-if="state.musics.length === 0">
      <p>楽曲が見つかりませんでした</p>
    </div>
    <MusicList v-else :musics="state.musics" />
  </div>
</template>
<script setup lang="ts">
  import { music } from '@/features'
  import { SearchMusicInput, SearchMusicResponse } from '@/features/music/api'
  const route = useRoute()
  const router = useRouter()

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

  onMounted(async () => {
    const query = router.currentRoute.value.query.q?.toString() ?? ''
    await fetchMusics(query)
  })
</script>
<style scoped lang="scss">
  .loading {
    width: 100%;
  }
</style>
