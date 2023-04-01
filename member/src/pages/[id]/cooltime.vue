<template>
  <div>
    <RoomHeader :is-show-search="false" />
    <div class="cooltime">
      <h2>次のリクエストまでちょっと待ってね！</h2>
      <strong>{{ state.displayTimer.min }}:{{ state.displayTimer.sec }}</strong>
    </div>
    <div class="mentors">
      <KansaiMentors />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCooltime, useRequestTimer, useRoomState } from '@/features'
  const { isAllowRequestMusic, removeExpiredCooltime, intervalTime } = useRequestTimer()
  const route = useRoute()
  const { currentRoom } = useRoomState()
  const { cooltime } = useCooltime()
  const state = reactive({
    displayTimer: {
      min: cooltime.value?.min ?? '00',
      sec: cooltime.value?.sec ?? '00'
    }
  })

  definePageMeta({
    layout: 'plain',
    middleware: ['cooltime']
  })

  useHead({
    title: `${currentRoom.value?.name ?? ''}`,
    meta: [
      { property: 'og:title', content: `${currentRoom.value?.name ?? ''} | DJ Gassi System` },
    ]
  })

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
    setInterval(countdown, 1000)
  })
</script>

<style scoped lang="scss">
  .cooltime {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100dvh;
    padding-top: 30px;
    background: $color-gradient-orange;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @include pc() {
      padding-bottom: 10px;
      gap: 40px;
    }
    h2 {
      color: $color-white;
      text-align: center;
    }
    strong {
      font-weight: 500;
      font-size: 64px;
      line-height: 61px;
      background-color: $background-color;
      box-shadow: 0px 3px 6px $color-shadow;
      padding: 40px 60px;
      border-radius: 10px;
    }
  }
  .mentors {
    width: 100vw;
    position: fixed;
    bottom: 10px;
    display: flex;
    justify-content: center;
  }
</style>
