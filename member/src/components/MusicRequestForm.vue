<template>
  <div class="container">
    <div class="left">
      <img :src="albumUrl">
    </div>
    <div class="right">
      <p class="music_name">{{ musicName }}</p>
      <p class="artist_name">{{ artistName }}</p>
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
    musicName: string,
    artistName: string,
    albumUrl: string
  }

  const props = withDefaults(defineProps<Props>(), {
    musicName: '',
    artistName: '',
    albumUrl: '',
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
  .container {
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 70px;
    img {
      width: 400px;
      height: 400px;
      object-fit: cover;
    }
  }
  .music_name {
    font-size: 48px;
    color: $text-color-black;
    font-weight: 700;
    margin-left: -5px;
  }
  .artist_name {
    font-size: 20px;
    color: $text-color-gray;
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
  .right {
    flex-grow: 1;
  }

  .submit_button_container {
    text-align: center;
  }
</style>
