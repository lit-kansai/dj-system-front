<template>
  <q-layout view="lHh Lpr lFf">
    <q-header id="app-bar" elevated class="bg-grey-1 text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>DJ Gassi Console</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
      <div class="column q-pl-lg justify-between window-height">
        <div class="q-pt-xl">
          <div class="column q-pb-xl items-start">
            <p class="text-subtitle1 font-weight-bold">自分のルーム</p>
            <q-btn flat align="left" class="q-pa-none q-py-sm"
              >ディジェクマクン</q-btn
            >
            <q-btn flat align="left" class="q-pa-none q-py-sm"
              >ディジェクマクン</q-btn
            >
            <q-btn flat align="left" class="q-pa-none q-py-sm">DJ Gassi</q-btn>
            <q-btn flat align="left" class="q-pa-none q-py-sm">DJ Gassi</q-btn>
            <q-btn flat align="left" class="q-pa-none q-py-sm">
              <q-icon name="add" size="0.9em"></q-icon>ルームを追加</q-btn
            >
          </div>
          <div class="column items-start">
            <p class="text-subtitle1 font-weight-bold">自分のルーム</p>
            <q-btn flat align="left" class="q-pa-none q-py-sm">DJ Gassi</q-btn>
          </div>
        </div>
        <div class="column">
          <div class="q-pb-md">
            <q-btn flat
              ><q-icon name="settings" size="1.6em"></q-icon
              >外部サービス連携</q-btn
            >
          </div>
          <div class="q-pb-md">
            <q-btn flat
              ><q-icon name="reviews" size="1.6em"></q-icon
              >フィードバックを送信</q-btn
            >
          </div>
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
    }
  }
</style>
