import path from 'path'

const baseUrl = process.env.BASE_URL ?? ''
export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  components: [
    {
      path: '@/components/',
      pathPrefix: false,
    },
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
  modules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/eslint-module',
  ],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
})
