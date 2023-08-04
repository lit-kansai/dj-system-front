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
        v-if="!state.provider.applemusic"
        color="primary"
        class="q-mb-lg"
        no-caps
        label="AppleMusicにログイン"
        @click="onClickAppleMusicButton"
      />
      <q-btn
        v-else
        color="grey-4"
        text-color="dark"
        icon="link"
        class="q-mb-lg"
        no-caps
        label="AppleMusicの連携解除"
        @click="unlinkAppleMusic"
      />
    </div>

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
        @click="linkSpotify"
      />
      <q-btn
        v-else
        color="grey-4"
        text-color="dark"
        icon="link"
        class="q-mb-lg"
        no-caps
        label="Spotifyの連携解除"
        @click="unlinkSpotify"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { auth } from '@/features'
  import { oauth } from '@/libs'
  import { deleteUnlinkSpotify } from '@/features/user/api/unlink-spotify'
  import { deleteUnlinkAppleMusic } from '@/features/user/api/unlink-applemusic'

  const state = reactive({
    loading: false,
    provider: {
      applemusic: false,
      spotify: false
    }
  })
  onMounted(async () => {
    await fetchUserProvider()
  })

  const fetchUserProvider = async () => {
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
  }

  const linkSpotify = async () => {
    const { data } = await auth.api.getSpotifyOAuthUrl()
    if (!data.value) { return }
    window.location.assign(data.value.redirectUrl)
  }

  const onClickAppleMusicButton = async () => {
    if (await oauth.applemusic()) {
      await fetchUserProvider()
    }
  }
  const unlinkSpotify = async () => {
    const { data } = await deleteUnlinkSpotify()
    if (!data.value) { return }
    alert('連携解除に成功しました')
    window.location.reload()
  }
  const unlinkAppleMusic = async () => {
    const { data } = await deleteUnlinkAppleMusic()
    if (!data.value) { return }
    alert('連携解除に成功しました')
    window.location.reload()
  }
</script>
