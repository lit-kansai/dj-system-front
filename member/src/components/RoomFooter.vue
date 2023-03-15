<template>
  <footer>
    <img width="60px" src="~/assets/img/kansai-logo-white.svg">
    <p>&copy; Life is Tech! Kansai Mentors</p>
  </footer>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $gradient-orange;
    padding: 32px 0;
    p {
      font-size: 20px;
      color: $text-color-white;
      margin-left: 16px;
      vertical-align: middle;
    }
  }
</style>
