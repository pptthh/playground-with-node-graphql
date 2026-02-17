const DEFAULT_VIEWPORT_WIDTH = 800
const DEFAULT_VIEWPORT_HEIGHT = 600

// Cypress support file (loaded before test files)
// Place global configuration and behavior that modifies Cypress here.

/// <reference types="cypress" />

// Prevent tests from failing on uncaught exceptions in the app under test.
// Return false to allow the test run to continue.
Cypress.on('uncaught:exception', (_err, _runnable) => {
  // add filtering here if you only want to ignore specific errors
  return false
})

// Set a default viewport for all tests (override inside individual tests if needed)
before(() => {
  cy.viewport(DEFAULT_VIEWPORT_WIDTH, DEFAULT_VIEWPORT_HEIGHT)
})

// Export to make this file a module (keeps TypeScript happy)
export {}
