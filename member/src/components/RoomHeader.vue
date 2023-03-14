<template>
  <div class="wrapper">
    <div class="container">
      <div class="logo">
        <img height="36px" src="img/logo.svg">
        <p class="room_name">ルーム名</p>
      </div>
      <TextInput />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
  .wrapper {
    width: 100%;
    height: 90px;
    background-color: $background-color-white;
    box-shadow: 0px 3px 6px $shadow-color;

    .container{
      max-width: 1400px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 55px;
    }

    .logo, p {
      display: inline;
    }

    .logo{
      display: flex;
      align-items: center;
      gap: 10px;
      color: $text-color-gray;

      p {
        font-weight: 400;
        font-size: 21px;
        line-height: 25px;
      }
    }
  }
</style>
