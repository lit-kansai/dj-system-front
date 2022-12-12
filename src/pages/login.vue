<template>
  <div id="login-main" class="d-flex flex-column justify-center align-center">
    <div id="login-box" class="mb-5"></div>
    <p id="login-text" class="text-h5 d-inline-flex font-weight-bold">
      Welcome to DJGassi Console
    </p>
    <q-btn
      id="login-button"
      color="primary"
      class="q-mb-lg"
      no-caps
      label="Sign in with Google"
    />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: false,
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
  #login-main {
    min-height: calc(100vh - $app-bar-height);
  }
  #login-box {
    height: 200px;
    width: 200px;
    background-color: #d9d9d9;
  }
</style>
