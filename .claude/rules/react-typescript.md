---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript coding rules

## HIGH

| Avoid | Prefer |
| --- | --- |
| Chained ternaries 2+ levels deep in one expression | Early `return` per branch |
| `any` for function params, returns or variables | `interface` for object shapes; `type` for unions / aliases / `Record` |
| Functions with 2+ positional parameters `const foo = (a: number, b: string) => {...}`  | Single object param with `interface FooArgs` immediately above the function, then `const foo = ({ a, b }: FooArgs) => {...}` (one positional param is OK) |
| `try { ... } catch (e) {}` empty / silenced catch | Log via structured logger; if you only rethrow unchanged, drop the `try/catch` |
| `!=` / `==` loose equality | `!==` / `===` strict equality |
| `enum Foo { A, B }` implicit ordinals | `enum Foo { A = 1, B = 2 }` explicit numeric values |
| Nested `if` / `else` cascades for guard conditions | Early `return` for each invalid case at the top |
| Inline `({ ... }: { ... })` types in a function signature | Extracted `interface FooArgs` above the function, `export`ed when shared |
| `value!` non-null assertion without a prior runtime guard | `if (!value) return ...` then use the narrowed `value` |
| `data as Config` cast at an API / external boundary | `configSchema.parse(data)` runtime validation (zod / joi / yup) |
| `async fn()` called without `await`, `.catch()` or `void` | `await fn()`, `fn().catch(...)`, or `void fn()` documented fire-and-forget |
| Sequential `await fnA(); await fnB();` for independent calls | `await Promise.all([fnA(), fnB()])` (or `allSettled` if partial failure OK) |
| Floating promises in event handlers / constructors | `await` inside an `async` handler, or expose `readonly ready: Promise<void>` |
| `items.forEach(async (item) => await fn(item))` | `for (const item of items) await fn(item)` or `Promise.all(items.map(fn))` |
| `JSON.parse(raw)` outside a `try / catch` | `try { JSON.parse(raw) } catch (e) { ... }` then validate the parsed shape |
| `throw "string"` / `throw { code: 404 }` / `throw null` | `throw new Error(...)` or a typed `class XxxError extends Error` |
| Async / data-fetching subtrees rendered with no boundary | `<ErrorBoundary fallback={...}>` wrapping each independent subtree |
| Module-level `let currentUser = null` mutated by exports | Dedicated state layer (e.g. `zustand` `create<State>()`) |
| `var x = ...` declarations | `const` by default, `let` only when reassigned (block-scoped) |
| Exported functions with no declared return type | Explicit `: ReturnType` on every exported function signature |
| Mixing `fs.readFile(path, cb)` callbacks with `async / await` in the same flow | `await fs.promises.readFile(...)` (or `util.promisify`) standardised on async/await |
| Using `req.body` / external payloads directly | Validate at the boundary with `schema.parse(...)` / `safeParse` (zod) |
| `process.env.X` read raw across the codebase | `env = schema.parse(process.env)` validated once at startup |
| `const x = require("pkg")` in TS / ESM files | `import { x } from "pkg"` static, `await import(...)` for dynamic |

## MEDIUM

| Avoid | Prefer |
| --- | --- |
| `let x = ...` when `x` is never reassigned | `const x = ...` |
| Nested `try { try { ... } catch }` blocks | One flat `try / catch` combining the error paths |
| `try { fn() } catch (e) { throw e }` rethrowing unchanged | Let the exception propagate (drop the `try/catch`) or actually handle / log it |
| `if (value !== null && value !== undefined)` / `value === ""` manual checks | `isNullish(value)` / `isBlank(value)` / `isNotBlank(value)` from `@lichens-innovation/ts-common` |
| Negated predicate ternaries / guards like `!isNullish(value) ? map(value) : fallback` | Positive-first branching like `isNullish(value) ? fallback : map(value)` |
| `export default` for components / utils / hooks | `export const MyThing = ...` named export (default only for framework entries) |
| `function fn() {}` declarations for module-scoped logic | `const fn = () => {}` arrow assigned to `const` |
| `x === "a" \|\| x === "b" \|\| x === "c"` repeated comparisons | `["a", "b", "c"].includes(x)` |
| `user.age += 1; setUser(user)` in-place mutation of React state | `setUser({ ...user, age: user.age + 1 })` new object reference |
| `for (const id of ids) await fetch(id)` sequential awaits over independent calls | `await Promise.all(ids.map((id) => fetch(id)))` |
| `import _ from "lodash"` whole-package default import | `import { groupBy } from "lodash-es"` named tree-shakeable import |
| `console.log(...)` calls in production code paths | Structured `logger.info(...)` with explicit safe fields |
| `user?.address?.location?.city` dangling deep optional chain | `user?.address?.location?.city ?? "Unknown"` ending with a `?? fallback` |

## LOW

| Avoid | Prefer |
| --- | --- |
| `array.find((x) => cond) !== undefined` for existence checks | `array.some((x) => cond)` |
| `5 * 60 * 1000` magic numbers for durations in ms | `5 * PeriodsInMS.oneMinute` from `@lichens-innovation/ts-common` |
| `param: Type \| undefined` in a function signature | `param?: Type` optional parameter syntax |
| Long template strings inlining deep chains like `obj?.a?.b?.c ?? "NA"` | Pre-compute named locals (`const city = ...`) then interpolate |
| `{ [key: string]: V }` custom index signatures | `Record<KnownKey, V>` utility type |
| `type UserProps = { ... }` for plain object shapes | `interface UserProps { ... }`; keep `type` for unions / mapped / `Record` |
| `// TODO: fix this` bare TODO with no reference | `// TODO [PROJ-123]: description` with ticket ID |
| `value \|\| "default"` when `0` / `""` / `false` are valid values | `value ?? "default"` nullish coalescing |
| `Dimensions.get("window")` static read in React Native components | `useWindowDimensions()` reactive hook |
