type User = { id: string; name: string; email?: string }

// in-memory sample data for the demo schema
const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
]

export const rootValue = {
  hello: () => 'Hello from GraphQL',
  serverTime: () => new Date().toISOString(),
  users: () => users,
  user: ({ id }: { id: string }) => users.find((u) => u.id === id) || null,
  createUser: ({ name, email }: { name: string; email?: string }) => {
    const user: User = { id: String(users.length + 1), name, email }
    users.push(user)
    return user
  },
}

export default rootValue
