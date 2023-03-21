<template>
  <nav>
    <div class="wrapper mobile">
      <h1>ルーム名</h1>
      <div class="input">
        <TopSearchTextInput />
      </div>
    </div>
    <div class="wrapper tablet">
      <div class="logo">
        <img src="~/assets/img/logo.svg">
        <h1 class="room_name">ルーム名</h1>
      </div>
      <NavSearchTextInput v-if="props.isShowSearch" />
    </div>
  </nav>
</template>
<script setup lang="ts">
  interface Props {
    isShowSearch: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isShowSearch: false
  })
</script>
<style scoped lang="scss">
  nav {
    width: 100vw;
    background-color: $background-color;
    box-shadow: 0px 3px 6px $shadow-color;
    position: sticky;
    top: 0;
    z-index: 999;
    @include tablet() {
      height: $app-bar-height;
    }
    .wrapper.mobile {
      @include tablet() {
        display: none;
      }
      h1 {
        font-weight: 700;
        font-size: 21px;
        line-height: 30px;
        text-align: center;
        padding-top: 30px;
      }
      .input {
        padding: 25px 0 20px 0;
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
        img {
          height: 36px;
          display: block;
        }
        h1 {
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: $text-color-gray;
        }
      }
    }
  }
</style>
