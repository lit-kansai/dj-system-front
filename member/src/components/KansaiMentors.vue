<template>
  <div>
    <img src="~/assets/img/kansai-logo-white.svg">
    <p>&copy; Life is Tech! Kansai Mentors</p>
  </div>
</template>

<style scoped lang="scss">
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    @include tablet() {
      width: 60px;
      height: 60px;
    }
  }
  p {
    font-family: $english-font;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    letter-spacing: 0.05em;
    color: $text-color-white;
    @include tablet() {
      font-size: 21px;
    }
  }
</style>
