<template>
  <div>
    <room-header :is-show-search="state.isShowHeaderSearch" />
    <router-view />
    <room-footer v-if="state.isHiddenFooter" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const state = reactive({
    isShowHeaderSearch: false,
    isHiddenFooter: false
  })
  useHead({
    style: [{ children: 'body{margin: 0}' }]
  })

  onMounted(() => {
    if (!route.path.match('.*(requested|cooltime).*')) {
      state.isShowHeaderSearch = true
      state.isHiddenFooter = true
    }
  })
</script>

<style scoped lang="scss">
</style>
