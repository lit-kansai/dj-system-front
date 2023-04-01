<template>
  <div>
    <input
      v-model="textComputed"
      class="search"
      type="text"
      placeholder="曲名・アーティスト名で検索"
      autocomplete="on"
      @keypress.enter="searchMusics"
    >
  </div>
</template>
<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()
  const query = ref('')

  const textComputed = computed({
    get: () => query.value,
    set: (value) => {
      query.value = value
    }
  })

  const searchMusics = () => {
    const roomId = route.params.id
    if (!roomId) { return }
    router.push({ path: `/${roomId}/search`, query: { q: query.value } })
  }

  onMounted(() => {
    query.value = router.currentRoute.value.query.q?.toString() ?? ''
  })

</script>
<style scoped lang="scss">
  .search {
    box-sizing: content-box;
    display: block;
    width: 330px;
    height: 20px;
    background-color: $background-color-gray;
    color: $color-body;
    border: none;
    padding: 16px 40px 14px 55px;
    border-radius: 34px;
    &::placeholder {
      color: $color-gray;
    }
  }
  div {
    position: relative;
    &::before {
      content: "";
      background-color: $color-gray;
      mask: url(~/assets/img/search.svg);
      position: absolute;
      top: 15px;
      left: 25px;
      display: inline-block;
      width: 20px;
      height: 20px;
      z-index: 900;
    }
  }
</style>
