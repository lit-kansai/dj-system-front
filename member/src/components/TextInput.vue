<template>
  <input class="search" type="text" placeholder="Search" autocomplete="on">
</template>
<script setup lang="ts">
</script>
<style lang="scss">
  .search {
    display: block;
    background: $background-color-textfield;
    color: $text-color-black;
    border: 0;
    padding: 10px 32px 10px 32px;
    font-size: 20px;
    border-radius: 34px;
    &::placeholder {
      color: $text-color-placeholder;
    }
  }
</style>
