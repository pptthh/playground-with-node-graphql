describe('GraphQL API (e2e)', () => {
  it('responds to a simple hello query', () => {
    cy.request('POST', '/api/graphql', { query: '{ hello }' }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.deep.equal({ hello: 'Hello from GraphQL' })
    })
  })

  it('returns users list', () => {
    cy.request('POST', '/api/graphql', { query: '{ users { id name email } }' }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body.data.users).to.be.an('array').and.have.length.of.at.least(2)
      expect(res.body.data.users[0]).to.include.keys('id', 'name', 'email')
    })
  })

  it('creates a user via mutation', () => {
    const query = 'mutation($n:String!,$e:String){ createUser(name:$n,email:$e){ id name email } }'
    const variables = { n: 'Eve', e: 'eve@example.com' }

    cy.request('POST', '/api/graphql', { query, variables }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body.data.createUser).to.include({ name: 'Eve', email: 'eve@example.com' })
      expect(res.body.data.createUser).to.have.property('id')
    })
  })
})
