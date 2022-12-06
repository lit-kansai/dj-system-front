import path from 'path'
import { quasar } from '@quasar/vite-plugin'

const baseUrl = process.env.BASE_URL ?? ''
export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  build: {
    transpile: ['quasar', 'vuetify'],
  },
  components: [
    {
      path: '@/components/',
      pathPrefix: false,
    },
  ],
  css: [
    '@/assets/styles/main.scss',
    'quasar/dist/quasar.prod.css',
    '@quasar/extras/roboto-font/roboto-font.css',
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'DJ System Admin' },
    { name: 'robots', content: 'noindex' },
    { property: 'og:site_name', content: 'DJ System Admin' },
    { property: 'og:type', content: 'website' },
    { property: 'og:description', content: 'DJ Systemの管理画面サイト' },
    { property: 'og:title', content: 'DJ System Admin' },
    { property: 'og:url', content: baseUrl },
    { property: 'og:image', content: `${baseUrl}/ogp.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: 'DJ Gassi' },
  ],
  srcDir: 'src/',
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  vite: {
    define: {
      // 'process.env.DEBUG': false,
    },
    plugins: [
      quasar({
        sassVariables: 'assets/styles/quasar-variables.sass',
      }),
    ],
  },
})
