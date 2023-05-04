<template>
  <div>
    <div class="q-mb-xl">
      <div class="row justify-between items-center q-mb-md">
        <div>
          <p class="text-h5 text-weight-bold q-mb-xs">
            {{ state.roomDetail.name }}
          </p>
          <p class="q-mb-none">
            {{ state.roomDetail.description }}
          </p>
        </div>
        <q-btn :to="`/room/${state.roomDetail.displayId}/edit`" color="primary" label="ルームを編集する" />
      </div>
      <div class="row items-center q-mb-xs">
        <q-icon name="link" class="q-mr-xs" />
        <p class="q-mb-none">
          リクエストURL:
          <a :href="state.roomDetail.requestUrl" target="_blank">{{ state.roomDetail.requestUrl }}</a>
        </p>
      </div>
      <div class="row items-center">
        <q-icon :name="state.roomDetail.provider=='spotify'?'fa-brands fa-spotify':'fa-solid fa-music'" class="q-mr-xs" />
        <p class="q-mb-none">
          プレイリスト:
          <a :href="state.roomDetail.playlistUrl" target="_blank">{{ state.roomDetail.playlistUrl }}</a>
        </p>
      </div>
    </div>

    <div class="q-mb-xl">
      <p class="text-h6 text-weight-bold q-mb-xs">
        お便り一覧
      </p>
      <q-table :rows="state.letters" :columns="letterColumns" row-key="name" />
    </div>

    <div>
      <p class="text-h6 text-weight-bold q-mb-xs">
        Danger Zone
      </p>
      <div class="row justify-between no-wrap items-center danger-item">
        <div>
          <p class="q-mb-sm text-weight-bold text-subtitle1">ルームを削除する</p>
          <span>ルームを削除すると元に戻すことはできません。お便りのデータも同時に削除されます。プレイリストは、連携している音楽ストリーミングサービスに残ります。</span>
        </div>
        <q-btn class="danger-button " color="negative" flat label="ルームを削除" @click="onClickDeleteRoom" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { QTableProps } from 'quasar'
  import { ComputedRef } from 'vue'
  import { SPOTIFY_PLAYLIST_URL, MEMBER_REQUEST_URL } from '@/constants'
  import { room, letter } from '@/features'
  const router = useRouter()

  type State = {
    loading: ComputedRef<boolean>,
    roomDetail: {
      name: string
      displayId: string,
      description: string,
      requestUrl: string,
      playlistUrl: string,
      provider: string
    },
    letters: Array<{
      radioName: string,
      createdAt: string,
      message: string,
      musicName: string
    }>
  }
  // const $q = useQuasar()
  const roomId = useRoomId()
  const roomDetail = await room.api.getRoomDetail({ roomId })
  const letters = await letter.api.getRoomLetters({ roomId })
  const deleteRoom = await room.api.deleteRoom({ roomId: roomId.value })
  const state = reactive<State>({
    loading: computed(() => roomDetail.pending.value || letters.pending.value),
    roomDetail: {
      name: '',
      displayId: '',
      description: '',
      requestUrl: '',
      playlistUrl: '',
      provider: '',
    },
    letters: [],
  })
  // watch(toRefs(state).loading, loading => loading ? $q.loading.show() : $q.loading.hide())
  watch(roomId, () => { letters.refresh(); roomDetail.refresh() }, { immediate: true })
  watch(roomDetail.data, (data) => {
    if (!data) { return }
    state.roomDetail.name = data.name
    state.roomDetail.displayId = data.displayId
    state.roomDetail.description = data.description
    state.roomDetail.requestUrl = MEMBER_REQUEST_URL(data.displayId ?? '')
    state.roomDetail.playlistUrl = SPOTIFY_PLAYLIST_URL(data.playlistId ?? '')
    state.roomDetail.provider = data.provider ?? ''
  })
  watch(letters.data, (data) => {
    if (!data) { return }
    state.letters = data.map(letter => ({
      radioName: letter.radioName,
      createdAt: letter.createdAt,
      message: letter.message,
      // TODO: ここ終わってるのでやめる
      musicName: letter?.musics ? letter.musics[0] ? letter.musics[0].name : '' : ''
    }))
  })

  const letterColumns: QTableProps['columns'] = [
    {
      name: 'createdAt',
      label: '投稿日時',
      sortable: true,
      align: 'left',
      field: 'createdAt',
    },
    {
      name: 'radioName',
      label: 'ラジオネーム',
      sortable: true,
      align: 'left',
      field: 'radioName',
    },
    {
      name: 'message',
      label: 'お便り',
      sortable: true,
      align: 'left',
      field: 'message',
    },
    {
      name: 'musicName',
      label: '曲名',
      sortable: true,
      align: 'left',
      field: 'musicName',
    },
  ]

  const onClickDeleteRoom = async () => {
    const { spliceRoom } = useRoomsState()
    const confirmResult = confirm('ルームを本当に削除しますか?')
    if (confirmResult === false) {
      return
    }
    await deleteRoom.execute()
    if (deleteRoom.error.value) {
      alert(JSON.stringify(deleteRoom.error.value))
    } else {
      spliceRoom(roomId.value)
      alert('ルームを削除しました。')
      router.push('/')
    }
  }
</script>

<style lang="scss" scoped>
  .danger-item {
    border: $negative 1px solid;
    border-radius: 6px;
    padding: 16px;
  }
  .danger-button {
    min-width: 120px;
  }
</style>
