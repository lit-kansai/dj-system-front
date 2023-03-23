<template>
  <div>
    <RoomHeader :is-show-search="false" />
    <div class="mobile-requested">
      <img src="~/assets/img/requested-orange.svg">
      <h1>送信完了</h1>
      <div class="timer-modal">
        <p>次のリクエストまで</p>
        <strong>{{ state.displayTimer.min }}:{{ state.displayTimer.sec }}</strong>
      </div>
    </div>
    <div class="pc-requested">
      <div class="alert wrapper">
        <img src="~/assets/img/requested-orange.svg">
        <div class="message">
          <h1>送信完了</h1>
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
  const { isAllowRequestMusic, intervalTime } = useRequestTimer()
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
      const time = intervalTime()
      state.displayTimer.min = time.min
      state.displayTimer.sec = time.sec
      if (isAllowRequestMusic()) {
        removeExpiredCooltime()
        navigateTo(`/${route.params.id}`)
      }
    }
    timer = setInterval(countdown, 1000)

    // if (window.performance && route.params.id) {
    //   if (window.performance.navigation.type === 1) {
    //     navigateTo(`/${route.params.id}/cooltime`)
    //   }
    // }
  })

  onUnmounted(() => {
    clearInterval(timer)
  })
</script>
<style scoped lang="scss">
.mobile-requested {
  height: calc(100vh - $app-bar-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @include pc() {
    display: none;
  }
  img {
    width: 190px;
    height: 190px;
    object-fit: contain;
    margin: 30px 0 15px 0;
  }
  h1 {
    font-weight: 700;
    font-size: 40px;
    line-height: 58px;
    margin-bottom: 20px;
  }
  .timer-modal {
    width: 100vw;
    position: absolute;
    bottom: -5px;
    box-shadow: 2px 2px 22px rgba(0, 0, 0, 0.2);
    border-radius: 10px 10px 0 0;
    text-align: center;
    padding: 40px 0;
    p {
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 10px;
    }
    strong {
      font-family: $english-font;
      font-weight: 700;
      font-size: 64px;
      line-height: 64px;
    }
  }
}
.pc-requested {
  display: none;
  @include pc() {
    display: flex;
  }
  width: 100vw;
  height: calc(100vh - $app-bar-height);
  background: $gradient-orange;
  padding: 60px 80px 100px 80px;
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
    h1 {
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
