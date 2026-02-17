export async function GET(): Promise<Response> {
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>GraphiQL - /api/graphql</title>
    <link rel="stylesheet" href="https://unpkg.com/graphiql/graphiql.min.css" />
    <style>html,body,#graphiql{height:100%;margin:0}</style>
  </head>
  <body>
    <div id="graphiql">Loading…</div>

    <script crossorigin src="https://unpkg.com/react/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/graphiql/graphiql.min.js"></script>
    <script>
      // fallback fetcher for GraphiQL
      function graphQLFetcher(graphQLParams) {
        return fetch('/api/graphql', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(graphQLParams),
          credentials: 'same-origin'
        }).then(function (response) { return response.json(); });
      }

      const root = document.getElementById('graphiql')
      ReactDOM.createRoot(root).render(
        React.createElement(GraphiQL, { fetcher: graphQLFetcher })
      )
    </script>
  </body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
