# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start Next.js dev server (http://localhost:3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm clean        # Clear cache + dist/.next
pnpm clean-dev    # Full clean + install + lint + build + dev

# Cypress tests (requires dev server running for e2e)
pnpm cy:oe        # Open Cypress e2e runner (Electron)
pnpm cy:oc        # Open Cypress component runner (Electron)
pnpm cy:re        # Run e2e tests headless
pnpm cy:rc        # Run component tests headless
```

Package manager: **pnpm** (v10.30). Node >= 24.12.0 required.

## Architecture

This is a **Next.js 16 / React 19** app that serves as a GraphQL learning playground.

### Key data flow

1. **GraphQL API** — `src/app/api/graphql/route.ts` is a Next.js Route Handler accepting POST requests. It imports `schema` from `src/graphql/schema.ts` (SDL built with `buildSchema`) and `rootValue` from `src/graphql/resolvers.ts` (in-memory users array, no database).
2. **GraphiQL UI** — `src/app/api/graphql/ui/route.ts` returns a static HTML page that loads GraphiQL from unpkg and points it at `/api/graphql`.
3. **ServerClock component** — `src/components/server-clock.tsx` is a client component that fetches `{ serverTime }` from the GraphQL API on mount, then optionally ticks locally every second when `live` prop is set.
4. **Wrapper component** — `src/components/wrapper.tsx` attaches DOM event listeners (`mouseup`, `mousemove`, `click`, etc.) to `document.body` via `src/app/utils/event-listeners.ts` for mouse/event tracking experiments.

### Testing

- **Component tests**: `test/component/` — mount individual React components, intercept GraphQL requests with `cy.intercept`.
- **E2E tests**: `test/e2e/` — run against `http://localhost:3000`. The GraphQL e2e spec tests all queries/mutations directly via `cy.request`.
- `data-cy` attributes are used as Cypress selectors (e.g. `data-cy="live-clock"`, `data-cy="loading"`).
- Test config/support files live in `test/cfg/`.

### ESLint rules worth knowing

- Files must use **kebab-case** naming (`eslint-plugin-check-file`).
- `no-magic-numbers` warns on numeric literals other than -1, 0, 1 — extract constants.
- `@typescript-eslint/no-unused-vars` is an error; prefix intentionally unused args with `_`.
- `no-console` warns except for `console.debug`, `console.warn`, `console.error`.
