<template>
  <div
    class="music-card"
  >
    <img :src="thumbnail" :alt="`${name}のサムネイル写真`">
    <p class="name">{{ name }}</p>
    <p class="artists">{{ artists }}</p>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    thumbnail: string,
    name: string,
    artists: string,
  }
  withDefaults(defineProps<Props>(), {
    thumbnail: '',
    name: '',
    artists: '',
  })
</script>

<style scoped lang="scss">
  .music-card {
    width: 270px;
    height: 360px;
    padding: 25px 25px 0 25px;
    border-radius: 10px;
    box-shadow: 0px 0px 12px 2px $music-card-shadow;
    cursor: pointer;

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
