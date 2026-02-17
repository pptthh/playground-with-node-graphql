import { graphql } from 'graphql'
import { schema } from '@/graphql/schema'
import { rootValue } from '@/graphql/resolvers'

export async function POST(req: Request): Promise<Response> {
  const body = await req.json().catch(() => ({}))
  const { query, variables, operationName } = body as {
    query?: string
    variables?: Record<string, unknown>
    operationName?: string
  }

  if (!query) {
    return new Response(
      JSON.stringify({ errors: [{ message: 'No GraphQL query provided' }] }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const result = await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue,
    operationName,
  })

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  })
}
