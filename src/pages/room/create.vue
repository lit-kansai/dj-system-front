<template>
  <div class="create">
    <p class="text-h5 text-weight-bold q-mb-sm">
      ルームを作成する
    </p>
    <q-input
      v-model="form.roomName"
      outlined
      label="ルームネーム*"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-input v-model="form.roomDescription" outlined label="ルーム説明" class="not-rule-input" />
    <q-select
      v-model="form.provider"
      outlined
      :options="providerOptions"
      label="外部サービス*"
      class="not-rule-input"
    />
    <q-input
      v-model="form.requestUrl"
      outlined
      label="リクエストURL*"
      class="url-prefix"
      prefix="https://dj.life-is-tech.com/"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <div class="column items-end">
      <q-btn color="primary" label="ルームを作成する" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const form = reactive({
    roomName: '',
    roomDescription: '',
    provider: '',
    requestUrl: ''
  })
  const providerOptions = ['Spotify', 'AppleMusic']
</script>

<style lang="scss" scoped>
  .create {
    display: grid;
    gap: 12px;
  }

  .not-rule-input {
    margin-bottom: 20px;
  }
</style>
