import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'test/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress.config.e2e.ts',
    allowCypressEnv: false,
  },
})
