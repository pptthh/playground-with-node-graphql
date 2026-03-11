type User = { id: string; name: string; email?: string }

// in-memory sample data for the demo schema
const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
]

export const rootValue = {
  hello: (): string => 'Hello from GraphQL',
  serverTime: ((): number => {
    console.debug('Resolving serverTime field, returning current timestamp')
    return new Date().getTime()
  }),
  users: (): User[] => users,
  user: ({ id }: { id: string }): User | null => users.find((u) => u.id === id) || null,
  createUser: ({ name, email }: { name: string; email?: string }): User => {
    const user: User = { id: String(users.length + 1), name, email }
    users.push(user)
    return user
  },
}

export default rootValue
