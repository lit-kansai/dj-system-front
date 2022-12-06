import { Quasar } from 'quasar'
import * as components from 'quasar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    plugins: {},
    components,
  })
})
