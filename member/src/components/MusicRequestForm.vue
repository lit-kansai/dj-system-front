<template>
  <div class="container">
    <div v-if="requestMusicLoading" class="loading">
      <MusicLoading />
    </div>
    <div class="left">
      <img :src="albumUrl" />
    </div>
    <div class="right">
      <div class="music">
        <img data-test-id="modal-album-url" :src="albumUrl">
        <div class="name">
          <h2 data-test-id="modal-music-name" class="music_name">{{ musicName }}</h2>
          <p data-test-id="modal-artist-name" class="artist_name">{{ artistName }}</p>
        </div>
      </div>
      <div class="form_container">
        <div>
          <p class="form_label">ニックネーム<span class="optional">- 任意</span></p>
          <TextField v-model="textFieldComputed" :text="props.textField" placeholder="がっしー" :on-focus="onFocus" :on-blur="onBlur" />
        </div>
        <div>
          <p class="form_label">メッセージ<span class="optional">- 任意</span></p>
          <TextArea v-model="textAreaComputed" :text="props.textArea" placeholder="開発ここまで終わったよ！" :on-focus="onFocus" :on-blur="onBlur" />
        </div>
        <div class="submit_button_container">
          <button
            data-test-id="modal-submit-button"
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
  const { requestMusicLoading } = useRequestMusicLoading()

  interface Props {
    musicName: string,
    artistName: string,
    albumUrl: string,
    textField: string,
    textArea: string,
  }
  const props = withDefaults(defineProps<Props>(), {
    musicName: '',
    artistName: '',
    albumUrl: '',
    textField: '',
    textArea: '',
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
    .loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 20px;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.3);
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
      display: flex;
      align-items: center;
      gap: 10px;
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
          color: $color-body;
          @include pc() {
            font-size: 40px;
            line-height: 58px;
          }
        }
        .artist_name {
          color: $color-gray;
        }
      }
    }
    .form_container {
      gap: 24px;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      .form_label {
        padding-bottom: 5px;
      }
      .optional {
        color: $color-gray;
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }

  .submit_button_container {
    text-align: center;
    .submit_button {
      background: $color-gradient-orange;
      color: $color-white;
      width: 100%;
      max-width: 260px;
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
