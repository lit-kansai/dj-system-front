<template>
  <div class="wrapper search-result">
    <div v-if="state.loading">loading</div>
    <div v-else-if="state.music.length === 0">
      <p>楽曲が見つかりませんでした</p>
    </div>
    <MusicCard v-for="music in state.music" v-else :key="music.id" />
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
    music: musicInit,
    loading: true,
  })

  onMounted(async () => {
    const requestMusicInput: SearchMusicInput = {
      roomId: `${route.params.id}`,
      query: '藤井風'
    }
    const result = music.api.searchMusics(requestMusicInput)
    await result.execute()
    if (!result.data.value) { state.loading = false; return }
    state.music = result.data.value!.map(function (v) {
      return {
        id: v.id,
        thumbnail: v.thumbnail,
        name: v.name,
        artists: v.artists
      }
    })
    state.loading = false
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
