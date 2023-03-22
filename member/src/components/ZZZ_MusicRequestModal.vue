<template>
  <div v-if="isOpen" class="wrapper" @click="onClickOutside">
    <div class="container" @click.stop>
      <div class="music">
        <img :src="thumbnail">
        <div class="text">
          <p class="name">{{ name }}</p>
          <p class="artists">{{ artists }}</p>
        </div>
      </div>
      <div class="form_container">
        <div class="form_element">
          <p class="form_label">ニックネーム(匿名可)</p>
          <TextField v-model="textFieldComputed" :text="props.textField" placeholder="がっしー" />
        </div>
        <div class="form_element">
          <p class="form_label">メッセージ</p>
          <TextArea v-model="textAreaComputed" :text="props.textArea" placeholder="開発ここまで終わったよ！" />
        </div>
        <div class="submit_button_container">
          <button
            class="submit_button"
            @click="emits('onClickSubmitButton')"
          >
            リクエストを送信
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emits = defineEmits<{
    (e: 'changeTextField', value: string): void,
    (e: 'changeTextArea', value: string): void
    (e: 'onClickSubmitButton'): void
  }>()

  interface Props {
    isOpen: boolean
    id: string,
    thumbnail: string,
    name: string,
    artists: string,
    onClickOutside: () => void
  }
  const props = withDefaults(defineProps<Props>(), {
    isOpen: true,
    id: '',
    thumbnail: '',
    name: '',
    artists: '',
    onClickOutside: () => {},
    textField: '',
    textArea: ''
  })
  const textFieldComputed = computed({
    get: () => props.textField,
    set: value => emits('changeTextField', value)
  })
  const textAreaComputed = computed({
    get: () => props.textArea,
    set: value => emits('changeTextArea', value)
  })
</script>

<style scoped lang="scss">
  .wrapper {
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100vw !important;
    background-color: rgba(0, 0, 0, 0.17);
    opacity: 0.2;
  }
  .container {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 1024px;
    border-radius: 25px 25px 0px 0px;
    background-color: $background-color;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.25);
    padding: 30px 15px;

    @media (min-width: 768px) {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .form_container {
    gap: 24px;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
  }
  .form_element {
    font-size: 14px;
  }
  .form_label {
    padding-bottom: 5px;
  }
  .submit_button_container {
    display: flex;
    justify-content: center;
    .submit_button {
      background: $gradient-orange;
      color: $text-color-white;
      width: 260px;
      padding: 12px 16px;
      font-size: 16px;
      border: none;
      border-radius: 24px;
      opacity: 1;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
      &:active {
        opacity: 0.8;
      }
    }
  }
  .music {
    max-width: calc(100vw - ($padding-wrapper * 2));
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 55px;
      height: 55px;
      object-fit: cover;
    }
    .text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .name, .artists {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        font-size: 16px;
        font-weight: 700;
        line-height: 23px;
      }
      .artists {
        font-weight: 400;
        font-size: 13px;
        line-height: 19px;
        color: $text-color-gray;
      }
    }
  }
</style>
