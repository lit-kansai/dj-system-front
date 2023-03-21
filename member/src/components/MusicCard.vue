<template>
  <div>
    <div
      class="music-card"
      @click="onClickMusicCard"
    >
      <img :src="thumbnail" :alt="`${name}のサムネイル写真`">
      <p class="name">{{ name }}</p>
      <p class="artists">{{ artists }}</p>
    </div>
    <ModalContainer v-bind="modalProps">
      <template #content>
        <MusicRequestForm
          :music-name="name"
          :artist-name="artists"
          :album-url="thumbnail"
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
  import { music, useRequestTimer } from '@/features'
  import { RequestMusicInput } from '@/features/music/api'
  const requestTimer = useRequestTimer()

  const route = useRoute()
  interface Props {
    id: string,
    thumbnail: string,
    name: string,
    artists: string
  }
  const props = withDefaults(defineProps<Props>(), {
    thumbnail: '',
    name: '',
    artists: ''
  })
  const state = reactive({
    isModalOpen: false,
    modal: {
      textArea: '',
      textField: '',
    }
  })
  const onClickMusicCard = () => {
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
  const onClickSubmitButton = () => {
    requestMusic()
  }
  const modalProps = reactive({
    isOpen: toRef(state, 'isModalOpen'),
    onClickOutside,
    onClickCloseButton
  })
  const requestMusic = async () => {
    const roomId: string = String(route.params.id)
    const requestMusicInput: RequestMusicInput = {
      roomId,
      musics: [props.id],
      radioName: state.modal.textField,
      message: state.modal.textArea
    }

    const result = music.api.requestMusic(requestMusicInput)
    await result.execute()
    if (result.data.value) {
      await navigateTo(`/${roomId}/requested`)
      requestTimer.requestMusic()
    } else {
      alert(result.error.value)
    }
  }
</script>

<style scoped lang="scss">
  .music-card {
    width: 270px;
    height: 360px;
    padding: 25px 25px 0 25px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px 2px $music-card-shadow;
    cursor: pointer;

    img {
      width: 100%;
      object-fit: cover;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .name {
      margin: 20px 0 0 -2px;
      font-weight: 700;
      font-size: 21px;
      line-height: 25px;
      color: $text-color-black;
    }

    .artists {
      margin-top: 10px;
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: $text-color-gray;
    }
  }
</style>
