<template>
  <div class="wrapper">
    <div class="top-musics">
      <MusicCard
        v-for="music in state.musics"
        :id="music.id"
        :key="music.id"
        :thumbnail="music.thumbnail"
        :name="music.name"
        :artists="music.artists"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { music } from '@/features'
  import { GetTop50MusicsInput, GetTop50MusicsResponse } from '@/features/music/api'
  const route = useRoute()

  const musicInit: GetTop50MusicsResponse = []
  const state = reactive({
    loading: true,
    musics: musicInit,
  })

  const fetchTop50Musics = async () => {
    const requestInput: GetTop50MusicsInput = {
      roomId: `${route.params.id}`,
    }
    const result = await music.api.getTop50Musics(requestInput)
    result.execute()
    if (!result.data.value) { state.loading = false; return }
    state.musics = result.data.value
  }

  onMounted(async () => {
    await fetchTop50Musics()
  })
</script>

<style scoped lang="scss">
  .wrapper {
    margin: 0 auto;
    .top-musics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 60px 15px;
    margin: 110px auto;
  }
}
</style>
