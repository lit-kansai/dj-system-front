<template>
  <div class="edit">
    <p class="text-h5 text-weight-bold q-mb-sm">
      "{{ currentRoomName }}"を編集する
    </p>
    <q-input
      v-model="state.form.roomName"
      outlined
      label="メモ（ルーム説明）*"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-input v-model="state.form.roomDescription" outlined label="ルーム説明" class="not-rule-input" />
    <q-input
      v-model="state.form.requestUrl"
      outlined
      label="リクエストURL*"
      class="url-prefix"
      prefix="https://dj.life-is-tech.com/"
      :rules="[(val) => !!val || 'Field is required']"
      hint="リクエストURLを変更すると、参加者側のURLも変更されます。"
      color="negative"
    />
    <div class="row justify-start">
      <q-btn color="primary" class="q-mr-sm" label="保存する" @click="onClickSave" />
      <q-btn color="primary" flat label="キャンセル" @click="onClickCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { room } from '@/features'
  import { getRouteParams } from '@/utils'
  const router = useRouter()

  const currentRoomName = ref('')
  const state = reactive({
    loading: false,
    form: {
      roomName: '',
      roomDescription: '',
      requestUrl: ''
    }
  })

  const onClickCancel = () => {
    const { id } = getRouteParams.room()
    router.push('/room/' + id)
  }

  const onClickSave = async () => {
    state.loading = true
    const { id } = getRouteParams.room()
    const { error } = await room.api.updateRoom({
      roomId: id,
      urlName: state.form.requestUrl,
      roomName: state.form.roomName,
      description: state.form.roomDescription
    })
    if (error.value) { JSON.stringify(error); return }

    state.loading = false
    router.push('/room/' + id)
  }

  onMounted(async () => {
    const { id } = getRouteParams.room()
    state.loading = true
    const { data } = await room.api.getRoom({ roomId: id })
    if (!data.value) { state.loading = false; return }
    currentRoomName.value = data.value.name
    state.form.roomName = data.value.name
    state.form.roomDescription = data.value.description
    state.form.requestUrl = data.value.displayId
    state.loading = false
  })
</script>

<style lang="scss" scoped>
  .edit {
    display: grid;
    gap: 12px;
  }

  .not-rule-input {
    margin-bottom: 20px;
  }

  /* stylelint-disable*/
  // これあまり良くない説はある
  .q-input :deep(.q-field__prefix) {
    padding-right: 0px;
  }
</style>
