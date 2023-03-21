<template>
  <div>
    <RoomHeader :is-show-search="false" />
    <div class="requested">
      <div class="alert">
        <img src="~/assets/img/requested-orange.svg">
        <div class="message">
          <p>送信完了</p>
          <div class="timer">
            <p>次のリクエストまで</p>
            <strong>{{ state.displayTimer.min }}:{{ state.displayTimer.sec }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useRequestTimer } from '@/features'
  const requestTimer = useRequestTimer()
  const route = useRoute()
  const state = reactive({
    displayTimer: {
      min: '00',
      sec: '00'
    }
  })
  let timer: NodeJS.Timer

  onMounted(() => {
    const countdown = () => {
      const time = requestTimer.waitingTime()
      state.displayTimer.min = time.min
      state.displayTimer.sec = time.sec
    }
    timer = setInterval(countdown, 1000)

    if (window.performance && route.params.id) {
      if (window.performance.navigation.type === 1) {
        navigateTo(`/${route.params.id}/cooltime`)
      }
    }
  })

  onUnmounted(() => {
    clearInterval(timer)
  })
</script>
<style scoped lang="scss">
.requested {
  width: 100vw;
  height: calc(100vh - $app-bar-height);
  background: $gradient-orange;
  padding: 60px 80px 100px 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert {
    display: flex;
    align-items: center;
    gap: 80px;
    max-width: 1200px;
    padding: 85px 110px;
    background-color: $background-color;
    border-radius: 25px;

    img {
      width: 350px;
      height: 350px;
      object-fit: cover;
    }
  }
  .message {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    p {
      font-weight: 700;
      font-size: 72px;
      line-height: 87px;
      letter-spacing: 0.05em;
    }
    .timer {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        font-size: 24px;
        line-height: 29px;
      }
      strong {
        font-weight: 500;
        font-size: 64px;
      }
    }
  }
}
</style>
