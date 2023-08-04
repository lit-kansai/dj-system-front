<template>
  <p class="retry-dialog">
    {{ retryMessage }}
  </p>
</template>

<script setup lang="ts">
  const retryMessageBase = 'リクエストをリトライしています'
  const currentRetryIndex = ref(0)
  let intervalId: null | NodeJS.Timer = null

  const retryMessage = computed(() => {
    const suffix = '.'.repeat(currentRetryIndex.value)
    return `${retryMessageBase}${suffix}`
  })

  onMounted(() => {
    intervalId = setInterval(() => {
      currentRetryIndex.value = (currentRetryIndex.value + 1) % 4
    }, 1000) // 1秒ごとに更新
  })

  onBeforeUnmount(() => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  })
</script>

<style scoped lang="scss">
  .retry-dialog {
    font-weight: bold;
  }
</style>
