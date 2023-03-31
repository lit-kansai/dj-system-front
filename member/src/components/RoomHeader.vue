<template>
  <nav>
    <div class="wrapper mobile">
      <NuxtLink class="title" :to="`/${roomRouteParams?.id ?? ''}`">{{ currentRoom?.name ?? '' }}</NuxtLink>
      <div v-if="props.isShowSearch" class="input">
        <GradationSearchTextInput />
      </div>
    </div>
    <div class="wrapper tablet">
      <NuxtLink class="logo" :to="`/${roomRouteParams?.id ?? ''}`">
        <img src="~/assets/img/new-logo.png">
        <h2 class="title">{{ currentRoom?.name ?? '' }}</h2>
      </NuxtLink>
      <NavSearchTextInput v-if="props.isShowSearch" />
    </div>
  </nav>
</template>
<script setup lang="ts">
  import { useRoomState } from '@/features'
  import { getRouteParams } from '@/utils'

  interface Props {
    isShowSearch: boolean
  }
  const roomRouteParams = getRouteParams.room()
  const { currentRoom } = useRoomState()
  const props = withDefaults(defineProps<Props>(), {
    isShowSearch: false
  })
</script>
<style scoped lang="scss">
  nav {
    width: 100vw;
    background-color: $background-color;
    box-shadow: 0px 3px 6px $color-shadow;
    position: fixed;
    top: 0;
    z-index: 15;
    min-height: $app-bar-height;
    @include tablet() {
      height: $app-bar-height;
    }
    .wrapper.mobile {
      @include tablet() {
        display: none;
      }
      padding: 30px 25px ;
      .title {
        font-weight: 700;
        font-size: 21px;
        line-height: 30px;
        text-align: center;
        width: 100%;
        text-decoration: none;
        color: $color-body;
        &:hover {
          opacity: 0.8;
        }
      }
      .input {
        padding-bottom: 20px;
      }
    }
    .wrapper.tablet {
      display: none;
      @include tablet() {
        display: block;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .logo, p {
        display: inline;
      }
      .logo{
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        img {
          height: 72px;
          display: block;
        }
        .title {
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: $color-body;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
</style>
