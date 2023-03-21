<template>
  <footer>
    <KansaiMentors />
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  footer {
    width: 100vw;
    height: 70px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    background: $gradient-orange;
    @include tablet() {
      height: 100px;
    }
  }
</style>
