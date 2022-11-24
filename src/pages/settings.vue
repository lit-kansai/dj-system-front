<template>
  <div>
    <div id="setting-main" class="mt-16">
      <p class="text-h5 mb-1 font-weight-black">外部サービス連携</p>
      <p class="mb-10">
        AppleMusicやSpotifyとサービス連携を行うことで、リクエストされた曲が自動でプレイリストに追加されるようになります。
      </p>
      <p class="font-weight-black text-h6 mb-1">Apple Music</p>
      <p class="mb-2">AppleMusicのサブスクへの登録が必要になります。</p>
      <v-btn
        id="apple-login-button"
        color="blue-darken-3"
        class="py-2 px-4 mb-10 text-none"
        >AppleMusicにログイン</v-btn
      >
      <p class="font-weight-black text-h6 mb-1">Spotify</p>
      <p class="mb-2">
        APIの利用制限のため、選ばれし25名のみが使用できます。がっしーにご連絡ください。
      </p>
      <v-btn
        id="spotify-login-button"
        color="blue-darken-3"
        class="py-2 px-4 text-none"
        >Spotifyにログイン</v-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
  #setting-main {
    margin-left: 104px;
  }
</style>
