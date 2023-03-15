<template>
  <div>
    <button @click="openModal">openModal</button>
    <ModalContainer v-bind="modalProps">
      <template #content>
        <MusicRequestForm
          music-name="きらり"
          artist-name="藤井風"
          album-url="https://i.kfs.io/album/global/162607085,0v1/fit/500x500.jpg"
          @change-text-field="changeTextField"
          @change-text-area="changeTextArea"
          @on-click-submit-button="onClickSubmitButton"
        />
      </template>
    </ModalContainer>
  </div>
</template>
<script setup lang="ts">
  const state = reactive({
    text: '',
    isOpen: true
  })
  const changeTextField = (value: string) => {
    console.log('changeTextField', value)
  }

  const changeTextArea = (value: string) => {
    console.log('chageTextArea', value)
  }

  const onClickSubmitButton = () => {
    console.log('onClickSubmitButton')
  }

  const openModal = () => {
    state.isOpen = true
  }

  const onClickOutside = () => {
    state.isOpen = false
  }
  const onClickCloseButton = () => {
    state.isOpen = false
  }

  const modalProps = reactive({
    isOpen: toRef(state, 'isOpen'),
    onClickOutside,
    onClickCloseButton
  })

</script>
<style scoped lang="scss">
  .container {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 32px;
    img {
      width: 300px;
      height: 300px;
    }
  }
  .music_name {
    font-size: 48px;
    color: $text-color-black;
    font-weight: 700;
  }
  .artist_name {
    font-size: 20px;
    color: $text-color-gray;
  }

  .form_container {
    gap: 24px;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
  }
  .form_element {
    font-size: 14px;
  }
  .right {
    flex-grow: 1;
  }
</style>
