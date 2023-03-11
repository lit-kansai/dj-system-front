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
      AppleMusicのサブスクへの登録が必要になります。(近日実装予定です！)
    </p>
    <!-- <q-btn v-if="!state.provider.applemusic" color="primary" class="q-mb-lg" no-caps label="AppleMusicにログイン" /> -->
    <!-- <q-btn -->
    <!--   v-else -->
    <!--   color="grey-4" -->
    <!--   text-color="dark" -->
    <!--   icon="link" -->
    <!--   class="q-mb-lg" -->
    <!--   no-caps -->
    <!--   disable -->
    <!--   label="AppleMusicと連携済み" -->
    <!-- /> -->

    <p class="text-h6 text-weight-bold q-mb-xs">
      Spotify
    </p>
    <p class="q-mb-sm">
      APIの利用制限のため、選ばれし25名のみが使用できます。がっしーにご連絡ください。
    </p>
    <div v-if="state.loading">
      <q-circular-progress
        indeterminate
        rounded
        size="25px"
        color="teal"
      />
    </div>
    <div v-else>
      <q-btn
        v-if="!state.provider.spotify"
        color="primary"
        class="q-mb-lg"
        no-caps
        label="Spotifyにログイン"
        @click="onClickSpotifyButton"
      />
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
  </div>
</template>

<script setup lang="ts">
  import { auth } from '@/features'

  const state = reactive({
    loading: false,
    provider: {
      applemusic: false,
      spotify: false
    }
  })
  onMounted(async () => {
    state.loading = true
    const { data } = await auth.api.getUserProvider()
    data.value?.forEach((service) => {
      switch (service.provider) {
      case 'spotify':
        state.provider.spotify = service.isConnected
        break
      case 'applemusic':
        state.provider.applemusic = service.isConnected
        break
      }
    })
    state.loading = false
  })

  const onClickSpotifyButton = async () => {
    const { data } = await auth.api.getSpotifyOAuthUrl()
    if (!data.value) { return }
    window.location.assign(data.value.redirectUrl)
  }
</script>