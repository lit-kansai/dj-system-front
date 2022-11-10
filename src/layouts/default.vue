<template>
  <main id="app-layout">
    <slot />
  </main>
</template>
<script setup lang="ts"></script>
<style scoped>
  #app-layout {
    height: 100vh;
    min-height: 100vh;
  }
</style>
