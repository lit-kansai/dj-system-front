<template>
  <button class="close_button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="white"
      aria-hidden="true"
    >
      <path
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
<style scoped lang="scss">
  .close_button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0.5rem;
    width: 48px;
    height: 48px;
    background: $gradient-orange;
    border-radius: 9999px;
    top: -15px;
    right: -15px;
    transform-origin: center;
    --transform-translate-x: 50%;
    --transform-translate-y: -50%;
    opacity: 1;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
    path {
      fill: white;
    }
    @media (min-width: 768px) {
      top: -15px;
      right: -15px;
    }
  }
</style>
