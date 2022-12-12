<template>
  <div>
    <div class="q-mb-lg">
      <div class="row justify-between items-center q-mb-md">
        <div>
          <p class="text-h5 text-weight-bold q-mb-xs">ディジェクマクン</p>
          <p class="q-mb-none">Life is Tech! Summer Camp 2022 関西大学D日程</p>
        </div>
        <q-btn color="primary" label="ルームを編集する" />
      </div>
      <div class="row q-mb-xs">
        <v-icon icon="mdi-link" class="q-mr-xs" />
        <p class="q-mb-none">
          リクエストURL:
          <a :href="requestUrl" target="_blank">{{ requestUrl }}</a>
        </p>
      </div>
      <div class="row">
        <v-icon icon="mdi-spotify" class="q-mr-xs" />
        <p class="q-mb-none">
          プレイリスト:
          <a :href="playlistUrl" target="_blank">{{ playlistUrl }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const requestUrl = 'https://dj.life-is-tech.com/room/test'
  const playlistUrl = 'https://open.spotify.com/playlist/396TkvvmaW0EesHOfCr32U'
</script>

<style scoped></style>
