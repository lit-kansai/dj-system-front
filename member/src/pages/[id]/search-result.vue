<template>
  <div class="wrapper search-result">
    <div v-if="state.loading">loading</div>
    <div v-else-if="state.musics.length === 0">
      <p>楽曲が見つかりませんでした</p>
    </div>
    <MusicCard
      v-for="music in state.musics"
      v-else
      :key="music.id"
      :thumbnail="music.thumbnail"
      :name="music.name"
      :artists="music.artists"
    />
  </div>
</template>
<script setup lang="ts">
  import { music } from '@/features'
  import { SearchMusicInput } from '@/features/music/api'
  const route = useRoute()

  type Music = {
    id: string,
    thumbnail: string,
    name: string,
    artists: string
  }
  const musicInit: Music[] = []

  const state = reactive({
    musics: musicInit,
    query: route.query.q,
    loading: true,
    timerObj: setTimeout(function () {}, 0),
    isFirstFetched: false
  })

  const fetchMusics = async () => {
    state.loading = true
    const requestMusicInput: SearchMusicInput = {
      roomId: `${route.params.id}`,
      query: state.query?.toString() ?? ''
    }
    const result = music.api.searchMusics(requestMusicInput)
    await result.execute()
    if (!result.data.value) { state.loading = false; return }
    state.musics = result.data.value!.map(function (v) {
      return {
        id: v.id,
        thumbnail: v.thumbnail,
        name: v.name,
        artists: v.artists,
      }
    })
    state.loading = false
  }

  onMounted(async () => {
    await fetchMusics()
  })

  onBeforeUpdate(() => {
    if (!state.isFirstFetched) { state.isFirstFetched = true; return }
    state.query = route.query.q
    clearTimeout(state.timerObj)
    state.timerObj = setTimeout(async function () {
      await fetchMusics()
      clearTimeout(state.timerObj)
    }, 1800)
  })
</script>
<style scoped lang="scss">
.search-result {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 60px 30px;
  margin: 110px auto;

  .music-card {
    width: 220px;
  }
}
</style>
