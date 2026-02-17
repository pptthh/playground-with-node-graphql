import React from 'react'
import { mount } from 'cypress/react'
import ServerClock from '../../src/components/server-clock'

describe('ServerClock component', () => {
  it('fetches and displays server time', () => {
    cy.intercept('POST', '/api/graphql', {
      statusCode: 200,
      body: {
        data: { serverTime: 1705315800000 },
      },
    }).as('getServerTime')

    mount(<ServerClock />)

    cy.get('[data-cy=loading]').should('exist')
    cy.wait('@getServerTime')
    cy.get('[data-cy=server-time]').should('contain.text', '2024-01-15T10:30:00.000Z')
  })

  it('fetches server time and ticks every second when live', () => {
    cy.clock()
    cy.intercept('POST', '/api/graphql', {
      statusCode: 200,
      body: {
        data: { serverTime: 1705315800000 },
      },
    }).as('getServerTime')

    mount(<ServerClock live />)

    cy.get('[data-cy=loading]').should('exist')
    cy.wait('@getServerTime')
    cy.get('[data-cy=live-clock]').should('contain.text', '2024-01-15T10:30:00.000Z')
    
    cy.tick(1000)
    cy.get('[data-cy=live-clock]').should('contain.text', '2024-01-15T10:30:01.000Z')
    
    cy.tick(1000)
    cy.get('[data-cy=live-clock]').should('contain.text', '2024-01-15T10:30:02.000Z')
  })
})
