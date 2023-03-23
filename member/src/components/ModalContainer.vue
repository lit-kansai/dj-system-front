<template>
  <div v-if="isOpen" class="wrapper" @click="onClickOutside">
    <div class="container" @click.stop>
      <ModalCloseButton class="close-button" @click.stop="onClickCloseButton" />
      <slot name="content" />
    </div>
  </div>
</template>
<script setup lang="ts">
  interface Props {
    isOpen: boolean
    onClickOutside: () => void
    onClickCloseButton: () => void
  }
  withDefaults(defineProps<Props>(), {
    isOpen: false,
    onClickOutside: () => {},
    onClickCloseButton: () => {}
  })
</script>
<style scoped lang="scss">
  .wrapper {
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    overflow: hidden;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100vw !important;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .container {
    width: 100%;
    max-width: 1024px;
    position: absolute;
    bottom: 0;
    padding: 20px 15px;
    border-radius: 20px 20px 0px 0px;
    background-color: $background-color;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.25);
    animation-name:fadeUpAnime;
    animation-duration: 0.5s;
    animation-fill-mode:forwards;
    opacity:0;
    @include pc() {
      animation-name:fadeInAnime;
      animation-duration: 0.3s;
      position: relative;
      margin: 0 1rem;
      padding: 0;
      border-radius: 25px;
      box-shadow: 0px 4px 4px $shadow-color;
    }
    .close-button {
      display: none;
      @include pc() {
        display: block;
      }
    }
  }

  @keyframes fadeInAnime{
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeUpAnime{
    from {
      opacity: 0;
      transform: translateY(100px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

</style>
