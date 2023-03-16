<template>
  <div class="cooltime">
    <p>次のリクエストまでちょっと待ってね！</p>
    <strong>{{ state.displayTimer.min }}:{{ state.displayTimer.sec }}</strong>
  </div>
</template>
<script setup lang="ts">
  import { useRequestTimer } from '@/features'
  const timer = useRequestTimer()
  const state = reactive({
    displayTimer: {
      min: '00',
      sec: '00'
    }
  })

  onMounted(() => {
    const countdown = () => {
      const time = timer.waitingTime()
      state.displayTimer.min = ('00' + Math.floor(time / 60) % 60).slice(-2)
      state.displayTimer.sec = ('00' + timer.waitingTime() % 60).slice(-2)
    }
    setInterval(countdown, 1000)
  })
</script>
<style scoped lang="scss">
.cooltime {
  width: calc(100vw - 160px);
  height: calc(100vh - 250px);
  background: $gradient-orange;
  padding: 60px 80px 100px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  p {
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: $text-color-white
  }
  strong {
    font-weight: 500;
    font-size: 64px;
    line-height: 61px;
    background-color: $background-color;
    box-shadow: 0px 3px 6px $shadow-color;
    padding: 40px 60px;
    border-radius: 10px;
  }
}
</style>
