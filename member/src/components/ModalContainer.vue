<template>
  <div v-if="isOpen" class="wrapper" @click="onClickOutside">
    <div class="container" @click.stop>
      <ModalCloseButton @click.stop="onClickCloseButton" />
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
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100vw !important;
  }
  .container {
    position: relative;
    margin-left: 1rem;
    margin-right: 1rem;
    width: 100%;
    max-width: 1024px;
    border-radius: 25px;
    background-color: $background-color;
    box-shadow: 0px 4px 4px $shadow-color;

    @media (min-width: 768px) {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      margin-left: auto;
      margin-right: auto;
    }
  }

</style>
