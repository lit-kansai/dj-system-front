import { CurrentError } from '~~/src/types/error'

declare module '#app' {
  interface NuxtApp {
    currentError(): Ref<CurrentError>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    currentError(): Ref<CurrentError>
  }
}

export {}
