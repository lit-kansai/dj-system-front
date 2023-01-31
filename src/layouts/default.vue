<template>
  <q-layout view="lHh Lpr lFf">
    <q-header id="app-bar" elevated class="bg-grey-1 text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>DJ Gassi Console</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      <div class="column q-px-lg justify-between window-height no-wrap">
        <div class="q-pt-xl">
          <div class="column q-pb-xl items-start">
            <p class="text-subtitle1 font-weight-bold">自分のルーム</p>
            <NuxtLink to="/room/:id" target="blank" style="text-decoration: none;" class="full-width">
              <q-btn flat align="left" class="q-py-sm q-pl-none full-width">
                ディジェクマクン
              </q-btn>
            </NuxtLink>
            <NuxtLink to="/room/:id" target="blank" style="text-decoration: none;" class="full-width">
              <q-btn flat align="left" class="q-pl-none full-width q-py-sm">
                ディジェクマクン
              </q-btn>
            </NuxtLink>
            <NuxtLink to="/room/:id" target="blank" style="text-decoration: none;" class="full-width">
              <q-btn flat align="left" class="q-pl-none full-width q-py-sm">
                DJ Gassi
              </q-btn>
            </NuxtLink>
            <NuxtLink to="/room/:id" target="blank" style="text-decoration: none;" class="full-width">
              <q-btn flat align="left" class="q-pl-none full-width q-py-sm">
                DJ Gassi
              </q-btn>
            </NuxtLink>
            <NuxtLink to="/room/:id" target="blank" style="text-decoration: none;" class="full-width">
              <q-btn flat align="left" class="q-pl-none full-width q-py-sm">
                <q-icon name="add" size="0.9em">ルームを追加</q-icon>
              </q-btn>
            </NuxtLink>
          </div>
          <div class="column items-start">
            <p class="text-subtitle1 font-weight-bold">共有されたルーム</p>
            <NuxtLink to="/room/:id" target="blank" style="text-decoration: none;" class="full-width">
              <q-btn flat align="left" class="q-pl-none full-width q-py-sm">
                DJ Gassi
              </q-btn>
            </NuxtLink>
          </div>
        </div>
        <div class="column">
          <NuxtLink to="/settings" style="text-decoration: none;">
            <div class="q-pb-md">
              <q-btn flat align="left" class="q-pl-none full-width">
                <q-icon name="settings" size="1.6em" />外部サービス連携
              </q-btn>
            </div>
          </NuxtLink>
          <NuxtLink to="https://forms.gle/AbUwewkPuLWJjgrL8" target="blank" style="text-decoration: none;">
            <div class="q-pb-md">
              <q-btn flat align="left" class="q-pl-none full-width">
                <q-icon name="reviews" size="1.6em" />フィードバックを送信
              </q-btn>
            </div>
          </NuxtLink>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-mx-xl q-py-xl container">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  const leftDrawerOpen = ref(false)
  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
</script>

<style scoped lang="scss">
  .container {
    max-width: 1024px;
    margin: 0 12px;

    @media (min-width: $breakpoint-md-min) {
      margin: 0 auto;
      padding-right: 24px;
      padding-left: 24px;
    }
  }
</style>
