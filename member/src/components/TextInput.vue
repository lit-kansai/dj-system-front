<template>
  <input class="search" type="text" placeholder="曲名・アーティスト名で検索" autocomplete="on">
</template>
<script setup lang="ts">
</script>
<style lang="scss">
  .search {
    display: block;
    width: 350px;
    height: 20px;
    background: $background-color-textfield;
    color: $text-color-black;
    border: none;
    padding: 15px 40px;
    border-radius: 34px;
    &::placeholder {
      color: $text-color-placeholder;
    }
  }
</style>
