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
      <div v-for="v in emptyCount" :key="v" class="empty" />
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
  const emptyCount = ref([0])

  interface Props {
    musics: Track[],
  }
  const props = withDefaults(defineProps<Props>(), {
    musics: () => []
  })

  onMounted(() => {
    updateEmpty()
    window.addEventListener('resize', () => {
      updateEmpty()
    })
  })

  const updateEmpty = () => {
    const width = window.innerWidth
    let count
    if (width / 277 >= 4) {
      count = props.musics.length % 4
    } else {
      count = props.musics.length % 3
    }
    emptyCount.value = [...Array(count)].map((_, i) => i)
  }
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
    .empty {
      width: 270px;
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
