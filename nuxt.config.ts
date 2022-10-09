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
  buildModules: [],
  router: {
    middleware: [],
  },
  alias: {
    '@': path.resolve(__dirname),
  },
})
