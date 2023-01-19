<template>
  <div id="login-main" class="column justify-center items-center">
    <div id="login-box" class="q-mb-md" />
    <p id="login-text" class="text-h5 text-weight-bold q-mb-md">
      Welcome to DJGassi Console
    </p>
    <q-btn
      id="login-button"
      color="primary"
      class="q-mb-lg"
      no-caps
      label="Sign in with Google"
      @click="login"
    />
  </div>
</template>

<script setup lang="ts">
  import { GOOGLE_API_CALLBACK_PATH } from '@/constants'

  definePageMeta({
    layout: false,
  })

  const result = await getLoginUrl({ redirectUrl: GOOGLE_API_CALLBACK_PATH })
  const state = reactive({ result })
  const login = () => { state.result.execute() }

  // 同じスコープ内にあるreactiveなオブジェクトが変化したら呼ばれる
  watchEffect(() => {
    const { data, error } = result
    if (error.value) {
      alert(JSON.stringify(error.value))
      return
    }
    if (!data.value) { return }
    window.location.assign(data.value.redirectUrl)
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';

  #login-main {
    min-height: calc(100vh - $app-bar-height);
  }

  #login-box {
    width: 200px;
    height: 200px;
    background-color: #d9d9d9;
  }
</style>
