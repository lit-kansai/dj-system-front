<template>
  <div class="music-card" data-test-id="music-card">
    <nuxt-img :src="thumbnail" :alt="`${name}のサムネイル写真`" width="220" />
    <h3 class="name">{{ name }}</h3>
    <p class="artists">{{ artists }}</p>
    <div class="hover">
      <nuxt-img src="/img/plus.svg" />
    </div>
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
    box-shadow: 0px 0px 12px 2px $color-shadow;
    cursor: pointer;
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h3.name {
      margin: 20px 0 0 -2px;
      color: $color-body;
    }
    .artists {
      margin-top: 5px;
      color: $color-gray;
    }
    .hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 270px;
      height: 360px;
      border-radius: 10px;
      background-color: rgba($color: $background-color, $alpha: 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.4s;
      opacity: 0;
      &:hover {
        opacity: 1;
      }
      img {
        width: 110px;
        height: 110px;
        object-fit: contain;
        opacity: 0.9;
      }
    }
  }
</style>
