<template>
  <div>
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
  }
  span{
    height: 30px;
    width: 7px;
    margin-right: 10px;
    background: $gradient-orange;
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
  // @keyframes for animation
  @keyframes loading {
    0%{
      height: 0;
    }
    25%{
      height: 25px;
    }
    50%{
      height: 70px;
    }
    100%{
      height: 0;
    }
  }
</style>
