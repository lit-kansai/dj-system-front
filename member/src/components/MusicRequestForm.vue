<template>
  <div class="container">
    <div class="left">
      <img :src="albumUrl">
    </div>
    <div class="right">
      <div class="music">
        <img :src="albumUrl">
        <div class="name">
          <p class="music_name">{{ musicName }}</p>
          <p class="artist_name">{{ artistName }}</p>
        </div>
      </div>
      <div class="form_container">
        <div class="form_element">
          <p class="form_label">ニックネーム(匿名OK)</p>
          <TextField v-model="textFieldComputed" :text="props.textField" placeholder="がっしー" :on-focus="onFocus" :on-blur="onBlur" />
        </div>
        <div class="form_element">
          <p class="form_label">メッセージ</p>
          <TextArea v-model="textAreaComputed" :text="props.textArea" placeholder="開発ここまで終わったよ！（入力しなくても送信できるよ！）" :on-focus="onFocus" :on-blur="onBlur" />
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
  const { isMobileOrTablet } = useDevice()
  const emits = defineEmits<{
    (e: 'changeTextField', value: string): void,
    (e: 'changeTextArea', value: string): void
    (e: 'onClickSubmitButton'): void
  }>()

  interface Props {
    musicName: string,
    artistName: string,
    albumUrl: string
    textField: string,
    textArea: string
  }
  const props = withDefaults(defineProps<Props>(), {
    musicName: '',
    artistName: '',
    albumUrl: '',
    textField: '',
    textArea: ''
  })

  const state = reactive({
    pageYOffset: 0
  })

  const onFocus = () => {
    if (!isMobileOrTablet) { return }
    state.pageYOffset = window.pageYOffset
    const element = document.documentElement
    const bottom = element.scrollHeight - element.clientHeight
    window.scroll(0, bottom)
  }

  const onBlur = () => {
    if (!isMobileOrTablet) { return }
    window.scroll(0, state.pageYOffset)
  }

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
  .container {
    @include pc() {
      display: flex;
      align-items: center;
      gap: 30px;
      padding: 90px;
    }
  }
  .left {
    display: none;
    @include pc() {
      display: block;
    }
    img {
      width: 400px;
      height: 400px;
      object-fit: cover;
    }
  }
  .right {
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    .music {
      max-width: calc(100vw - ($padding-wrapper * 2));
      display: flex;
      align-items: center;
      gap: 10px;
      @include tablet() {
        max-width: calc(100vw - ($tablet-padding-wrapper * 2));
      }
      img {
        width: 55px;
        height: 55px;
        object-fit: cover;
        @include pc() {
          display: none;
        }
      }
      .name, .music_name, .artist_name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        .music_name {
          font-size: 16px;
          color: $text-color-black;
          font-weight: 700;
          @include pc() {
            font-size: 40px;
            margin-left: -3px;
          }
        }
        .artist_name {
          font-size: 13px;
          color: $text-color-gray;
          @include pc() {
            font-size: 20px;
          }
        }
      }
    }
    .form_container {
      gap: 24px;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      .form_element {
        font-size: 14px;
      }
      .form_label {
        padding-bottom: 5px;
      }
    }
  }

  .submit_button_container {
    text-align: center;
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
</style>
