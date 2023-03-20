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

  const musicInit: SearchMusicResponse = []

  const state = reactive({
    musics: musicInit,
    query: route.query.q,
    beforeQuery: '',
    loading: true,
    timerObj: setTimeout(function () {}, 0),
  })

  const fetchMusics = async () => {
    state.loading = true
    if (!state.query) { state.loading = false; return }
    const requestMusicInput: SearchMusicInput = {
      roomId: `${route.params.id}`,
      query: state.query.toString()
    }
    const result = music.api.searchMusics(requestMusicInput)
    await result.execute()
    if (!result.data.value) { state.loading = false; return }
    state.musics = result.data.value
    state.loading = false
    state.beforeQuery = state.query.toString()
  }

  onMounted(async () => {
    await fetchMusics()
  })

  onBeforeUpdate(() => {
    state.query = String(route.query.q)
    if (state.query !== state.beforeQuery) {
      clearTimeout(state.timerObj)
      state.timerObj = setTimeout(async function () {
        await fetchMusics()
        clearTimeout(state.timerObj)
      }, 1800)
    } else {
      clearTimeout(state.timerObj)
    }
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
