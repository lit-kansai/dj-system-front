<template>
  <div class="wrapper search">
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
      @click="onClickMusicCard(music)"
    />
    <ModalContainer v-bind="modalProps">
      <template #content>
        <MusicRequestForm
          :music-name="state.selectedMusic.name"
          :artist-name="state.selectedMusic.artists"
          :album-url="state.selectedMusic.thumbnail"
          text-area=""
          text-field=""
          @on-click-submit-button="onClickSubmitButton"
        />
      </template>
    </ModalContainer>
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
    beforeQuery: '',
    loading: true,
    timerObj: setTimeout(function () {}, 0),
    isFirstFetched: false,
    isModalOpen: false,
    selectedMusic: {
      thumbnail: '',
      name: '',
      artists: ''
    }
  })

  const onClickMusicCard = (music: Music) => {
    state.selectedMusic.artists = music.artists
    state.selectedMusic.thumbnail = music.thumbnail
    state.selectedMusic.name = music.name
    state.isModalOpen = true
  }

  const onClickOutside = () => {
    state.isModalOpen = false
  }
  const onClickCloseButton = () => {
    state.isModalOpen = false
  }

  const modalProps = reactive({
    isOpen: toRef(state, 'isModalOpen'),
    onClickOutside,
    onClickCloseButton
  })

  const onClickSubmitButton = () => {
    console.log('onClickSubmitButton')
  }

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
    state.isFirstFetched = true
  })

  onBeforeUpdate(() => {
    if (!state.isFirstFetched) { state.isFirstFetched = true; return }
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
