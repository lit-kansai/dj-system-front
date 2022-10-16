import path from 'path'

export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  components: [
    {
      path: '@/components/',
      pathPrefix: false,
    },
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
