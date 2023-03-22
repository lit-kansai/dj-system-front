<template>
  <div>
    <div class="music-cards">
      <MusicCard
        v-for="music in musics"
        :key="music.id"
        :thumbnail="music.thumbnail"
        :name="music.name"
        :artists="music.artists"
        @click="onClickMusic(music)"
      />
      <div v-for="v in state.blankElements" :key="v" class="blank" />
    </div>
    <div class="music-cells">
      <MusicCell
        v-for="music in musics"
        :key="music.id"
        :thumbnail="music.thumbnail"
        :name="music.name"
        :artists="music.artists"
        @click="onClickMusic(music)"
      />
    </div>
    <ModalContainer v-bind="modalProps">
      <template #content>
        <MusicRequestForm
          :music-name="state.modal.music.name"
          :artist-name="state.modal.music.artists"
          :album-url="state.modal.music.thumbnail"
          :text-area="state.modal.textArea"
          :text-field="state.modal.textField"
          @change-text-field="changeTextField"
          @change-text-area="changeTextArea"
          @on-click-submit-button="onClickSubmitButton(state.modal.music.id, state.modal.textField, state.modal.textArea)"
        />
      </template>
    </ModalContainer>
  </div>
</template>

<script setup lang="ts">
  import { Track } from '@dj-system/api-client/src/generated/@types'

  interface Props {
    musics: Track[],
    onClickSubmitButton: (musicId: string, radioName: string, message: string) => void
  }
  const props = withDefaults(defineProps<Props>(), {
    musics: () => [],
    onClickSubmitButton: () => {}
  })

  const state = reactive({
    blankElements: [0],
    modal: {
      isOpen: false,
      textArea: '',
      textField: '',
      music: {
        id: '',
        name: '',
        artists: '',
        thumbnail: ''
      }
    }
  })

  const updateBlankElements = () => {
    const width = window.innerWidth
    let count
    if (width / 277 >= 4) {
      count = props.musics.length % 4
    } else {
      count = props.musics.length % 3
    }
    state.blankElements = [...Array(count)].map((_, i) => i)
  }

  const onClickMusic = (music: Track) => {
    state.modal.music.id = music.id
    state.modal.music.name = music.name
    state.modal.music.artists = music.artists
    state.modal.music.thumbnail = music.thumbnail
    state.modal.isOpen = true
  }
  const changeTextField = (value: string) => {
    state.modal.textField = value
  }
  const changeTextArea = (value: string) => {
    state.modal.textArea = value
  }
  const onClickOutside = () => {
    state.modal.isOpen = false
  }
  const onClickCloseButton = () => {
    state.modal.isOpen = false
  }

  const modalProps = reactive({
    isOpen: toRef(state.modal, 'isOpen'),
    onClickOutside,
    onClickCloseButton
  })

  onMounted(() => {
    updateBlankElements()
    window.addEventListener('resize', () => {
      updateBlankElements()
    })
  })
</script>

<style scoped lang="scss">
  .music-cards {
    display: none;
    @include pc() {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 60px 15px;
      margin: 110px auto;
    }
    .blank {
      width: 270px;
    }
  }
  .music-cells {
    margin: 18px 0 40px 0;
    display: flex;
    flex-direction: column;
    @include pc() {
      display: none;
    }
    div + div {
      border-top: 1px solid $color-light-gray;
    }
  }
</style>
