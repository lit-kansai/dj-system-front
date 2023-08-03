<template>
  <div class="cell" data-test-id="music-cell">
    <div class="contents">
      <img :src="thumbnail" :alt="`${name}のサムネイル写真`" width="55" />
      <div class="text">
        <h3 class="name">{{ name }}</h3>
        <p class="artists">{{ artists }}</p>
      </div>
    </div>
    <img src="/img/arrow_forward.svg" class="icon" />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    thumbnail: string,
    name: string,
    artists: string
  }
  withDefaults(defineProps<Props>(), {
    thumbnail: '',
    name: '',
    artists: ''
  })
</script>

<style scoped lang="scss">
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }
  .contents {
    width: calc(100% - 35px);
    padding: 12px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 55px;
      height: 55px;
      object-fit: cover;
    }
    .text, .name, .artists {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .artists {
        color: $color-gray;
      }
    }
  }
</style>
