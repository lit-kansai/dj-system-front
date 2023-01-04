<template>
  <div class="edit">
    <p class="text-h5 text-weight-bold q-mb-sm">
      "{{ roomName }}"を編集する
    </p>
    <q-input
      v-model="roomName"
      outlined
      label="ルームネーム*"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-input v-model="roomDescription" outlined label="ルーム説明" class="not-rule-input" />
    <q-select
      v-model="provider"
      outlined
      :options="providerOptions"
      label="外部サービス*"
      class="not-rule-input"
    />
    <q-input
      v-model="requestUrl"
      outlined
      label="リクエストURL*"
      class="url-prefix"
      prefix="https://dj.life-is-tech.com/"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <div class="column items-end">
      <q-btn color="primary" label="保存する" @click="onClickSave" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()

  const roomName = ref('ディジェクマクン')
  const roomDescription = ref('Life is Tech! Summer Camp 2022 関西大学D日程')
  const provider = ref('Spotify')
  const requestUrl = ref('djgassi')

  const providerOptions = ['Spotify', 'AppleMusic']

  const onClickSave = () => {
    alert('TODO: 保存のAPIをたたく')
    router.push('/room/' + route.params.id)
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
