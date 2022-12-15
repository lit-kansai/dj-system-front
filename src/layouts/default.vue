<template>
  <q-layout id="app-layout" view="lHh Lpr lFf">
    <q-header id="app-bar" elevated class="bg-grey-1 text-dark">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>DJ Gassi Console</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered>
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
  @import '@/assets/styles/main.scss';

  #app-layout {
    height: 100%;
    min-height: 100vh;
  }

  #app-bar {
    height: $app-bar-height;
  }

  .container {
    max-width: 1072px;
    padding-right: 12px;
    padding-left: 12px;

    @media (max-width: $breakpoint-md-max) {
      margin: 0 auto;
    }
  }
</style>
