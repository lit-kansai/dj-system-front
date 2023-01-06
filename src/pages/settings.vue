<template>
  <div>
    <p class="text-h5 text-weight-bold q-mb-xs">
      外部サービス連携
    </p>
    <p class="q-mb-lg">
      AppleMusicやSpotifyとサービス連携を行うことで、リクエストされた曲が自動でプレイリストに追加されるようになります。
    </p>
    <p class="text-h6 text-weight-bold q-mb-xs">
      Apple Music
    </p>
    <p class="q-mb-sm">
      AppleMusicのサブスクへの登録が必要になります。
    </p>
    <q-btn v-if="!linkedProviders.applemusic" color="primary" class="q-mb-lg" no-caps label="AppleMusicにログイン" />
    <q-btn
      v-else
      color="grey-4"
      text-color="dark"
      icon="link"
      class="q-mb-lg"
      no-caps
      disable
      label="AppleMusicと連携済み"
    />

    <p class="text-h6 text-weight-bold q-mb-xs">
      Spotify
    </p>
    <p class="q-mb-sm">
      APIの利用制限のため、選ばれし25名のみが使用できます。がっしーにご連絡ください。
    </p>
    <q-btn v-if="!linkedProviders.spotify" color="primary" class="q-mb-lg" no-caps label="Spotifyにログイン" />
    <q-btn
      v-else
      color="grey-4"
      text-color="dark"
      icon="link"
      class="q-mb-lg"
      no-caps
      disable
      label="Spotifyと連携済み"
    />
  </div>
</template>

<script setup lang="ts">
  const linkedProviders = reactive({
    applemusic: false,
    spotify: true
  })
</script>
