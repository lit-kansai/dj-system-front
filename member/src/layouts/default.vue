<template>
  <div>
    <router-view />
    <RoomFooter class="footer" />
  </div>
</template>

<script setup lang="ts">
  useHead({
    style: [{ children: 'html{height: 100%} body{margin: 0; min-height: 100%;}' }]
  })
</script>

<style scoped lang="scss">
  div {
    min-height: calc(100dvh - $footer-height);
    @include tablet() {
      min-height: calc(100dvh - $tablet-footer-height);
    }
  }
  .footer {
    position: sticky;
    top: 100dvh;
  }
</style>
