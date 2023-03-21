<template>
  <div>
    <input
      v-model="textComputed"
      class="search"
      type="text"
      placeholder="曲名・アーティスト名で検索"
      autocomplete="on"
    >
    <input type="submit" value="検索" @click="onclickSearch">
  </div>
</template>
<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()

  const query = ref('')
  const onclickSearch = () => {
    const roomId = route.params.id
    if (!roomId) { return }
    router.push({ path: `/${roomId}/search`, query: { q: query.value } })
  }
  const textComputed = computed({
    get: () => query.value,
    set: (value) => { query.value = value }
  })
</script>

<style scoped lang="scss">
  div {
    width: 425px;
    height: 50px;
    padding: 3px !important;
    border-radius: 40px;
    background: $gradient-orange;
    display: flex;
    justify-content: left;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      background-color: $text-color-white;
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
      background-color: transparent;
      color: $text-color-white;
      font-weight: 400;
      border: none;
      padding: 16px 80px 14px 55px;
      border-radius: 40px;
      outline: none;
      transition: all 0.55s ease-in-out;
      &::placeholder {
        font-weight: 400;
        color: $text-color-white;
      }
      &:focus {
        width: calc(100% - 80px);
        color: $text-color-black;
        background-color: $background-color;
        border-radius: 40px 0px 0px 40px;
        padding-left: 25px;
        &::placeholder {
          color: $text-color-black;
        }
      }
    }

    input[type="submit"] {
      width: 80px;
      height: 100%;
      margin-right: 3px;
      padding: 0;
      position: absolute;
      right: 0px;
      color: $text-color-white;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
</style>
