import path from 'path'
const baseUrl = process.env.HOST_URL ?? 'not found'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'DJ Gassi System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '自分の好きな曲をリクエストしよう！' },
        { name: 'robots', content: 'noindex' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0' },
        { property: 'og:site_name', content: 'DJ Gassi System' },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: '自分の好きな曲をリクエストしよう！' },
        { property: 'og:title', content: 'DJ Gassi System' },
        { property: 'og:url', content: baseUrl },
        { property: 'og:image', content: `${baseUrl}/ogp.png` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'fb:app:id', content: 'dj_gassi_system' },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: ''
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap'
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    },
  },
  ssr: false,
  dev: process.env.NODE_ENV !== 'production',
  components: [
    {
      path: 'components',
      pathPrefix: false,
    },
  ],
  srcDir: 'src/',
  imports: {
    dirs: ['utils', 'data'],
  },
  runtimeConfig: {
    public: {
      BASE_API_URL: process.env.BASE_API_URL,
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
            @import "@/assets/css/variables.scss";
            @import "@/assets/css/reset.scss";
            @import "@/assets/css/global.scss";
          `,
        },
      },
    },
  },
  modules: [
    '@nuxtjs/device'
  ]
})
