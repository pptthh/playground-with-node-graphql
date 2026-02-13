// Cypress support file (loaded before test files)
// Place global configuration and behavior that modifies Cypress here.

/// <reference types="cypress" />

// Prevent tests from failing on uncaught exceptions in the app under test.
// Return false to allow the test run to continue.
Cypress.on('uncaught:exception', (err, runnable) => {
  // add filtering here if you only want to ignore specific errors
  return false
})

// Set a default viewport for all tests (override inside individual tests if needed)
before(() => {
  cy.viewport(1280, 720)
})

// Export to make this file a module (keeps TypeScript happy)
export {}
