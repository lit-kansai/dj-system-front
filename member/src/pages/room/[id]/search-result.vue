<template>
  <div class="wrapper">
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
    const { data } = await music.api.searchMusics(requestMusicInput)
    if (!data.value) { state.loading = false; return }
    state.music = data.value.map(function (v) {
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
<style scoped lang="scss"></style>
