# coding-guide/max-params-project

Enforces a maximum parameter count for project-owned function signatures only. Skips callbacks whose arity is imposed by a callee or library type (`Array.map`, react-query `onSuccess`, JSX render props, etc.) since those aren't yours to redesign.

House style for a function that legitimately needs more parameters: a named `Args` interface, capitalize the function name, add an `Args` suffix, and take a single destructured object of that type.

## ❌ Incorrect

```ts
function buildKey(siteSlug: string, equipmentSlug: string) {
  return `${siteSlug}-${equipmentSlug}`;
}
```

## ✅ Correct

```ts
interface BuildKeyArgs {
  siteSlug: string;
  equipmentSlug: string;
}

function buildKey({ siteSlug, equipmentSlug }: BuildKeyArgs) {
  return `${siteSlug}-${equipmentSlug}`;
}
```

## Options

- A single number, or `{ max: number }` — the maximum parameter count. Defaults to `1`.
