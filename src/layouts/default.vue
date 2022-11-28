<template>
  <main id="app-layout">
    <v-layout>
      <v-navigation-drawer permanent></v-navigation-drawer>
      <v-app-bar id="app-bar" color="grey-lighten-4">
        <template #prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
      </v-app-bar>
      <v-main>
        <v-container class="px-0 pt-16 pb-10">
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </main>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
  @import '@/assets/styles/main.scss';
  #app-layout {
    height: 100%;
    min-height: 100vh;
  }

  #app-bar {
    height: $app-bar-height;
  }
</style>
