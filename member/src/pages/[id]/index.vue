<template>
  <div>
    <RoomHeader class="pc-header" :is-show-search="true" :search-bar-autofocus="false" />
    <main class="wrapper">
      <div class="pc-header">
        <div class="container">
          <div class="contents">
            <h1>{{ currentRoom?.name ?? '' }}</h1>
            <p>自分の好きな曲をリクエストしよう！</p>
            <SearchTextInput :is-gradient="true" data-test-id="music-search-text-input" />
          </div>
          <img src="~/assets/img/new-logo.png">
        </div>
      </div>
      <div class="mobile-header">
        <img src="~/assets/img/new-logo.png">
        <h1>{{ currentRoom?.name ?? '' }}</h1>
        <SearchTextInput :is-gradient="true" />
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
    const { setRequestMusicLoading } = useRequestMusicLoading()
    const roomId: string = String(route.params.id)
    const requestMusicInput: RequestMusicInput = {
      roomId,
      musics: [musicId],
      radioName,
      message
    }

    const result = music.api.requestMusic(requestMusicInput)
    setRequestMusicLoading(true)
    await result.execute()
    if (result.data.value) {
      requestTimer.requestMusic()
      const { setHasMusicRequested } = useHasMusicRequested()
      setHasMusicRequested(true)
      await navigateTo(`/${roomId}/requested`)
    } else {
      alert(result.error.value)
    }
    setRequestMusicLoading(false)
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
      margin-bottom: 5px;
    }
    p {
      font-weight: 400;
      font-size: 13px;
      color: $color-gray;
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
          padding-bottom: 10px;
        }
        p {
          font-weight: 700;
          font-size: 23.5px;
          line-height: 35px;
          color: $color-gray;
          padding-bottom: 40px;
        }
      }
      img {
        width: 300px;
        height: 300px;
      }
    }
  }
</style>
