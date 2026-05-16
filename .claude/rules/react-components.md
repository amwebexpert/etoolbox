---
paths:
  - "**/*.tsx"
---

# React component rules

## HIGH

| Avoid | Prefer |
| --- | --- |
| `<GodComponent />` mixing many responsibilities (often >150 lines) | Small focused subcomponents composed in the parent |
| Inline private renderers like `{renderTextInputIcon()}` inside the template | A dedicated subcomponent like `<TextInputIcon ... />` |
| Storing JSX in variables like `labelNode` / `textNode` and injecting them in `return` | Small declared components with explicit props |
| Inline `.filter().sort().map()` with conditions woven into JSX | External pure helpers (`canDisplayFilter`, `comparator`, `formatItem`) imported from `*.utils.ts` |
| Inline `.filter()` / `.sort()` chains directly inside the rendering | A pre-computed list built from imported `filter` / `comparator` helpers |
| Inline component-local computations not reusable from outside | Pure functions extracted to `*.utils.ts` |
| Custom hook returning a `<Component />` (e.g. `MyReturnedComponentFromHook`) | Hook returns data; the component owns rendering |
| `useCallback` wrapping a `renderXxx` template renderer | Extract a subcomponent; reserve `useCallback` for user-interaction handlers |
| `useMemo` around primitives or trivial string concatenation | Direct assignment; use `useMemo` only for proven expensive work |
| Nested ternaries inside `return` for `loading` / `error` / `data` branches | Early `if (...) return ...` for each branch before the main render |
| `const OPTIONS = [...]` declared inside the component body | Module-level `const` outside the component for static data and helpers |
| `useXxx` hook that calls no React hook internally (e.g. `useLocale`) | Plain function (`getLocale()`) imported where needed |

## MEDIUM

| Avoid | Prefer |
| --- | --- |
| Factory handlers `(id) => () => fn(id)` or pure-TS handlers defined inside the component | Pure handlers in `*.utils.ts`; `handleXxx` for stateful; inline arrow only for one-liners |
| `onPress={() => !disabled && !readonly && doIt()}` inline guards | `handleOnPress` with early returns; pass `onPress={handleOnPress}` |
| Naming pure utilities `useXxx` (e.g. `useCalculateDiscount`) | Action-verb name (`calculateDiscount`) placed in `*.utils.ts` |
| `useState<Item>()` holding the entire selected object | `useState<Id>()` and derive the item via `items.find(...)` |
| Ambiguous `internalSortOrder` initialised from a prop named `sortOrder` | Prop `initialSortOrder` paired with state `sortOrder` |
| `props.xxx` access throughout the component body | `({ xxx, yyy }: Props)` destructured in the function signature |
| Defaults assigned after destructuring (`let s = colorScheme \|\| "light"`) | Inline defaults (`{ colorScheme = "light" }: Props`) |
| `useEffect` registering intervals / listeners with no cleanup | `useEffect` returning `() => clearInterval(id)` (or equivalent teardown) |
| `setNumbers([...numbers, n])` when the next state only depends on the current state | `setNumbers((current) => [...current, n])` updater form |
| `useState()` / `useRef()` with no generic when the initial value can't infer it | `useState<string>()` / `useRef<HTMLDivElement>(null)` explicit generic |

## LOW

| Avoid | Prefer |
| --- | --- |
| `useState(false)` for simple open/close visibility toggles | `useToggle()` from `@uidotdev/usehooks` when the dep is already present |
| `margin` / `padding` on items to space them in a flex row/column (RN) | `gap` / `rowGap` / `columnGap` on the flex container |
| `TouchableOpacity` for new touchables in React Native | `Pressable` with `style` as a function of `{ pressed }` |
| Wrapping siblings in a `<div>` only to satisfy "single root" | `<>...</>` Fragment to avoid extra DOM nodes |
| `<Fragment>...</Fragment>` when no `key` is needed | `<>...</>` shorthand; keep `<Fragment key={...}>` only inside `.map` |
| `text={"Click me"}` curly braces for static string props | `text="Click me"` direct quoted assignment |
| `JSX.Element \| null \| undefined` prop typing | `ReactNode` for any renderable child |
| Adding `{ children: ReactNode }` to props by hand | `PropsWithChildren<Props>` from `react` |
| `useRef<HTMLDivElement>(null)` with raw DOM type names | `useRef<ElementRef<"div">>(null)` via the type helper |
| `{items.length && <List />}` (renders literal `0` when empty) | `{items.length > 0 && <List />}` strict boolean condition |
| `key={index}` when items have stable identifiers | `key={item.id}` (or another unique attribute as fallback) |
