<template>
  <div class="wrapper">
    <div v-if="state.loading">loading</div>
  </div>
</template>

<script setup lang="ts">
  import { SearchMusicResponse } from '@/features/music/api'

  const musicInit: SearchMusicResponse = []
  const state = reactive({
    loading: true,
    musics: musicInit,
  })
</script>
