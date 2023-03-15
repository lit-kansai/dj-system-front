<template>
  <div>
    <room-header />
    <router-view />
    <room-footer />
  </div>
</template>

<script setup lang="ts">
  useHead({
    style: [{ children: 'body{margin: 0}' }]
  })
</script>

<style scoped lang="scss">
</style>
