<template>
  <div>
    <q-form class="create" @submit="onClickCreateButton" @reset="onClickReset">
      <p class="text-h5 text-weight-bold q-mb-sm">
        ルームを作成する
      </p>
      <q-input
        v-model="state.form.roomName"
        outlined
        label="ルームネーム*"
        :rules="[(val) => !!val || 'ルームネームを入力してください']"
      />
      <q-input
        v-model="state.form.description"
        outlined
        label="メモ（ルーム説明）*"
        class="not-rule-input"
        :rules="[(val) => !!val || 'メモ（ルーム説明）を入力してください']"
      />
      <q-select
        v-model="state.form.provider"
        outlined
        :options="state.providers"
        label="外部サービス*"
        class="not-rule-input"
        :rules="[(val) => !!val || '使用する外部サービスを選択してください']"
      />
      <q-input
        v-model="state.form.urlName"
        outlined
        label="リクエストURL*"
        class="url-prefix"
        :prefix="`${MEMBER_SITE_URL}/`"
        :rules="[(val) => !!val || 'リクエストURLを入力してください']"
      />
      <div class="row justify-start">
        <q-btn color="primary" type="submit" class="q-mr-sm" label="ルームを作成する" />
        <q-btn color="primary" type="reset" flat label="リセット" />
      </div>
    </q-form>
    <q-dialog v-model="confirmProviders" persistent>
      <q-card>
        <q-card-section>
          <div class="row items-center q-pb-sm">
            <q-icon size="13em" class="q-mb-md" name="fa-reg-dizzy" />
            <q-avatar icon="link_off" color="primary" text-color="white" />
            <span class="text-body1 text-weight-bold q-ml-sm">連携済みの外部サービスがありません</span>
          </div>
          <span>ルームを新しく作成するには、外部サービス（Spotify/AppleMusic）と事前に連携する必要があります。</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="今すぐ連携する"
            color="primary"
            to="/settings"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
  import { room } from '@/features'

  // const $q = quasar()
  const { MEMBER_SITE_URL } = useRuntimeConfig().public
  const router = useRouter()
  const userState = useUserState()
  const state = reactive({
    loading: false,
    form: {
      urlName: '',
      roomName: '',
      description: '',
      provider: '',
    },
    providers: userState.state.value?.linkedProviders?.map(v => v.isConnected ? v.provider : '').filter(v => !!v) ?? [],
  })
  const confirmProviders = computed(() => state.providers.length === 0)
  const result = await room.api.createRoom(toRaw(state.form))

  const onClickCreateButton = async () => {
    const { setRoom } = useRoomsState()
    const stop = watch(result.pending, (pending) => { state.loading = pending })
    // loading.show()
    await result.execute()
    // loading.hide()
    stop()
    const { error, data } = result
    if (error.value) { alert(JSON.stringify(error.value)) }
    if (!data.value) { alert('data not found'); return }
    setRoom(data.value)
    router.push(`/room/${data.value.displayId}`)
  }

  const onClickReset = () => {
    state.form.urlName = ''
    state.form.roomName = ''
    state.form.description = ''
    state.form.provider = ''
  }

</script>

<style lang="scss" scoped>
  .create {
    display: grid;
    gap: 12px;
  }

  /* stylelint-disable*/
  .q-input :deep(.q-field__prefix) {
    padding-right: 0px;
  }

  .not-rule-input {
    margin-bottom: 20px;
  }
</style>
