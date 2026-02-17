import { buildSchema } from 'graphql'

// Minimal GraphQL schema (SDL) for demo / playground
export const schema = buildSchema(`
  type Query {
    hello: String!
    serverTime: Float!
    user(id: ID!): User
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String
  }

  type Mutation {
    createUser(name: String!, email: String): User!
  }
`)

export default schema
