describe('Home page', () => {
  it('renders and shows the main heading', () => {
    cy.visit('/')
    cy.contains('To get started, edit the page.tsx file.').should('be.visible')
  })
})
