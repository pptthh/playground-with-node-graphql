import { defineConfig } from 'cypress'

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'test/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'test/cfg/cypress.e2e.ts',
    screenshotsFolder: '.generated/screenshots',
    videosFolder: '.generated/videos',
  },
  component: {
    devServer: {
      bundler: 'webpack',
      framework: 'next',
    },
    specPattern: 'test/component/**/*.cy.{ts,tsx}',
    supportFile: 'test/cfg/cypress.component.ts',
    indexHtmlFile: 'test/cfg/component-index.html',
  },
})
