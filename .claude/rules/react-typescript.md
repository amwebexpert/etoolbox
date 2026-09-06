---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript coding rules

> Mechanical rules are enforced by ESLint (`@lichens-innovation/eslint-plugin-coding-guide` + [eslint.config.js](../../eslint.config.js)). Do not flag violations ESLint already catches.

## HIGH

| Avoid | Prefer |
| --- | --- |
| `data as Config` cast at an API / external boundary | `configSchema.parse(data)` runtime validation (zod / joi / yup) |
| Sequential `await fnA(); await fnB();` for independent calls | `await Promise.all([fnA(), fnB()])` (or `allSettled` if partial failure OK) |
| `items.forEach(async (item) => await fn(item))` | `for (const item of items) await fn(item)` or `Promise.all(items.map(fn))` |
| Async / data-fetching subtrees rendered with no boundary | `<ErrorBoundary fallback={...}>` wrapping each independent subtree |
| Using `req.body` / external payloads directly | Validate at the boundary with `schema.parse(...)` / `safeParse` (zod) |
| `process.env.X` read raw across the codebase | `env = schema.parse(process.env)` validated once at startup |
| Mixing `fs.readFile(path, cb)` callbacks with `async / await` in the same flow | `await fs.promises.readFile(...)` (or `util.promisify`) standardised on async/await |
| Exported functions with no declared return type | Explicit `: ReturnType` on every exported function signature |

## MEDIUM

| Avoid | Prefer |
| --- | --- |
| `export default` for components / utils / hooks | `export const MyThing = ...` named export (default only for framework entries) |
| `user.age += 1; setUser(user)` in-place mutation of React state | `setUser({ ...user, age: user.age + 1 })` new object reference |

## LOW

| Avoid | Prefer |
| --- | --- |
| `5 * 60 * 1000` magic numbers for durations in ms | `5 * PeriodsInMS.oneMinute` from `@lichens-innovation/ts-common` |
| Long template strings inlining deep chains like `obj?.a?.b?.c ?? "NA"` | Pre-compute named locals (`const city = ...`) then interpolate |
