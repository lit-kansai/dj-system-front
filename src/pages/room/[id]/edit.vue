<template>
  <div class="edit">
    <p class="text-h5 text-weight-bold q-mb-sm">
      "{{ currentRoomName }}"を編集する
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
    <div class="row justify-end items-end">
      <q-btn color="grey-1" text-color="dark" class="q-mr-sm" label="キャンセル" @click="onClickCancel" />
      <q-btn color="primary" label="保存する" @click="onClickSave" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()

  const currentRoomName = 'ディジェクマクン'
  const currentDisplayId = route.params.id
  const form = reactive({
    roomName: 'ディジェクマクン',
    roomDescription: 'Life is Tech! Summer Camp 2022 関西大学D日程',
    provider: 'Spotify',
    requestUrl: 'djgassi'
  })

  const providerOptions = ['Spotify', 'AppleMusic']

  const onClickCancel = () => {
    router.push('/room/' + currentDisplayId)
  }
  const onClickSave = () => {
    alert('TODO: 保存のAPIをたたく')
    router.push('/room/' + currentDisplayId)
  }
</script>

<style lang="scss" scoped>
  .edit {
    display: grid;
    gap: 12px;
  }

  .not-rule-input {
    margin-bottom: 20px;
  }
</style>
