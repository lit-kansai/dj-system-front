<!-- TODO: モーダルの中身DIできるようにしたい；； -->
<template>
  <div class="container">
    <div class="loading">
      <img src="/img/headphone.svg" />
      <div class="wave">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
    <div class="retry-dialog">
      <RetryDialog v-if="isRetrying()" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { isRetrying } = useRetryStatus()
</script>

<style scoped lang="scss">
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .loading {
    position: relative;
    width: 100px;
    height: 100px;
    img {
      width: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .wave {
      position: absolute;
      top: 70%;
      left: calc(50% + 2.5px);
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;

      span{
        height: 15px;
        width: 4px;
        margin-right: 5px;
        background: $color-gradient-orange;
        animation: loading 1s linear infinite;
      }
      span:nth-child(1){
        animation-delay: 0.1s;
      }
      span:nth-child(2){
        animation-delay: 0.2s;
      }
      span:nth-child(3){
        animation-delay: 0.3s;
      }
      span:nth-child(4){
        animation-delay: 0.4s;
      }
      span:nth-child(5){
        animation-delay: 0.5s;
      }
    }
  }
  .retry-dialog {
    height: 54px;
    margin-top: 16px;
  }

  // @keyframes for animation
  @keyframes loading {
    0%{
      height: 0;
    }
    25%{
      height: 20px;
    }
    50%{
      height: 50px;
    }
    100%{
      height: 0;
    }
  }
</style>
