<template>
  <footer>
    <KansaiMentors />
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  footer {
    width: 100vw;
    height: $footer-height;
    display: flex !important;
    justify-content: center;
    align-items: center;
    background: $color-gradient-orange;
    @include tablet() {
      height: $tablet-footer-height;
    }
  }
</style>
