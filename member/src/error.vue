<template>
  <div>
    <RoomHeader :is-show-search="false" />
    <div class="wrapper">
      <div class="container">
        <h1>{{ error?.statusCode ?? '' }}</h1>
        <p>{{ error?.message ?? '' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const error = useError()
  useHead({
    style: [{ children: 'body{margin: 0}' }]
  })
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    height: calc(100vh - $app-bar-height);
    .container {

    }
  }
</style>
