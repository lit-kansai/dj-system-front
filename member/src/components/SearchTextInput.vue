<template>
  <div :class="props.isGradient ? 'gradient' : 'gray'">
    <input
      v-model="textComputed"
      type="text"
      placeholder="曲名・アーティスト名で検索"
      autocomplete="on"
      autofocus
      @keypress.enter="search"
    >
    <input :class="textComputed.length == 0 ? 'zero' : ''" type="submit" value="検索" @click="search">
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()
  const query = ref('')

  interface Props {
    isGradient: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isGradient: false
  })

  const textComputed = computed({
    get: () => query.value,
    set: (value) => { query.value = value }
  })

  const search = () => {
    const roomId = route.params.id
    if (!roomId) { return }
    router.push({ path: `/${roomId}/search`, query: { q: query.value } })
  }

  onMounted(() => {
    query.value = router.currentRoute.value.query.q?.toString() ?? ''
  })
</script>

<style scoped lang="scss">
  .zero {
    display: none;
  }
  div.gradient {
    background: $color-gradient-orange;
    &::before {
      background-color: $color-white;
    }
    input[type="text"] {
      background-color: transparent;
      color: $color-white;
      &:focus {
        background-color: $background-color;
      }
      &::placeholder {
        color: $color-white;
      }
    }
    input[type="submit"] {
      color: $color-white;
    }
  }
  div.gray {
    background-color: $background-color-gray;
    &::before {
      background-color: $color-gray;
    }
    input[type="text"] {
      background-color: $background-color-gray;
      color: $color-body;
      &::placeholder {
        color: $color-gray;
      }
    }
    input[type="submit"] {
      color: $color-gray;
    }
  }
  div {
    width: 100%;
    height: 50px;
    padding: 3px !important;
    border-radius: 40px;
    display: flex;
    justify-content: left;
    align-items: center;
    position: relative;
    @include tablet() {
      width: 425px;
    }
    &::before {
      content: "";
      mask: url(~/assets/img/search.svg);
      position: absolute;
      top: 15px;
      left: 25px;
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    &:focus-within::before {
      display: none;
    }

    input[type="text"] {
      width: 100%;
      height: 100%;
      display: block;
      padding: 16px 0px 14px 55px;
      margin-right: 80px;
      font-size: 16px;
      font-weight: 400;
      border: none;
      border-radius: 40px;
      transition: all 0.55s ease;
      &::placeholder {
        font-weight: 400;
      }
      &:focus {
        width: calc(100% - 80px);
        color: $color-body;
        border-radius: 40px 0px 0px 40px;
        padding-left: 25px;
        &::placeholder {
          color: $color-gray;
        }
      }

      &:focus + input[type="submit"] {
        display: block;
      }
    }

    input[type="submit"] {
      width: 80px;
      height: 100%;
      margin-right: 3px;
      padding: 0;
      position: absolute;
      right: 0px;
      border: none;
      cursor: pointer;
      background-color: transparent;
      transition: all 0.55s ease;
    }
  }
</style>
