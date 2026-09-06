---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Naming conventions

> Mechanical rules are enforced by ESLint (`@lichens-innovation/eslint-plugin-coding-guide` + [eslint.config.js](../../eslint.config.js)). Do not flag violations ESLint already catches.

Kebab-case, `use-*` hooks, `*-page` / `*-dialog` / `*-provider` suffixes, and generic root basenames (`utils.ts`, `types.ts`) are enforced by ESLint. Focus on domain suffixes ESLint cannot fully infer:

| Pattern | Example |
| --- | --- |
| Utils | `<domain>.utils.ts` |
| Types | `<domain>.types.ts` (avoid root `types.ts`) |
| Store | `<domain>.store.ts` |
| Constants | `<domain>.constants.ts` |
| Generated | `*.gen.ts` |
| Mock/fixture | `*.data.ts` or `*-mock.data.ts` |
| Config | `<domain>-config.ts` |
| API client | `*.client.ts` |
| Query keys | `query-keys.ts` (scoped) |
| Section | `section-*.tsx` |
| Action UI | `action-*.tsx` |
| Table | `*-table.tsx`, `*-table-columns.tsx` |

- Types with a single consumer → colocate above the component, no separate file
- Avoid abbreviations (`export2xlsx.tsx` → `export-to-xlsx.tsx`)
