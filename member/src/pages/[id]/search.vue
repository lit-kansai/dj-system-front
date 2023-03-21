<template>
  <div class="wrapper search">
    <div v-if="state.loading" class="loading"><music-loading /></div>
    <div v-else-if="state.musics.length === 0">
      <p>楽曲が見つかりませんでした</p>
    </div>
    <div v-else class="container">
      <div class="music-cards">
        <MusicCard
          v-for="music in state.musics"
          :id="music.id"
          :key="music.id"
          :thumbnail="music.thumbnail"
          :name="music.name"
          :artists="music.artists"
        />
      </div>
      <div class="music-cells">
        <MusicCell
          v-for="music in state.musics"
          :id="music.id"
          :key="music.id"
          :thumbnail="music.thumbnail"
          :name="music.name"
          :artists="music.artists"
        />
      </div>
    </div>
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
  .container {
    .music-cards {
      display: none;
      @include pc() {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 60px 15px;
        margin: 110px auto;
      }
    }
    .music-cells {
      margin: 18px 0 40px 0;
      display: flex;
      flex-direction: column;
      div + div {
        border-top: 1px solid $color-light-gray;
      }
    }
  }
</style>
