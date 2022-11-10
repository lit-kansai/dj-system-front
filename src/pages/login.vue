<template>
  <div id="login-main" class="d-flex flex-column justify-center align-center">
    <div id="login-box" class="mb-5"></div>
    <p id="login-text" class="text-h5 d-inline-flex font-weight-bold">
      Welcome to DJGassi Console
    </p>
    <v-btn id="login-button" color="#1867C0" class="d-inline-flex mt-5">
      Sign in with Google</v-btn
    >
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
  #login-main {
    height: 100%;
  }
  #login-box {
    height: 200px;
    width: 200px;
    background-color: #d9d9d9;
  }
  #login-button {
    color: white;
    font-family: 'Roboto';
    text-transform: none;
  }
</style>
