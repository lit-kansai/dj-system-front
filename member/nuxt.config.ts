import path from 'path'
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
        { property: 'og:url', content: ''},
        { property: 'og:image', content: `` },
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
      BASE_API_URL: '',
      MEMBER_SITE_URL: '',
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
