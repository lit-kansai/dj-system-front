<template>
  <div>
    <div class="music-cards">
      <MusicCard
        v-for="music in musics"
        :id="music.id"
        :key="music.id"
        :thumbnail="music.thumbnail"
        :name="music.name"
        :artists="music.artists"
      />
    </div>
    <div class="music-cells">
      <MusicCell
        v-for="music in musics"
        :id="music.id"
        :key="music.id"
        :thumbnail="music.thumbnail"
        :name="music.name"
        :artists="music.artists"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Track } from '@dj-system/api-client/src/generated/@types'

  interface Props {
    musics: Track[],
  }
  withDefaults(defineProps<Props>(), {
    musics: () => []
  })
</script>

<style scoped lang="scss">
  .music-cards {
    display: none;
    @include pc() {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 60px 15px;
      margin: 110px auto;
    }
  }
  .music-cells {
    margin: 18px 0 40px 0;
    display: flex;
    flex-direction: column;
    @include pc() {
      display: none;
    }
    div + div {
      border-top: 1px solid $color-light-gray;
    }
  }
</style>
