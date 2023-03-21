<template>
  <div>
    <router-view />
    <RoomFooter v-if="state.isHiddenFooter" class="footer" />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const state = reactive({
    isShowHeaderSearch: false,
    isHiddenFooter: false
  })

  useHead({
    style: [{ children: 'html{height: 100%} body{margin: 0; min-height: 100%;}' }]
  })

  onMounted(() => {
    if (!route.path.match('.*(requested|cooltime).*')) {
      state.isShowHeaderSearch = true
      state.isHiddenFooter = true
    }
  })
</script>

<style scoped lang="scss">
  div {
    min-height: calc(100vh - $footer-height);
  }
  .footer {
    position: sticky;
    top: 100vh;
  }
</style>
