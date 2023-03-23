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
    min-height: calc(100vh - $footer-height);
    @include tablet() {
      min-height: calc(100vh - $tablet-footer-height);
    }
  }
  .footer {
    position: sticky;
    top: 100vh;
  }
</style>
