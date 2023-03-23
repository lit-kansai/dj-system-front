<template>
  <router-view />
</template>

<script setup lang="ts">
  useHead({
    style: [{ children: 'html{height: 100%} body{margin: 0; min-height: 100%;}' }]
  })
</script>

<style scoped lang="scss">
</style>
