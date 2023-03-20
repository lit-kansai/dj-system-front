<template>
  <div>
    <room-header :is-show-search="state.header.isShowSearch" />
    <router-view />
    <room-footer v-if="!state.isHiddenFooter" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const state = reactive({
    header: {
      isShowSearch: false,
    },
    isHiddenFooter: false
  })
  useHead({
    style: [{ children: 'body{margin: 0}' }]
  })

  onMounted(() => {
    if (!route.path.match('.*(requested|cooltime).*')) {
      state.header.isShowSearch = true
      state.isHiddenFooter = true
    }
  })
</script>

<style scoped lang="scss">
</style>
