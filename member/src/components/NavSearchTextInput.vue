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
    window.location.href = `/${roomId}/search?q=${query.value}`
  }

  onMounted(() => {
    query.value = String(route.query.q ?? '')
  })

</script>
<style scoped lang="scss">
  .search {
    box-sizing: content-box;
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
