import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4444',
    supportFile: './cypress/support/index.ts',
    env: {
      NODE_ENV: 'development',
    },
  },
})
