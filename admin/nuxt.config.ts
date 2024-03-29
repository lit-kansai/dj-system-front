import path from 'path'
import { quasar } from '@quasar/vite-plugin'

const baseUrl = process.env.HOST_URL ?? 'not found'
export default defineNuxtConfig({
  telemetry: false,
  app: {
    head: {
      title: 'DJ Gassi Console',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'DJ System Console' },
        { name: 'robots', content: 'noindex' },
        { property: 'og:site_name', content: 'DJ System Console' },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'DJ Systemの管理画面サイト' },
        { property: 'og:title', content: 'DJ System Console' },
        { property: 'og:url', content: baseUrl },
        { property: 'og:image', content: `${baseUrl}/ogp.png` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: 'DJ Gassi' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ],
      script: [
        { src: 'https://js-cdn.music.apple.com/musickit/v3/musickit.js' }
      ]
    }
  },
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
  ],
  css: [
    'quasar/dist/quasar.prod.css',
    '@quasar/extras/roboto-font/roboto-font.css',
    '@quasar/extras/material-icons/material-icons.css',
    '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
    '@quasar/extras/fontawesome-v5/fontawesome-v5.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  srcDir: 'src/',
  imports: {
    dirs: ['utils', 'data'],
  },
  runtimeConfig: {
    public: {
      BASE_API_URL: process.env.NUXT_PUBLIC_BASE_API_URL ?? '',
      MEMBER_SITE_URL: process.env.MEMBER_SITE_URL ?? '',
      MOCK_ENABLED: false,
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/main.scss";
          `,
        },
      },
    },
    plugins: [
      quasar({
        sassVariables: 'assets/styles/quasar-variables.sass',
      }),
    ],
  },
})
