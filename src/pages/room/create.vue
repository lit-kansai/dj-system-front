<template>
  <div class="create">
    <p class="text-h5 text-weight-bold q-mb-sm">
      ルームを作成する
    </p>
    <q-input
      v-model="state.form.roomName"
      outlined
      label="ルームネーム*"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-input v-model="state.form.description" outlined label="ルーム説明" class="not-rule-input" />
    <q-select
      v-model="state.form.provider"
      outlined
      :options="state.providers"
      label="外部サービス*"
      class="not-rule-input"
    />
    <q-input
      v-model="state.form.urlName"
      outlined
      label="リクエストURL*"
      class="url-prefix"
      prefix="https://dj.life-is-tech.com/"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <div class="row justify-end items-end">
      <q-btn color="grey-1" text-color="dark" class="q-mr-sm" label="キャンセル" @click="onClickCancel" />
      <q-btn color="primary" label="ルームを作成する" @click="onClickCreateButton" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useQuasar } from 'quasar'
  import { room } from '@/features'

  const $q = useQuasar()
  const router = useRouter()
  const state = reactive({
    loading: false,
    form: {
      urlName: '',
      roomName: '',
      description: '',
      provider: '',
    },
    // TODO: ここユーザーのlinkedProvidersから抽出したい
    providers: ['Spotify']
  })
  const result = await room.api.createRoom(toRaw(state.form))

  const onClickCreateButton = async () => {
    const stop = watch(result.pending, (pending) => { state.loading = pending })
    $q.loading.show()
    await result.execute()
    $q.loading.hide()
    stop()
    const { error, data } = result
    if (error.value) { alert(JSON.stringify(error.value)) }
    if (!data.value) { alert('data not found'); return }
    router.push(`/room/${data.value.displayId}`)
  }

  const onClickCancel = () => {
    router.go(-1)
  }

</script>

<style lang="scss" scoped>
  .create {
    display: grid;
    gap: 12px;
  }

  /* stylelint-disable*/
  // これあまり良くない説はある
  .q-input :deep(.q-field__prefix) {
    padding-right: 0px;
  }

  .not-rule-input {
    margin-bottom: 20px;
  }
</style>
