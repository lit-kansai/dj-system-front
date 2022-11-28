<template>
  <div class="create">
    <p class="text-h5 mb-1 font-weight-black mb-8">ルームを作成する</p>
    <v-text-field
      label="ルームネーム*"
      variant="outlined"
      required
    ></v-text-field>
    <v-text-field label="ルーム説明" variant="outlined"></v-text-field>
    <v-select
      label="外部サービス"
      variant="outlined"
      :items="['Spotify', 'AppleMusic']"
    ></v-select>
    <v-text-field
      label="リクエストURL*"
      variant="outlined"
      required
    ></v-text-field>
    <v-row class="ma-0 justify-end">
      <v-btn class="justify-end" color="blue-darken-3">ルームを作成する</v-btn>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .create {
    max-width: 500px;
  }
</style>
