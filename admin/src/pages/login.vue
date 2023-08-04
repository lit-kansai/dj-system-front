<template>
  <div id="login-main" class="column justify-center items-center">
    <img id="login-box" class="q-mb-md" src="/img/logo.svg">
    <p id="login-text" class="text-h5 text-weight-bold q-mb-md">
      Welcome to DJ Gassi Console
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
  import { auth } from '@/features'

  definePageMeta({
    layout: false,
  })

  const result = await auth.api.getLoginUrl({ redirectUrl: GOOGLE_API_CALLBACK_PATH })
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
  #login-main {
    min-height: calc(100dvh - $app-bar-height);
  }

  #login-box {
    width: 200px;
    height: 200px;
  }
</style>
