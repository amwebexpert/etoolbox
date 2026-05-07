# Coding Standards

## Naming conventions rules

Files and folders naming conventions

- **kebab-case everywhere** — no camelCase, PascalCase, or snake_case in file/folder names
- Hooks → `use-<name>.ts` (e.g. `use-conversations.ts`)
- Utils → `<domain>.utils.ts` (e.g. `chat.utils.ts`)
- Types → `<domain>.types.ts`; avoid `types.ts` at root
- Store → `<domain>.store.ts`
- Constants → `<domain>.constants.ts`
- Generated → `*.gen.ts`
- Mock/fixture → `*.data.ts` or `*-mock.data.ts`
- Config → `<domain>-config.ts`
- API client → `*.client.ts`
- Query keys → `query-keys.ts` (scoped)
- Page/screen → `*-page.tsx`
- Dialog → `*-dialog.tsx`
- Section → `section-*.tsx`
- Action UI → `action-*.tsx`
- Provider → `*-provider.tsx`
- Table → `*-table.tsx`, `*-table-columns.tsx`
- Folder names: lowercase kebab-case (`test-list`, not `TestList`)
- Avoid generic root-level names (`utils.ts` → `logger.utils.ts`)
- Avoid abbreviations (`export2xlsx.tsx` → `export-to-xlsx.tsx`)
- Types with a single consumer → colocate above the component, no separate file

## Security rules

- No `eval()` or `new Function()` with any input → use lookup maps or `JSON.parse`
- No `innerHTML` / `dangerouslySetInnerHTML` with raw user data → `DOMPurify.sanitize` first
- No string interpolation in SQL/NoSQL queries → parameterized queries or ORM
- No user input in `path.join` / `fs` calls → `path.resolve` + `startsWith(BASE_DIR + path.sep)` check
- No hardcoded API keys, tokens, passwords → `process.env` validated with zod at startup
- No `Object.assign` / spread with untrusted external objects → zod schema first
- No `exec()` / `spawn({shell:true})` with user input → `execFile()` with args array + allowlist

## TypeScript coding rules

| Avoid                                                                                 | Prefer                                                                                                                                                    |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chained ternaries 2+ levels deep in one expression                                    | Early `return` per branch                                                                                                                                 |
| `any` for function params, returns or variables                                       | `interface` for object shapes; `type` for unions / aliases / `Record`                                                                                     |
| Functions with 2+ positional parameters `const foo = (a: number, b: string) => {...}` | Single object param with `interface FooArgs` immediately above the function, then `const foo = ({ a, b }: FooArgs) => {...}` (one positional param is OK) |
| `try { ... } catch (e) {}` empty / silenced catch                                     | Log via structured logger; if you only rethrow unchanged, drop the `try/catch`                                                                            |
| `!=` / `==` loose equality                                                            | `!==` / `===` strict equality                                                                                                                             |
| `enum Foo { A, B }` implicit ordinals                                                 | `enum Foo { A = 1, B = 2 }` explicit numeric values                                                                                                       |
| Nested `if` / `else` cascades for guard conditions                                    | Early `return` for each invalid case at the top                                                                                                           |
| Inline `({ ... }: { ... })` types in a function signature                             | Extracted `interface FooArgs` above the function, `export`ed when shared                                                                                  |
| `value!` non-null assertion without a prior runtime guard                             | `if (!value) return ...` then use the narrowed `value`                                                                                                    |
| `data as Config` cast at an API / external boundary                                   | `configSchema.parse(data)` runtime validation (zod / joi / yup)                                                                                           |
| `async fn()` called without `await`, `.catch()` or `void`                             | `await fn()`, `fn().catch(...)`, or `void fn()` documented fire-and-forget                                                                                |
| Sequential `await fnA(); await fnB();` for independent calls                          | `await Promise.all([fnA(), fnB()])` (or `allSettled` if partial failure OK)                                                                               |
| Floating promises in event handlers / constructors                                    | `await` inside an `async` handler, or expose `readonly ready: Promise<void>`                                                                              |
| `items.forEach(async (item) => await fn(item))`                                       | `for (const item of items) await fn(item)` or `Promise.all(items.map(fn))`                                                                                |
| `JSON.parse(raw)` outside a `try / catch`                                             | `try { JSON.parse(raw) } catch (e) { ... }` then validate the parsed shape                                                                                |
| `throw "string"` / `throw { code: 404 }` / `throw null`                               | `throw new Error(...)` or a typed `class XxxError extends Error`                                                                                          |
| Async / data-fetching subtrees rendered with no boundary                              | `<ErrorBoundary fallback={...}>` wrapping each independent subtree                                                                                        |
| Module-level `let currentUser = null` mutated by exports                              | Dedicated state layer (e.g. `zustand` `create<State>()`)                                                                                                  |
| `var x = ...` declarations                                                            | `const` by default, `let` only when reassigned (block-scoped)                                                                                             |
| Exported functions with no declared return type                                       | Explicit `: ReturnType` on every exported function signature                                                                                              |
| Mixing `fs.readFile(path, cb)` callbacks with `async / await` in the same flow        | `await fs.promises.readFile(...)` (or `util.promisify`) standardised on async/await                                                                       |
| Using `req.body` / external payloads directly                                         | Validate at the boundary with `schema.parse(...)` / `safeParse` (zod)                                                                                     |
| `process.env.X` read raw across the codebase                                          | `env = schema.parse(process.env)` validated once at startup                                                                                               |
| `const x = require("pkg")` in TS / ESM files                                          | `import { x } from "pkg"` static, `await import(...)` for dynamic                                                                                         |
| `let x = ...` when `x` is never reassigned                                            | `const x = ...`                                                                                                                                           |
| Nested `try { try { ... } catch }` blocks                                             | One flat `try / catch` combining the error paths                                                                                                          |
| `try { fn() } catch (e) { throw e }` rethrowing unchanged                             | Let the exception propagate (drop the `try/catch`) or actually handle / log it                                                                            |
| `if (value !== null && value !== undefined)` / `value === ""` manual checks           | `isNullish(value)` / `isBlank(value)` / `isNotBlank(value)` from `@lichens-innovation/ts-common`                                                          |
| Negated predicate ternaries / guards like `!isNullish(value) ? map(value) : fallback` | Positive-first branching like `isNullish(value) ? fallback : map(value)`                                                                                  |
| `export default` for components / utils / hooks                                       | `export const MyThing = ...` named export (default only for framework entries)                                                                            |
| `function fn() {}` declarations for module-scoped logic                               | `const fn = () => {}` arrow assigned to `const`                                                                                                           |
| `x === "a" \|\| x === "b" \|\| x === "c"` repeated comparisons                        | `["a", "b", "c"].includes(x)`                                                                                                                             |
| `user.age += 1; setUser(user)` in-place mutation of React state                       | `setUser({ ...user, age: user.age + 1 })` new object reference                                                                                            |
| `for (const id of ids) await fetch(id)` sequential awaits over independent calls      | `await Promise.all(ids.map((id) => fetch(id)))`                                                                                                           |
| `import _ from "lodash"` whole-package default import                                 | `import { groupBy } from "lodash-es"` named tree-shakeable import                                                                                         |
| `console.log(...)` calls in production code paths                                     | Structured `logger.info(...)` with explicit safe fields                                                                                                   |
| `user?.address?.location?.city` dangling deep optional chain                          | `user?.address?.location?.city ?? "Unknown"` ending with a `?? fallback`                                                                                  |
| `array.find((x) => cond) !== undefined` for existence checks                          | `array.some((x) => cond)`                                                                                                                                 |
| `5 * 60 * 1000` magic numbers for durations in ms                                     | `5 * PeriodsInMS.oneMinute` from `@lichens-innovation/ts-common`                                                                                          |
| `param: Type \| undefined` in a function signature                                    | `param?: Type` optional parameter syntax                                                                                                                  |
| Long template strings inlining deep chains like `obj?.a?.b?.c ?? "NA"`                | Pre-compute named locals (`const city = ...`) then interpolate                                                                                            |
| `{ [key: string]: V }` custom index signatures                                        | `Record<KnownKey, V>` utility type                                                                                                                        |
| `type UserProps = { ... }` for plain object shapes                                    | `interface UserProps { ... }`; keep `type` for unions / mapped / `Record`                                                                                 |
| `// TODO: fix this` bare TODO with no reference                                       | `// TODO [PROJ-123]: description` with ticket ID                                                                                                          |
| `value \|\| "default"` when `0` / `""` / `false` are valid values                     | `value ?? "default"` nullish coalescing                                                                                                                   |
| `Dimensions.get("window")` static read in React Native components                     | `useWindowDimensions()` reactive hook                                                                                                                     |

## React component rules

| Avoid                                                                                    | Prefer                                                                                            |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `<GodComponent />` mixing many responsibilities (often >150 lines)                       | Small focused subcomponents composed in the parent                                                |
| Inline private renderers like `{renderTextInputIcon()}` inside the template              | A dedicated subcomponent like `<TextInputIcon ... />`                                             |
| Storing JSX in variables like `labelNode` / `textNode` and injecting them in `return`    | Small declared components with explicit props                                                     |
| Inline `.filter().sort().map()` with conditions woven into JSX                           | External pure helpers (`canDisplayFilter`, `comparator`, `formatItem`) imported from `*.utils.ts` |
| Inline `.filter()` / `.sort()` chains directly inside the rendering                      | A pre-computed list built from imported `filter` / `comparator` helpers                           |
| Inline component-local computations not reusable from outside                            | Pure functions extracted to `*.utils.ts`                                                          |
| Custom hook returning a `<Component />` (e.g. `MyReturnedComponentFromHook`)             | Hook returns data; the component owns rendering                                                   |
| `useCallback` wrapping a `renderXxx` template renderer                                   | Extract a subcomponent; reserve `useCallback` for user-interaction handlers                       |
| `useMemo` around primitives or trivial string concatenation                              | Direct assignment; use `useMemo` only for proven expensive work                                   |
| Nested ternaries inside `return` for `loading` / `error` / `data` branches               | Early `if (...) return ...` for each branch before the main render                                |
| `const OPTIONS = [...]` declared inside the component body                               | Module-level `const` outside the component for static data and helpers                            |
| `useXxx` hook that calls no React hook internally (e.g. `useLocale`)                     | Plain function (`getLocale()`) imported where needed                                              |
| Factory handlers `(id) => () => fn(id)` or pure-TS handlers defined inside the component | Pure handlers in `*.utils.ts`; `handleXxx` for stateful; inline arrow only for one-liners         |
| `onPress={() => !disabled && !readonly && doIt()}` inline guards                         | `handleOnPress` with early returns; pass `onPress={handleOnPress}`                                |
| Naming pure utilities `useXxx` (e.g. `useCalculateDiscount`)                             | Action-verb name (`calculateDiscount`) placed in `*.utils.ts`                                     |
| `useState<Item>()` holding the entire selected object                                    | `useState<Id>()` and derive the item via `items.find(...)`                                        |
| Ambiguous `internalSortOrder` initialised from a prop named `sortOrder`                  | Prop `initialSortOrder` paired with state `sortOrder`                                             |
| `props.xxx` access throughout the component body                                         | `({ xxx, yyy }: Props)` destructured in the function signature                                    |
| Defaults assigned after destructuring (`let s = colorScheme \|\| "light"`)               | Inline defaults (`{ colorScheme = "light" }: Props`)                                              |
| `useEffect` registering intervals / listeners with no cleanup                            | `useEffect` returning `() => clearInterval(id)` (or equivalent teardown)                          |
| `setNumbers([...numbers, n])` when the next state only depends on the current state      | `setNumbers((current) => [...current, n])` updater form                                           |
| `useState()` / `useRef()` with no generic when the initial value can't infer it          | `useState<string>()` / `useRef<HTMLDivElement>(null)` explicit generic                            |
| `useState(false)` for simple open/close visibility toggles                               | `useToggle()` from `@uidotdev/usehooks` when the dep is already present                           |
| `margin` / `padding` on items to space them in a flex row/column (RN)                    | `gap` / `rowGap` / `columnGap` on the flex container                                              |
| `TouchableOpacity` for new touchables in React Native                                    | `Pressable` with `style` as a function of `{ pressed }`                                           |
| Wrapping siblings in a `<div>` only to satisfy "single root"                             | `<>...</>` Fragment to avoid extra DOM nodes                                                      |
| `<Fragment>...</Fragment>` when no `key` is needed                                       | `<>...</>` shorthand; keep `<Fragment key={...}>` only inside `.map`                              |
| `text={"Click me"}` curly braces for static string props                                 | `text="Click me"` direct quoted assignment                                                        |
| `JSX.Element \| null \| undefined` prop typing                                           | `ReactNode` for any renderable child                                                              |
| Adding `{ children: ReactNode }` to props by hand                                        | `PropsWithChildren<Props>` from `react`                                                           |
| `useRef<HTMLDivElement>(null)` with raw DOM type names                                   | `useRef<ElementRef<"div">>(null)` via the type helper                                             |
| `{items.length && <List />}` (renders literal `0` when empty)                            | `{items.length > 0 && <List />}` strict boolean condition                                         |
| `key={index}` when items have stable identifiers                                         | `key={item.id}` (or another unique attribute as fallback)                                         |

## Unit testing rules

| Avoid                                                            | Prefer                                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Tests without clear Arrange / Act / Assert structure             | AAA pattern: distinct Arrange, Act, Assert sections                      |
| Destructuring `getByText` (etc.) directly from the render result | `screen.getByText` / `screen.getByRole` for consistent, readable queries |
| Mocking custom hooks without an explicit spy                     | `jest.spyOn` / `vi.spyOn` with explicit module imports                   |
| Multiple individual `it` blocks for similar test cases           | `it.each` for parametrized tests                                         |
| `getByTestId` for finding UI elements                            | `getByRole` (semantic, accessible queries)                               |
| Re-assignable object graph for mock data                         | Mock factory function with partial overrides                             |
| Tests in a separate `__tests__/` folder                          | `*.test.ts` / `*.spec.ts` colocated next to the source file              |

## Architecture

- Keep modules focused on a single responsibility
- Every function should adhere to the single responsibility principle and only do 1 thing
- Prefer composition over inheritance
