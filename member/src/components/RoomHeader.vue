<template>
  <nav>
    <div class="wrapper">
      <NuxtLink :class="props.isShowSearch ? 'logo show-search' : 'logo'" :to="`/${roomRouteParams?.id ?? ''}`">
        <img src="~/assets/img/new-logo.png">
        <h2 class="title">{{ currentRoom?.name ?? '' }}</h2>
      </NuxtLink>
      <SearchTextInput
        v-if="props.isShowSearch"
        :is-gradient="isMobile"
        :autofocus="props.searchBarAutofocus"
        data-test-id="header-search-text-input"
        class="search"
      />
    </div>
  </nav>
</template>
<script setup lang="ts">
  import { useRoomState } from '@/features'
  import { getRouteParams } from '@/utils'

  interface Props {
    isShowSearch: boolean
    searchBarAutofocus: boolean
  }
  const roomRouteParams = getRouteParams.room()
  const { currentRoom } = useRoomState()
  const props = withDefaults(defineProps<Props>(), {
    isShowSearch: false,
    searchBarAutofocus: true
  })
  const isMobile = ref(window.innerWidth < 767)

  onMounted(() => {
    window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth < 767
    })
  })
</script>
<style scoped lang="scss">
  nav {
    width: 100vw;
    background-color: $background-color;
    box-shadow: 0px 3px 6px $color-shadow;
    position: sticky;
    top: 0;
    z-index: 15;
    min-height: $app-bar-height;
    height: 100%;
    @include tablet() {
      height: $app-bar-height;
    }
    .wrapper {
      min-height: $app-bar-height;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @include tablet() {
        flex-direction: row;
        justify-content: space-between;
        margin: 0 auto;
      }
    }
    .show-search {
      margin-top: 30px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      &:hover {
        opacity: 0.8;
      }
      @include tablet() {
        margin: 0;
      }
      img {
        display: none;
        @include tablet() {
          display: block;
          height: 72px;
        }
      }
      h2 {
        font-weight: 700;
        font-size: 21px;
        line-height: 30px;
        text-align: center;
        width: 100%;
        text-decoration: none;
        color: $color-body;
      }
    }
    .search {
      margin: 20px auto;
      @include tablet() {
        margin: 0;
      }
    }
  }
</style>
