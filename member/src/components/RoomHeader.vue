<template>
  <div class="wrapper">
    <img width="60px" src="img/logo.svg">
    <p class="room_name">ルーム名</p>
    <TextInput />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
  .wrapper {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 16px 48px 16px 48px;
    box-shadow: 0px 3px 6px $shadow-color;
    background: #ffffff;
    .room_name {
      font-size: 20px;
      color: $text-color-gray;
      margin-left: 16px;
      flex-grow: 1;
    }
  }
</style>
