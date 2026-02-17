const HTTP_OK = 200
const MIN_USERS_COUNT = 2

describe('GraphQL API (e2e)', () => {
  it('responds to a simple hello query', () => {
    cy.request('POST', '/api/graphql', { query: '{ hello }' }).then((res) => {
      expect(res.status).to.equal(HTTP_OK)
      expect(res.body).to.have.property('data')
      expect(res.body.data).to.deep.equal({ hello: 'Hello from GraphQL' })
    })
  })

  it('returns users list', () => {
    cy.request('POST', '/api/graphql', { query: '{ users { id name email } }' }).then((res) => {
      expect(res.status).to.equal(HTTP_OK)
      expect(res.body.data.users).to.be.an('array').and.have.length.of.at.least(MIN_USERS_COUNT)
      expect(res.body.data.users[0]).to.include.keys('id', 'name', 'email')
    })
  })

  it('creates a user via mutation', () => {
    const query = 'mutation($n:String!,$e:String){ createUser(name:$n,email:$e){ id name email } }'
    const variables = { n: 'Eve', e: 'eve@example.com' }

    cy.request('POST', '/api/graphql', { query, variables }).then((res) => {
      expect(res.status).to.equal(HTTP_OK)
      expect(res.body.data.createUser).to.include({ name: 'Eve', email: 'eve@example.com' })
      expect(res.body.data.createUser).to.have.property('id')
    })
  })

  it('returns server time as ISO string', () => {
    cy.request('POST', '/api/graphql', { query: '{ serverTime }' }).then((res) => {
      expect(res.status).to.equal(HTTP_OK)
      expect(res.body).to.have.property('data')
      expect(res.body.data.serverTime).to.be.a('string')
      // Basic ISO format check (YYYY-MM-DDTHH:MM:SS)
      expect(res.body.data.serverTime).to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/u)
      const returned = new Date(res.body.data.serverTime).getTime()
      expect(returned).to.be.a('number').and.to.be.greaterThan(0)
    })
  })

  it('serves GraphiQL UI at /api/graphql/ui', () => {
    cy.request('/api/graphql/ui').then((res) => {
      expect(res.status).to.equal(HTTP_OK)
      expect(res.headers['content-type']).to.include('text/html')
      expect(res.body).to.include('GraphiQL')
      expect(res.body).to.include('/api/graphql')
    })
  })
})
