<template>
  <div class="wrapper">
    <div class="container">
      <h1 class="gradient-title">{{ errorTitle }}</h1>
      <p class="error-overview">{{ errorOverview }}</p>
      <GradientButton v-if="isShowReloadButton" class="button-container" title="再読み込みする" @click.native="reloadPage()" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { handleAPIClientError } from './libs'
  type AppError = {
    url: string;
    statusCode: number;
    statusMessage: string;
    message: string;
    description: string;
    data?: unknown;
  }

  const isAppError = (arg: unknown): arg is AppError => {
    return arg != null && typeof arg === 'object' && 'statusCode' in arg
  }
  const statusCode = ref('')
  const errorTitle = ref('問題が発生しました')
  const errorOverview = ref('')
  const isShowReloadButton = ref(true)
  const error = useError().value
  const reloadPage = () => {
    window.location.reload()
  }
  onMounted(() => {
    if (error && isAppError(error) && error.data instanceof Error) {
      handleAPIClientError(error.data, {
        onAxiosError: (axiosError) => {
          if (axiosError.response) {
            statusCode.value = String(axiosError.response?.status)
            switch (axiosError.response.status) {
            case 404:
              errorTitle.value = 'ページが見つかりません'
              errorOverview.value = 'URLが違います。メンターに正しいURLを聞いてみましょう！'
              isShowReloadButton.value = false
              break
            case 500:
              errorOverview.value = '一時的にアクセスできない状況です。時間をおいて再度お試しください。'
              break
            }
          }
          if (!errorOverview.value.length) { errorOverview.value = axiosError.message }
        },
        onZodError: (_) => {
          errorOverview.value = 'レスポンスのパース中にエラーが発生しました。'
        },
        onUnexpectedError: (_) => {
          errorOverview.value = '予期せぬエラーが発生しました。'
        }
      })
    } else if ((error?.message)?.includes('Page not found')) {
      errorTitle.value = 'ページが見つかりません'
      errorOverview.value = 'URLが違います。メンターに正しいURLを聞いてみましょう！'
      isShowReloadButton.value = false
    } else {
      errorOverview.value = String(error?.message)
    }
  })
  useHead({
    style: [{ children: 'body{margin: 0}' }]
  })
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100dvh;
    .container {
      text-align: center;
      margin-bottom: 30px;
    }
  }
  .gradient-title {
    font-family: $font-english;
    font-weight: 700;
    display: inline-block;
    font-size: 26px;
    line-height: 30px;
    letter-spacing: 0.1em;
    margin-right: -0.1em;
    background: $color-gradient-orange;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    margin-top: 14px;
  }
  .error-overview {
    font-weight: 600;
  }
  .button-container {
    margin-top: 55px;
  }
</style>
