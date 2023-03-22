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
    justify-content: center;
    align-items: center;
    height: calc(100vh - $app-bar-height);
    .container {
      text-align: center;
      padding-bottom: 70px;
      h1, p {
        font-family: $english-font;
        font-weight: 700;
      }
      h1 {
        display: inline-block;
        font-size: 130px;
        line-height: 130px;
        letter-spacing: 0.1em;
        background: $gradient-orange;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p {
        font-size: 25px;
      }
    }
  }
</style>
