import React from 'react'
import { mount } from 'cypress/react'
import ServerTime from '../../src/components/server-time'

describe('ServerTime component', () => {
  it('fetches and displays server time', () => {
    cy.intercept('POST', '/api/graphql', {
      statusCode: 200,
      body: {
        data: { serverTime: '2024-01-15T10:30:00.000Z' },
      },
    }).as('getServerTime')

    mount(<ServerTime />)

    cy.get('[data-cy=loading]').should('exist')
    cy.wait('@getServerTime')
    cy.get('[data-cy=server-time]').should('contain.text', '2024-01-15T10:30:00.000Z')
  })
})
