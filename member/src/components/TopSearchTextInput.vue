<template>
  <div>
    <input
      class="search"
      type="text"
      placeholder="曲名・アーティスト名で検索"
      autocomplete="on"
    >
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">
  input {
    box-sizing: content-box;
    display: block;
    width: 330px;
    height: 20px;
    background: $gradient-orange;
    color: $text-color-white;
    font-weight: 400px;
    border: none;
    padding: 16px 40px 14px 55px;
    border-radius: 34px;
    &::placeholder {
      font-weight: 400px;
      color: $text-color-white;
    }
  }
  div {
    position: relative;
    &::before {
      content: "";
      background-color: $text-color-white;
      mask: url(~/assets/img/search.svg);
      position: absolute;
      top: 15px;
      left: 25px;
      display: inline-block;
      width: 20px;
      height: 20px;
      z-index: 900;
    }
  }
</style>
