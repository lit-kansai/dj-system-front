<template>
  <div class="edit">
    <p class="text-h5 text-weight-bold q-mb-sm">
      "{{ currentRoomName }}"を編集する
    </p>
    <q-input
      v-model="state.form.roomName"
      outlined
      label="ルームネーム*"
      :rules="[(val: string) => !!val || 'Field is required']"
      hint="今編集している部屋の名前です。"
    />
    <q-input
      v-model="state.form.roomDescription"
      outlined
      label="メモ（ルーム説明）*"
      class="not-rule-input"
      hint="あなた専用のメモスペースです。参加者には公開されません。"
    />
    <q-input
      v-model="state.form.requestUrl"
      outlined
      label="リクエストURL*"
      class="url-prefix"
      :prefix="requestUrlPrefix"
      :rules="[(val: string) => !!val || 'Field is required']"
      hint="リクエストURLを変更すると、参加者側のURLも変更されます。"
    />
    <div class="row justify-start">
      <q-btn color="primary" class="q-mr-sm" label="保存する" @click="onClickSave" />
      <q-btn color="primary" flat label="キャンセル" @click="onClickCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MEMBER_REQUEST_URL } from '@/constants/external-url'
  import { room } from '@/features'
  import { getRouteParams } from '@/utils'
  const router = useRouter()
  const roomId = useRoomId()
  const roomDetail = await room.api.getRoomDetail({ roomId })
  const requestUrlPrefix = MEMBER_REQUEST_URL('')

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
    router.push('/room/' + roomId.value)
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
    router.push('/room/' + state.form.requestUrl)
  }

  watch(roomId, () => { roomDetail.refresh() }, { immediate: true })
  watch(roomDetail.data, (data) => {
    if (!data) { return }
    currentRoomName.value = data.name
    state.form.roomName = data.name
    state.form.roomDescription = data.description
    state.form.requestUrl = data.displayId
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
