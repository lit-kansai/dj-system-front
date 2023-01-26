import path from 'path'
import { quasar } from '@quasar/vite-plugin'
import { domainComponentsPaths } from './src/data'
import { isDev } from './src/utils/is-dev'

const baseUrl = process.env.BASE_URL ?? ''
export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  dev: process.env.NODE_ENV !== 'production',
  build: {
    transpile: ['quasar'],
  },
  components: [
    {
      path: 'components',
      pathPrefix: false,
    },
    // /directory/**/ みたいな記法が壊れてるのでこんな感じでやってます
    ...domainComponentsPaths,
  ],
  css: [
    '@/assets/styles/main.scss',
    'quasar/dist/quasar.prod.css',
    '@quasar/extras/roboto-font/roboto-font.css',
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
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
  imports: {
    dirs: ['features/**/api/', 'utils', 'data'],
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: isDev ? process.env.API_URL_STAGING : process.env.API_URL_PROD
    }
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  hooks: {
    'prepare:types': ({ tsConfig }) => {
      const aliasesToRemoveFromAutocomplete = ['~~', '~~/*', '~', '~/*', '@@', '@@/*']
      for (const alias of aliasesToRemoveFromAutocomplete) {
        if (tsConfig.compilerOptions?.paths[alias]) {
          delete tsConfig.compilerOptions.paths[alias]
        }
      }
    }
  },
  vite: {
    plugins: [
      quasar({
        sassVariables: 'assets/styles/quasar-variables.sass',
      }),
    ],
  },
})
