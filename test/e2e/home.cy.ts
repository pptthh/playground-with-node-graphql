describe('Home page', () => {
  beforeEach(() => cy.visit('/'))

  it('shows the main heading', () => {
    cy.contains('To get started, edit the page.tsx file.').should('be.visible')
  })

  it('contains Templates and Learning links with correct hrefs', () => {
    cy.get('a').contains('Templates').should('have.attr', 'href').and('include', 'vercel.com/templates')
    cy.get('a').contains('Learning').should('have.attr', 'href').and('include', 'nextjs.org/learn')
  })

  it('has Deploy Now button that opens external link and has image', () => {
    cy.get('a').contains('Deploy Now').should('have.attr', 'href').and('include', 'vercel.com/new')
    cy.get('a').contains('Deploy Now').find('img, svg').should('exist')
  })

  it('Documentation link is present and points to nextjs docs', () => {
    cy.get('a').contains('Documentation').should('have.attr', 'href').and('include', 'nextjs.org/docs')
  })
})
