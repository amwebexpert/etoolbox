---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Naming conventions

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
