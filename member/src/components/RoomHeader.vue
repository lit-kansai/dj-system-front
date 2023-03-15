<template>
  <nav>
    <div class="container wrapper">
      <div class="logo">
        <img src="~/assets/img/logo.svg">
        <p class="room_name">ルーム名</p>
      </div>
      <NavSearchTextInput />
    </div>
  </nav>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
  nav {
    width: 100%;
    height: 90px;
    background-color: $background-color-white;
    box-shadow: 0px 3px 6px $shadow-color;
    position: sticky;
    top: 0;

    .container{
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo, p {
      display: inline;
    }

    .logo{
      display: flex;
      align-items: center;
      gap: 10px;
      color: $text-color-gray;

      img {
        height: 36px;
      }

      p {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
</style>
