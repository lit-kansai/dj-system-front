<template>
  <div class="wrapper search">
    <div v-if="state.loading">loading</div>
    <div v-else-if="state.musics.length === 0">
      <p>楽曲が見つかりませんでした</p>
    </div>
    <MusicCard
      v-for="music in state.musics"
      v-else
      :id="music.id"
      :key="music.id"
      :thumbnail="music.thumbnail"
      :name="music.name"
      :artists="music.artists"
    />
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
.search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 60px 15px;
  margin: 110px auto;
}
</style>
