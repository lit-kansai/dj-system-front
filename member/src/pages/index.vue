<template>
  <div>
    <button @click="openModal">openModal</button>
    <ModalContainer v-bind="modalProps">
      <template #content>
        <MusicRequestForm
          music-name="きらり"
          artist-name="藤井風"
          album-url="https://i.kfs.io/album/global/162607085,0v1/fit/500x500.jpg"
          text-area=""
          text-field=""
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
</style>
