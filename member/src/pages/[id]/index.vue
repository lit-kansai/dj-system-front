<template>
  <div>
    <RoomHeader class="pc-header" :is-show-search="true" />
    <main class="wrapper">
      <div class="pc-header">
        <div class="container">
          <div class="contents">
            <h1>{{ currentRoom?.name ?? '' }}</h1>
            <p>自分の好きな曲をリクエストしよう！</p>
            <GradationSearchTextInput />
          </div>
          <img src="~/assets/img/logo.svg">
        </div>
      </div>
      <div class="mobile-header">
        <img src="~/assets/img/logo.svg">
        <h1>{{ currentRoom?.name ?? '' }}</h1>
        <GradationSearchTextInput />
      </div>
      <div class="music-list">
        <h2>人気の曲</h2>
        <p>気になる曲を選択してみよう！</p>
        <MusicList :musics="musics" :on-click-submit-button="requestMusic" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { Track } from '@dj-system/api-client/src/generated/@types'
  import { music, useHasMusicRequested, useRequestTimer, useRoomState } from '@/features'
  import { GetTop50MusicsInput, RequestMusicInput } from '@/features/music/api'
  const route = useRoute()
  const requestTimer = useRequestTimer()
  const { currentRoom } = useRoomState()

  const musics = ref<Track[]>([])

  useHead({
    title: `${currentRoom.value?.name ?? ''}`,
    meta: [
      { property: 'og:title', content: `${currentRoom.value?.name ?? ''} | DJ Gassi System` },
    ]
  })

  const fetchTop50Musics = async () => {
    const requestInput: GetTop50MusicsInput = {
      roomId: `${route.params.id}`,
    }
    const result = await music.api.getTop50Musics(requestInput)
    await result.execute()
    musics.value = result.data.value ?? []
  }

  const requestMusic = async (musicId: string, radioName: string, message: string) => {
    const roomId: string = String(route.params.id)
    const requestMusicInput: RequestMusicInput = {
      roomId,
      musics: [musicId],
      radioName,
      message
    }

    const result = music.api.requestMusic(requestMusicInput)
    await result.execute()
    if (result.data.value) {
      requestTimer.requestMusic()
      const { setHasMusicRequested } = useHasMusicRequested()
      setHasMusicRequested(true)
      await navigateTo(`/${roomId}/requested`)
    } else {
      alert(result.error.value)
    }
  }

  onMounted(async () => {
    await fetchTop50Musics()
  })
</script>

<style scoped lang="scss">
  .pc-header {
    display: none;
    @include pc() {
      display: block;
    }
  }
  .mobile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 $padding-wrapper;
    img {
      margin-top: 80px;
      width: 200px;
      height: 200px;
      object-fit: contain;
    }
    h1 {
      margin: 30px 0;
      font-weight: 700;
      font-size: 21px;
      line-height: 30px;
    }
    @include pc() {
      display: none;
    }
  }
  .music-list {
    margin-top: 50px;
    @include pc() {
      margin: 150px auto 110px auto;
    }
    h2 {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 5px;
      @include pc() {
        font-size: 32px;
        line-height: 46px;
      }
    }
    p {
      font-weight: 400;
      font-size: 13px;
      color: $text-color-gray;
      margin-bottom: 20px;
      @include pc() {
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 30px;
      }
    }
  }
  .wrapper {
    .container {
      display: flex;
      justify-content: space-between;
      margin: 130px 0;
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
  }
</style>
