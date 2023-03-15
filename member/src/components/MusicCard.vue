<template>
  <div class="music-card">
    <img :src="state.music.image" :alt="`${state.music.name}のサムネイル写真`">
    <p class="name">{{ state.music.name }}</p>
    <p class="artists">{{ state.music.artists }}</p>
  </div>
</template>

<script setup lang="ts">
  const state = reactive({
    music: {
      image: 'https://i.kfs.io/album/global/162607085,0v1/fit/500x500.jpg',
      name: 'きらり',
      artists: '藤井風',
    }
  })
</script>

<style scoped lang="scss">
  .music-card {
    width: 220px;
    height: 335px;
    padding: 25px 25px 0 25px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px 2px $music-card-shadow;

    img {
      width: 100%;
      object-fit: cover;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .name {
      margin: 20px 0 0 -2px;
      font-weight: 700;
      font-size: 21px;
      line-height: 25px;
      color: $text-color-black;
    }

    .artists {
      margin-top: 10px;
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: $text-color-gray;
    }
  }
</style>
