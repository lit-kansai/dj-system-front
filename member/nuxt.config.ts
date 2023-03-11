import path from 'path'
const baseUrl = process.env.HOST_URL ?? 'not found'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'DJ System Admin' },
        { name: 'robots', content: 'noindex' },
        { property: 'og:site_name', content: 'DJ System Admin' },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'DJ Systemの管理画面サイト' },
        { property: 'og:title', content: 'DJ System' },
        { property: 'og:url', content: baseUrl },
        { property: 'og:image', content: `${baseUrl}/ogp.png` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: 'DJ System' },
      ],
    }
  },
  ssr: true,
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
})
