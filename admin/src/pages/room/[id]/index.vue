<template>
  <div>
    <div class="q-mb-xl">
      <div class="row justify-between items-center q-mb-md">
        <div>
          <p class="text-h5 text-weight-bold q-mb-xs">
            {{ roomDetails.name }}
          </p>
          <p class="q-mb-none">
            {{ roomDetails.description }}
          </p>
        </div>
        <q-btn :to="`/room/${roomDetails.displayId}/edit`" color="primary" label="ルームを編集する" />
      </div>
      <div class="row items-center q-mb-xs">
        <q-icon name="link" class="q-mr-xs" />
        <p class="q-mb-none">
          リクエストURL:
          <a :href="roomDetails.requestUrl" target="_blank">{{ roomDetails.requestUrl }}</a>
        </p>
      </div>
      <div class="row items-center">
        <q-icon :name="roomDetails.provider=='spotify'?'fa-brands fa-spotify':'fa-solid fa-music'" class="q-mr-xs" />
        <p class="q-mb-none">
          プレイリスト:
          <a :href="roomDetails.playlistUrl" target="_blank">{{ roomDetails.playlistUrl }}</a>
        </p>
      </div>
    </div>

    <div>
      <p class="text-h6 text-weight-bold q-mb-xs">
        お便り一覧
      </p>
      <q-table :rows="roomDetails.letters" :columns="otayoriColumns" row-key="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { QTableProps } from 'quasar'

  const roomDetails = reactive({
    displayId: 'test',
    name: 'ディジェクマクン',
    description: 'Life is Tech! Summer Camp 2022 関西大学D日程',
    requestUrl: 'https://dj.life-is-tech.com/test',
    playlistUrl: 'https://open.spotify.com/playlist/396TkvvmaW0EesHOfCr32U',
    provider: 'spotify',
    letters: [
      {
        radioName: 'テク子',
        message: '流れるの楽しみにしてます！',
        createdAt: '2022-10-06T07:10:04.799Z',
        musicName: 'ray',
      },
    ]
  })

  const otayoriColumns: QTableProps['columns'] = [
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
</script>
