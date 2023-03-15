<template>
  <div>
    <room-header />
    <router-view />
    <room-footer v-if="!state.isHiddenFooter" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const state = reactive({
    isHiddenFooter: route.path.match('.*(requested|cooltime).*')
  })
  useHead({
    style: [{ children: 'body{margin: 0}' }]
  })
</script>

<style scoped lang="scss">
</style>
