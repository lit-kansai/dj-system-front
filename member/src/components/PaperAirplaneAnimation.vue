<template>
  <div>
    <img class="circle" src="~/assets/img/OrengeGradationCircle.svg">
    <img class="airplane" src="~/assets/img/AirPlane.svg">
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  div {
    width: 55px;
    height: 55px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    .circle {
      width: 55px;
      height: 55px;
      position: absolute;
      top: 0px;
      left: 0px;
    }
    .airplane {
      position: absolute;
      top: -30px;
      left: 28px;
      animation-name: take-off;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }
  }

  @keyframes take-off {
    0% {
      transform: translate(-90px, 90px);
    }
    40%, 60% {
      transform: translate(-48px, 48px);
    }
  }
</style>
