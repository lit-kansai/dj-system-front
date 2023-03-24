<template>
  <div>
    <RoomHeader :is-show-search="false" />
    <div class="requested">
      <div class="wrapper">
        <img src="~/assets/img/requested-orange.svg">
        <div class="message">
          <h1>送信完了</h1>
          <p>次のリクエストまでちょっと待ってね！</p>
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

  onMounted(() => {
    const countdown = () => {
      const time = intervalTime()
      state.displayTimer.min = time.min
      state.displayTimer.sec = time.sec
      if (isAllowRequestMusic()) {
        removeExpiredCooltime()
        navigateTo(`/${route.params.id}`)
    timer = setInterval(countdown, 1000)
  })
</script>
<style scoped lang="scss">
  .requested {
    width: 100vw;
    height: calc(100vh - $app-bar-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - $app-bar-height);
    @include pc() {
      background: $gradient-orange;
    }
    .wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
      @include pc() {
        padding: 85px 110px;
        gap: 60px;
        flex-direction: row;
        border-radius: 25px;
        background-color: $background-color;
      }
      img {
        width: 190px;
        height: 190px;
        object-fit: cover;
        @include pc() {
          width: 350px;
          height: 350px;
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
        h1 {
          font-weight: 700;
          font-size: 40px;
          line-height: 58px;
          @include pc() {
            font-size: 72px;
            line-height: 87px;
          }
        }
        p {
          font-size: 16px;
          line-height: 19px;
          text-align: center;
          @include pc() {
            font-size: 24px;
            line-height: 29px;
          }
        }
      }
    }
  }
</style>
