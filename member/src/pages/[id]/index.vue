<template>
  <div class="wrapper">
    <div class="header">
      <div class="contents">
        <h1>DJ Gassi</h1>
        <p>自分の好きな曲をリクエストしよう！</p>
        <GradationSearchTextInput />
      </div>
      <img src="~/assets/img/logo.svg">
    </div>
    <MusicList :musics="musics" />
  </div>
</template>

<script setup lang="ts">
  import { Track } from '@dj-system/api-client/src/generated/@types'
  import { music } from '@/features'
  import { GetTop50MusicsInput } from '@/features/music/api'
  const route = useRoute()

  const musics = ref<Track[]>([])

  const fetchTop50Musics = async () => {
    const requestInput: GetTop50MusicsInput = {
      roomId: `${route.params.id}`,
    }
    const result = await music.api.getTop50Musics(requestInput)
    await result.execute()
    musics.value = result.data.value ?? []
  }

  onMounted(async () => {
    await fetchTop50Musics()
  })
</script>

<style scoped lang="scss">
  .wrapper {  margin: 0 auto;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 130px 0;
      .contents {
        h1 {
          font-weight: 600;
          font-size: 80px;
          line-height: 115px;
          padding-bottom: 10px;
        }
        p {
          font-weight: 700;
          font-size: 23.5px;
          line-height: 35px;
          color: $text-color-gray;
          padding-bottom: 40px;
        }
      }
    }
    .top-musics {
      .music-cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 60px 15px;
        margin-bottom: 110px;
      }
    }
}
</style>
