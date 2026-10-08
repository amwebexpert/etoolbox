`({ a, b }: { a: string; b: number }) => ...` defines a shape that has no name — anyone who wants to build a value of that shape, reuse it in another signature, or just understand what the parameter represents has nothing to reference; they have to go read this one function's signature and copy it by hand. The same goes for an object type buried inside another type's member: `viewBox?: { x: number; y: number }` can't be imported or reused.

**What triggers**: an object type literal (`{ ... }`) used directly as a parameter's type annotation in any function — including callbacks (`.map(({ a }: { a: string }) => ...)` is flagged; there is no library-callback exemption). Also an object type literal nested inside an interface/type member: property types, index signatures, method signatures and their params, inside `Array<...>`, unions, or function types. Only the outermost nested literal is reported; deeper ones surface once it is extracted. Not flagged: a top-level `type X = { ... }` alias itself, or object types inside an `as` / `<T>` cast in test files (`*.test.*`, `*.spec.*`). No autofix.

**Fix**:

1. Extract the shape into a named `interface` right above its use (not a `type` alias).
2. Name it after its owner: `<Fn>Args` for a function param (`buildFooKey` → `BuildFooKeyArgs`), `<Name>Props` for component props, a domain name (`ViewBox`, `Range`) for a nested member.
3. Reference it: `({ siteSlug, equipmentSlug }: BuildFooKeyArgs) => ...`, `viewBox?: ViewBox;`. Re-lint and extract any inner literal that now surfaces.

**AVOID**:

- Swapping the literal for `type FooArgs = { ... }` — technically silent here, but house style is `interface`.
- Generic names (`Args`, `Params`, `Props` with no prefix) when several functions in the file would each want their own — collisions force an awkward rename later.
- Replacing the literal with `Record<string, unknown>` / `any` to dodge the rule — that drops the shape instead of naming it.

{% include "includes/line_level_issues.md" %}
