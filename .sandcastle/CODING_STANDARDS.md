# Coding Standards

Standards for React/TypeScript in this repo. The reviewer loads this via `@.sandcastle/CODING_STANDARDS.md`.

**ESLint baseline:** Mechanical rules are enforced by `@lichens-innovation/eslint-plugin-coding-guide` and [eslint.config.js](../eslint.config.js). Do not flag violations ESLint already catches; focus on the items below.

---

## React components (`**/*.tsx`)

- **Structure:** Follow the **react-single-responsibility** skill (decomposition, single responsibility). ESLint covers mechanical JSX/hook patterns (`no-jsx-in-variable`, `no-inline-render-function`, `hoist-static-component-constants`, etc.).
- **One component per file:** Each `.tsx` file exports exactly one React component (filename matches that component). Split helpers into colocated utils or sibling files instead of stacking multiple components in one module — easier discovery, reuse, and DRY.
- **Prop vs state naming:** When a prop seeds local state, use distinct names (e.g. prop `initialSortOrder`, state `sortOrder`). Do not reuse the same name for both.

---

## Naming (`**/*.ts`, `**/*.tsx`)

ESLint enforces kebab-case filenames, `use-*` hooks, `*-page` / `*-dialog` / `*-provider` suffixes, and generic root basenames (`utils.ts`, `types.ts`). Review domain-oriented names ESLint cannot fully infer:

| Pattern      | Example                                     |
| ------------ | ------------------------------------------- |
| Utils        | `<domain>.utils.ts`                         |
| Types        | `<domain>.types.ts` (avoid root `types.ts`) |
| Store        | `<domain>.store.ts`                         |
| Constants    | `<domain>.constants.ts`                     |
| Generated    | `*.gen.ts`                                  |
| Mock/fixture | `*.data.ts` or `*-mock.data.ts`             |
| Config       | `<domain>-config.ts`                        |
| API client   | `*.client.ts`                               |
| Query keys   | `query-keys.ts` (scoped)                    |
| Section      | `section-*.tsx`                             |
| Action UI    | `action-*.tsx`                              |
| Table        | `*-table.tsx`, `*-table-columns.tsx`        |

- Types with a single consumer → colocate above the component; no separate file.
- Avoid abbreviations (e.g. `export2xlsx.tsx` → `export-to-xlsx.tsx`).

---

## TypeScript (`**/*.ts`, `**/*.tsx`) — HIGH

| Avoid                                                                   | Prefer                                                                           |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `data as Config` at API / external boundaries                           | `configSchema.parse(data)` (zod / joi / yup)                                     |
| Sequential `await fnA(); await fnB();` when independent                 | `await Promise.all([fnA(), fnB()])` (or `allSettled` if partial failure OK)      |
| `items.forEach(async (item) => await fn(item))`                         | `for (const item of items) await fn(item)` or `Promise.all(items.map(fn))`       |
| Async / data-fetching subtrees with no boundary                         | `<ErrorBoundary fallback={...}>` per independent subtree                         |
| Using `req.body` / external payloads directly                           | `schema.parse(...)` / `safeParse` at the boundary                                |
| Raw `process.env.X` scattered in code                                   | `env = schema.parse(process.env)` once at startup                                |
| Mixing `fs.readFile(path, cb)` with `async/await`                       | `await fs.promises.readFile(...)` (or `util.promisify`)                          |
| `export default` for components / utils / hooks                         | Named exports (`export const MyThing = ...`); default only for framework entries |
| In-place mutation then `setState` (e.g. `user.age += 1; setUser(user)`) | Immutable updates (`setUser({ ...user, age: user.age + 1 })`)                    |
| Magic ms literals (e.g. `5 * 60 * 1000`)                                | `5 * PeriodsInMS.oneMinute` from `@lichens-innovation/ts-common`                 |
| Long templates with deep optional chains                                | Pre-compute named locals, then interpolate                                       |

---

## Security — CRITICAL (`**/*.ts`, `**/*.tsx`)

ESLint blocks `eval`, `new Function`, and raw `dangerouslySetInnerHTML`. If disabled via `eslint-disable`, verify justification and sanitize HTML (`DOMPurify.sanitize`).

| Rule                                                                                              |
| ------------------------------------------------------------------------------------------------- |
| No string interpolation in SQL/NoSQL → parameterized queries or ORM                               |
| No user input in `path.join` / `fs` → `path.resolve` + `startsWith(BASE_DIR + path.sep)`          |
| No hardcoded API keys, tokens, passwords → `process.env` validated with zod at startup            |
| No `Object.assign` / spread on untrusted external objects → zod schema first                      |
| No `exec()` / `spawn({ shell: true })` with user input → `execFile()` with args array + allowlist |

---

## Unit tests (`**/*.test.ts`, `**/*.test.tsx`, `**/*.spec.ts`, `**/*.spec.tsx`)

ESLint enforces query style (`screen.*`, `*ByRole` over `*ByTestId`) and colocated tests (no `__tests__/` folders). Review structure and quality:

| Avoid                                      | Prefer                                                 |
| ------------------------------------------ | ------------------------------------------------------ |
| Tests without clear Arrange / Act / Assert | Distinct AAA sections                                  |
| Mocking custom hooks without explicit spy  | `jest.spyOn` / `vi.spyOn` with explicit module imports |
| Many similar individual `it` blocks        | `it.each` for parametrized cases                       |
| Re-assignable object graph for mock data   | Mock factory with partial overrides                    |
