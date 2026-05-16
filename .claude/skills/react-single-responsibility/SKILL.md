---
name: react-single-responsibility
description: Simplify React components, hooks, and plain TypeScript functions using decomposition, early returns, and SRP. Use when asked to ungodify, simplify, or reduce complexity of a component, hook, or function, or when applying single-responsibility to a file.
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Single Responsibility — Simplify Components & Methods

## When to Activate

Use based on the **file extension** of the target:

| File pattern | Apply rules for           |
| ------------ | ------------------------- |
| `*.tsx`      | React component           |
| `use*.ts`    | Custom hook               |
| `*.ts`       | Plain TypeScript function |

## Principles

| Principle                 | Rule                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| **KISS**                  | Simplest solution that works. Avoid over-engineering.                                         |
| **Single responsibility** | One clear responsibility per component or function; extract utilities, hooks, sub-components. |
| **DRY**                   | Extract common logic; create reusable functions or components.                                |
| **YAGNI**                 | Don't build features before they're needed.                                                   |
| **Composition**           | Prefer composing small components and utilities over large, multi-purpose blocks.             |

## Simplifying a component (`*.tsx`)

### Decomposition (avoid God Component)

Apply in this order:

1. **Extract pure utilities first** — Logic with no React dependency → pure functions. More than one argument → object destructuring in the signature. Reusable → `src/utils/xyz.utils.ts`; feature-specific → `component-name.utils.ts` next to the component.

2. **Form state (multiple useState)** — When multiple `useState` calls manage a form: refactor to **react-hook-form**, which simplifies state, validation, and submission in one place.

3. **Extract logic into hooks** — State, effects, derived logic → hooks (`use-xyz.ts`). Reusable → `src/hooks/`; feature-specific → feature's `hooks/` subdirectory. Prefer a **plain arrow function** over a custom hook when you don't need React primitives.

4. **Split the visual layer into sub-components** — If render/TSX exceeds ~**100 lines**, extract sub-components with clear props and one responsibility. **Avoid internal `renderXyz()` methods**: turn each into a **regular component** in its own file. Use **parent file name as prefix**: `parent-name-<sub-component>.tsx` (e.g. `market-list-item.tsx` for parent `market-list.tsx`). Large component (>150 lines) → split into list container, list item, filters, pure functions, and hook(s).

### Structure and readability

- **Order inside the component:** types → state → computed const → effects → handlers → render.
- **Handlers:** Pure TypeScript only → move to `component-name.utils.ts`; one-liner → keep inline; complex/stateful → `const handleClick = () => { ... }`. Always avoid factories that return handlers (double arrow functions).
- **Early returns in render** — Keep the main path flat: `if (isLoading) return <Spinner />; if (error) return <ErrorMessage />;` One condition per line; avoid nested ternary operators.
- **Boolean in JSX** — Use explicit computed boolean (e.g. `const hasItems = items.length > 0; { hasItems && <List /> }`) so `0` is not rendered.
- **Static data** — Constants and pure functions that don't depend on props or state → **outside the component** (into `component-name.utils.ts`) to avoid new references every render.

### React-specific

- **Selected items** — Store selection by **ID** in state; **derive** the full item from the list (e.g. `selectedItem = items.find(i => i.id === selectedId)`). Avoids stale references when the list updates.
- **useMemo / useCallback — only when absolutely necessary** — Default: do not use. Re-renders are often acceptable. Use only when **profiling** shows a real performance problem.
- **Data fetching** — Prefer **TanStack Query** (`useQuery` / `useMutation`) instead of manual `useState` + `useEffect`.

## Simplifying a hook (`use*.ts`)

### Decomposition order

1. **Extract pure JS utilities first** — Logic with no React dependency (no `useState`, `useEffect`, context) → pure exported arrow functions in `<hook-name>.utils.ts` or `src/utils/`.

2. **Consider enriching an existing state manager** — Check if the project uses **Zustand**, **MobX**, or Redux. If so, add business logic there; hooks become thin selectors (`useStore(selector)`).

3. **Split into specialized hooks** — If no store fits: extract **one hook per concern** (e.g. `useFetchItems`, `useItemsFilter`, `usePagination`). Compose in the component or a thin orchestrator hook.

### Hook design

- **Narrow return shape** — Prefer `{ data, isLoading, error }` or `{ value, onChange }`. Avoid large bags of unrelated state.
- **Plain function vs hook** — No React primitives needed → use a plain function in `.utils.ts`.
- **Dependencies** — Keep hook inputs explicit (parameters); avoid reading from context/globals unless that's the hook's sole purpose.

### File and naming

- One hook per file: `use-<name>.ts`. Reusable → `src/hooks/`; feature-specific → feature's `hooks/` subdirectory.

### Quick checklist (hooks)

- [ ] Logic with no React dependency? → extract to pure arrow functions in `.utils.ts`.
- [ ] Hook does more than one thing? → enrich state manager first; otherwise split into specialized hooks.
- [ ] Could this be a plain function? → use a utility instead.
- [ ] Return type a large mixed bag? → split the hook.

## Simplifying a method (`*.ts`)

### Long function (>40 lines)

- **Signal:** Scrolling to understand a single function.
- **Fix:** Extract into smaller **named** arrow functions, each with one clear responsibility (e.g. validate → fetch → persist → notify). Each step testable in isolation.

### Control flow

- **Early returns** — Prefer over nested if/else (max ~2 levels of nesting).
- **const over let** — Use `reduce` or pure helpers with early returns instead of mutable accumulators.
- **Clear conditionals** — `Array.includes(value)` for multiple value checks; `Array.some(predicate)` for existence. Extract complex expressions into named variables.

### Parameters

- **Long parameter list (>1 param)** — Use a single **params object** with destructuring; extract the parameter interface **immediately above** the function. Name pattern: `<MethodName>Args` (e.g. `interface GetMarketsArgs`).
- **Interface used only for one method** — Place it immediately above that method (colocation).
- **Boolean flag parameter** — Avoid `fn(data, true)`. Use a named options object or separate functions.

### Duplication (DRY)

- **Signal:** Copy-paste with minor variations.
- **Fix:** Extract a **parameterized arrow function** (e.g. `getMarketsForUser({ userId, status })` instead of `getActiveMarketsForUser` + `getClosedMarketsForUser`).

## Shared (components and methods)

### Object destructuring

Use when reading or passing object attributes: component props, function parameters (2+ args), and local objects (multiple properties used). Avoid when a single property is used once.

### File and size guidelines

- **`*.tsx` (components)** — Max **150 lines**. Plain functions live in `*.ts`.
- **`*.ts` (pure TypeScript)** — 200–400 lines typical; 2000 absolute maximum. Functions: **40-line** threshold.
- File names: **kebab-case** (`market-list-item.tsx`, `use-market-filters.ts`, `market-list.utils.ts`).

### Quick checklist

- [ ] Does it do more than one thing? → extract pure utilities, hooks, or sub-components.
- [ ] More than 1 parameter? → always use a params object + interface immediately above the signature.
- [ ] Copy-pasted code? → extract and parameterize.
- [ ] Control flow deeply nested? → use early returns.
- [ ] Comments explaining _what_? → rename for self-documenting code.

## Code Examples

### Extract utility from component

```typescript
// Before: logic inside component
const UserCard = ({ user }: { user: User }) => {
  const initials = user.firstName[0] + user.lastName[0]
  return <div>{initials}</div>
}

// After: pure utility in user-card.utils.ts
interface GetInitialsArgs { firstName: string; lastName: string }
const getInitials = ({ firstName, lastName }: GetInitialsArgs): string =>
  firstName[0] + lastName[0]

const UserCard = ({ user }: { user: User }) => (
  <div>{getInitials(user)}</div>
)
```

### Early returns flatten render

```typescript
// Before: nested ternaries
const View = ({ data, isLoading, error }: ViewProps) => (
  <div>{isLoading ? <Spinner /> : error ? <Error msg={error} /> : <Content data={data} />}</div>
)

// After: early returns
const View = ({ data, isLoading, error }: ViewProps) => {
  if (isLoading) return <Spinner />
  if (error) return <Error msg={error} />
  return <Content data={data} />
}
```

### Params object for functions with 2+ args

```typescript
// Before
const getMarkets = (userId: string, status: string, page: number) => { ... }

// After
interface GetMarketsArgs { userId: string; status: string; page?: number }
const getMarkets = ({ userId, status, page = 1 }: GetMarketsArgs) => { ... }
```

## Anti-Patterns

### renderXyz() methods inside components

```typescript
// Avoid: internal render methods
const MarketList = () => {
  const renderItem = (item: Market) => <div key={item.id}>{item.name}</div>
  return <ul>{markets.map(renderItem)}</ul>
}

// Prefer: extract as a component in market-list-item.tsx
const MarketListItem = ({ item }: { item: Market }) => <div>{item.name}</div>
const MarketList = () => (
  <ul>{markets.map(item => <MarketListItem key={item.id} item={item} />)}</ul>
)
```

### Double-arrow handler factories

```typescript
// Avoid
const handleChange = (field: string) => (value: string) => setState({ [field]: value });

// Prefer: separate named handlers or params object
const handleNameChange = (value: string) => setState({ name: value });
const handleEmailChange = (value: string) => setState({ email: value });
```

### Nested ternaries ("ternary hell")

```typescript
// Avoid
const label = isAdmin ? "Admin" : isMod ? "Moderator" : isUser ? "User" : "Guest";

// Prefer: helper with early returns
interface GetLabelArgs {
  isAdmin: boolean;
  isMod: boolean;
  isUser: boolean;
}
const getLabel = ({ isAdmin, isMod, isUser }: GetLabelArgs): string => {
  if (isAdmin) return "Admin";
  if (isMod) return "Moderator";
  if (isUser) return "User";
  return "Guest";
};
```

## Related Skills

- `react-coding-standards` — naming conventions, type patterns, and coding rules that complement these SRP guidelines
