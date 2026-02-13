import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'test/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress.config.e2e.ts',
    screenshotsFolder: '.generated/screenshots',
    videosFolder: '.generated/videos',
  },
  component: {
    devServer: {
      bundler: 'webpack',
      framework: 'next',
    },
    specPattern: 'test/component/**/*.cy.{ts,tsx}',
    supportFile: 'cypress.config.component.ts',
  },
})
