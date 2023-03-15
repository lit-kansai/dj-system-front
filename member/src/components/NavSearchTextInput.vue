<template>
  <div>
    <input
      v-model="query"
      class="search"
      type="text"
      placeholder="曲名・アーティスト名で検索"
      autocomplete="on"
    >
  </div>
</template>
<script setup lang="ts">
  const route = useRoute()
  const router = useRouter()
  const query = ref(route.query.q)

  watchEffect(() => {
    if (route.params.id !== undefined && query.value !== undefined && query.value !== '') {
      router.push({ path: `/${route.params.id}/search`, query: { q: query.value } })
    }
  })

</script>
<style scoped lang="scss">
  .search {
    display: block;
    width: 330px;
    height: 20px;
    background: $background-color-textfield;
    color: $text-color-black;
    border: none;
    padding: 16px 40px 14px 55px;
    border-radius: 34px;
    &::placeholder {
      color: $text-color-placeholder;
    }
  }
  div {
    position: relative;
    &::before {
      content: "";
      background-color: $text-color-placeholder;
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
