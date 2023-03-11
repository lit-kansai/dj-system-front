import * as quasar from 'quasar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(quasar.Quasar, {
    plugins: {
      Loading: quasar.Loading
    },
    directives: quasar,
    components: quasar,
  })
})
