import React from 'react'
import { mount } from 'cypress/react'
import { Wrapper } from '@/components/wrapper'

describe('Wrapper component', () => {
  it('renders children and respects props', () => {
    mount(
      <Wrapper data-cy="wrap" center maxW="md" className="bg-slate-50">
        <span data-cy="child">Wrapped</span>
      </Wrapper>
    )

    cy.get('[data-cy=wrap]').should('exist')
    cy.get('[data-cy=child]').should('contain.text', 'Wrapped')
    cy.get('[data-cy=wrap]').should('have.class', 'max-w-md')
    cy.get('[data-cy=wrap]').should('have.class', 'mx-auto')
  })

  it('can disable padding', () => {
    mount(
      <Wrapper data-cy="wrap2" padded={false}>
        <div>no padding</div>
      </Wrapper>
    )

    cy.get('[data-cy=wrap2]').should('exist')
    cy.get('[data-cy=wrap2]').should('not.have.class', 'p-4')
  })
})
