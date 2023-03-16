<template>
  <div class="requested">
    <div class="alert">
      <img src="~/assets/img/requested-orange.svg">
      <div class="message">
        <p>送信完了</p>
        <div class="timer">
          <p>次のリクエストまで</p>
          <strong>05:00</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
.requested {
<<<<<<< HEAD
  width: 100vw;
  height: calc(100vh - 90px);
=======
  width: calc(100vw - 160px);
  height: calc(100vh - 250px);
>>>>>>> master
  background: $gradient-orange;
  padding: 60px 80px 100px 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .alert {
    display: flex;
    align-items: center;
    gap: 80px;
    max-width: 1200px;
    padding: 85px 110px;
    background-color: $background-color;
    border-radius: 25px;

    img {
      width: 350px;
      height: 350px;
      object-fit: cover;
    }
  }
  .message {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    p {
      font-weight: 700;
      font-size: 72px;
      line-height: 87px;
      letter-spacing: 0.05em;
    }
    .timer {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        font-size: 24px;
        line-height: 29px;
      }
      strong {
        font-weight: 500;
        font-size: 64px;
      }
    }
  }
}
</style>
