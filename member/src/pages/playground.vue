<template>
  <div>
    {{ JSON.stringify(retryStatus) }}
    isRetrying: {{ isRetrying() }}
    <MusicLoading v-if="loading" />
    <button @click="getTop50Musics()">
      occur timeout error
    </button>
    <button @click="getRoomOverview()">
      occur 404 not found
    </button>
  </div>
</template>

<script setup lang="ts">
  import { music, room } from '@/features'
  import { showErrorByErrorType } from '@/libs'
  const { retryStatus, isRetrying } = useRetryStatus()
  const loading = ref(false)
  const getTop50Musics = async () => {
    loading.value = true
    const startTime = performance.now()
    const roomId = 'hoge'
    const { _, error, execute } = await music.api.getTop50Musics({ roomId })
    await execute()
    if (error.value) {
      showErrorByErrorType(error.value)
    }
    const endTime = performance.now()
    loading.value = false
    console.log(endTime - startTime)
  }

  const getRoomOverview = async () => {
    loading.value = true
    const startTime = performance.now()
    const roomId = 'hoge'
    const { _, error, execute } = await room.api.getRoomOverview({ roomId })
    await execute()
    console.log(error.value)
    if (error.value) {
      showErrorByErrorType(error.value)
    }
    const endTime = performance.now()
    loading.value = false
    console.log(endTime - startTime)
  }
  onMounted(async () => {
  })
</script>
