<template>
  <div class="submit_button_container">
    <button
      class="submit_button"
    >
      {{ title }}
    </button>
  </div>
</template>
<script setup lang="ts">
  interface Props {
    title: string,
  }
  withDefaults(defineProps<Props>(), {
    title: '',
  })
</script>

<style scoped lang="scss">
  .submit_button_container {
    text-align: center;
    .submit_button {
      background: $color-gradient-orange;
      color: $color-white;
      width: 260px;
      padding: 12px 16px;
      font-size: 16px;
      border: none;
      border-radius: 24px;
      opacity: 1;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
      &:active {
        opacity: 0.8;
      }
    }
  }
</style>
