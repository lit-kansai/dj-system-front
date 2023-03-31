<template>
  <div>
    <RoomHeader :is-show-search="false" />
    <div class="requested">
      <div class="wrapper">
        <div class="container">
          <img src="~/assets/img/requested-orange.svg">
          <div class="message">
            <h1>送信完了</h1>
            <h2>リクエストしてくれてありがとう！</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useRequestTimer, useRoomState } from '@/features'
  const { isAllowRequestMusic, intervalTime } = useRequestTimer()
  const { currentRoom } = useRoomState()
  const route = useRoute()
  const state = reactive({
    displayTimer: {
      min: '00',
      sec: '00'
    }
  })

  definePageMeta({
    layout: 'plain'
  })

  useHead({
    title: `${currentRoom.value?.name ?? ''}`,
    meta: [
      { property: 'og:title', content: `${currentRoom.value?.name ?? ''} | DJ Gassi System` },
    ]
  })
  let countdownTimer: NodeJS.Timer
  let redirectTimer: NodeJS.Timer

  onMounted(() => {
    const countdown = () => {
      const time = intervalTime()
      state.displayTimer.min = time.min
      state.displayTimer.sec = time.sec
      if (isAllowRequestMusic()) {
        removeExpiredCooltime()
        navigateTo(`/${route.params.id}`)
      }
    }
    countdownTimer = setInterval(countdown, 1000)

    const redirectCooltime = () => {
      navigateTo(`/${route.params.id}/cooltime`)
    }
    redirectTimer = setTimeout(redirectCooltime, 1000 * 60)
  })

  onUnmounted(() => {
    clearInterval(countdownTimer)
    clearTimeout(redirectTimer)
  })
</script>

<style scoped lang="scss">
  .requested {
    width: 100vw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include pc() {
      background: $color-gradient-orange;
    }
    .container {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
      @include pc() {
        padding: 85px 80px;
        gap: 40px;
        flex-direction: row;
        border-radius: 25px;
        background-color: $background-color;
      }
      img {
        width: 190px;
        height: 190px;
        object-fit: cover;
        @include pc() {
          width: 300px;
          height: 300px;
          margin: 30px 0 15px 0;
        }
      }
      .message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        @include pc() {
          gap: 20px;
        }
        h2 {
          text-align: center;
        }
      }
    }
  }
</style>
