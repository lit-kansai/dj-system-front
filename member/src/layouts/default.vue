<template>
  <div>
    <router-view />
    <RoomFooter v-if="state.isHiddenFooter" class="footer" />
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()
  const state = reactive({
    isHiddenFooter: false
  })

  useHead({
    style: [{ children: 'html{height: 100%} body{margin: 0; min-height: 100%;}' }]
  })

  const updateHiddenFooter = () => {
    const path = router.currentRoute.value.path
    if (!path.match('.*(requested|cooltime).*')) {
      state.isHiddenFooter = true
    }
  }

  onMounted(() => {
    updateHiddenFooter()
  })

  onBeforeUpdate(() => {
    updateHiddenFooter()
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
