<template>
  <div>
    <div class="cell">
      <div class="contents">
        <img :src="thumbnail" :alt="`${name}のサムネイル写真`">
        <div class="text">
          <p class="name">{{ name }}</p>
          <p class="artists">{{ artists }}</p>
        </div>
      </div>
      <img src="~/assets/img/arrow_forward.svg" class="icon">
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    id: string,
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
    .icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }
  .contents {
    max-width: calc(100vw - ($padding-wrapper * 2) - 35px);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    img {
      width: 55px;
      height: 55px;
      object-fit: cover;
    }
    .text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .name, .artists {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        font-size: 16px;
        font-weight: 700;
        line-height: 23px;
      }
      .artists {
        font-weight: 400;
        font-size: 13px;
        line-height: 19px;
        color: $text-color-gray;
      }
    }
  }
</style>
