<template>
  <div class="cooltime">
    <p>次のリクエストまでちょっと待ってね！</p>
    <strong>05:00</strong>
  </div>
</template>
<script setup lang="ts">
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
