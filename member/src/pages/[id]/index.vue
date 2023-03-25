<template>
  <div>
    <RoomHeader class="pc-only" :is-show-search="true" />
    <main class="wrapper">
      <div class="pc-only">
        <div class="container">
          <div class="contents">
            <h1>{{ currentRoom?.name ?? '' }}</h1>
            <h3>自分の好きな曲をリクエストしよう！</h3>
            <GradationSearchTextInput />
          </div>
          <img src="~/assets/img/logo.svg">
        </div>
      </div>
      <div class="mobile-only">
        <img src="~/assets/img/logo.svg">
        <h1>{{ currentRoom?.name ?? '' }}</h1>
        <GradationSearchTextInput />
      </div>
      <div class="music-list">
        <h2>人気の曲</h2>
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
  .pc-only {
    display: none;
    @include pc() {
      display: block;
    }
    .container {
      display: flex;
      justify-content: space-between;
      margin: 130px 0;
      .contents {
        h3 {
          margin: 15px 0 40px 0;
          color: $text-color-gray;
        }
      }
    }
  }
  .mobile-only {
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
      margin: 110px auto;
    }
    h2 {
      margin-bottom: 30px;
    }
  }
</style>
