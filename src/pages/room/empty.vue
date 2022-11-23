<template>
  <div class="v-container h-full">
    <div class="d-flex flex-column justify-center align-center">
      <v-icon size="180" class="mb-4">mdi-rocket</v-icon>
      <p class="text-h5 mb-1 font-weight-black">まだルームがありません</p>
      <p class="mb-3">
        外部サービス（AppleMusic /
        Spotify）を接続した後に、ルームを作成しましょう。
      </p>
      <v-btn color="blue-darken-3" elevation="2">ルームを追加する</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({})
</script>

<style lang="scss" scoped></style>
