import React from 'react'
import { mount } from 'cypress/react'

describe('Simple component (component test)', () => {
  it('renders text and reacts to a button click', () => {
    const Counter: React.FC = () => {
      const [count, setCount] = React.useState(0)
      return (
        <div>
          <h1 data-cy="title">Hello Component</h1>
          <button onClick={() => setCount((c) => c + 1)}>Increment</button>
          <p data-cy="count">Count: {count}</p>
        </div>
      )
    }

    mount(<Counter />)

    cy.get('[data-cy=title]').should('contain.text', 'Hello Component')
    cy.get('button').contains('Increment').click()
    cy.get('[data-cy=count]').should('contain.text', 'Count: 1')
  })
})
