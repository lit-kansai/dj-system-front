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
          :music-name="state.modal.name"
          :artist-name="state.modal.artists"
          :album-url="state.modal.thumbnail"
          :text-area="state.modal.textArea"
          :text-field="state.modal.textField"
          @change-text-field="changeTextField"
          @change-text-area="changeTextArea"
          @on-click-submit-button="onClickSubmitButton"
        />
      </template>
    </ModalContainer>
  </div>
</template>
<script setup lang="ts">
  import { music } from '@/features'
  import { RequestMusicInput, SearchMusicInput } from '@/features/music/api'
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
    isModalOpen: false,
    modal: {
      id: '',
      thumbnail: '',
      name: '',
      artists: '',
      textArea: '',
      textField: '',
    }
  })

  const onClickMusicCard = (music: Music) => {
    state.modal.id = music.id
    state.modal.artists = music.artists
    state.modal.thumbnail = music.thumbnail
    state.modal.name = music.name
    state.isModalOpen = true
  }

  const changeTextField = (value: string) => {
    state.modal.textField = value
  }

  const changeTextArea = (value: string) => {
    state.modal.textArea = value
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
    requestMusic()
  }

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
    state.musics = result.data.value!.map(function (v) {
      return {
        id: v.id,
        thumbnail: v.thumbnail,
        name: v.name,
        artists: v.artists,
      }
    })
    state.loading = false
    state.beforeQuery = state.query.toString()
  }

  const requestMusic = async () => {
    const roomId: string = String(route.params.id)
    const requestMusicInput: RequestMusicInput = {
      roomId,
      musics: [state.modal.id],
      radioName: state.modal.textField,
      message: state.modal.textArea
    }

    const result = music.api.requestMusic(requestMusicInput)
    await result.execute()
    if (result.data.value) {
      navigateTo(`/${roomId}/requested`)
    } else {
      alert(result.error.value)
    }
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
