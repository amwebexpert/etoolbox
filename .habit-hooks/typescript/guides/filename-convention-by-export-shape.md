A file named `pump-test.ts` that exports `usePumpTest` — a hook — makes the reader guess what kind of thing they're opening before they open it. This repo's convention exists so the filename alone tells you: `use-*` is a hook, `*-page.tsx` is a route page, `*-dialog.tsx` is a dialog, `*-provider.tsx` is a context provider — and a bare `utils.ts`/`index.ts` is a name so generic it stops being findable by search the moment a second one exists anywhere in the tree.

**What triggers**: (a) a bare file name (in any folder, at any depth, case-insensitive) of `utils`, `types`, `helpers`, `constants`, `config`, `client` or `index` — regardless of what the file exports, so barrel `index.ts` files are flagged too; (b) a file whose _only_ named value export is a function named `use[A-Z]…` but whose name doesn't start with `use-`; (c) a sole exported function ending in `Page`, `Dialog` or `Provider` (no other suffixes are checked) whose file name doesn't end in the matching `-page`/`-dialog`/`-provider`. (b) and (c) skip multi-export files, classes, non-function consts and `export default`. No autofix.

**Fix**:

1. Hook file: rename to `use-<name>.ts(x)`, the hook's own name in kebab-case (`usePumpTest` → `use-pump-test.ts`).
2. Page/Dialog/Provider component: rename the file to end with the matching suffix — and keep the word order of the export name (`TestRequestCreatePage` belongs in `test-request-create-page.tsx`, not `test-request-page-create.tsx`).
3. Generic name: prefix it with its domain — `utils.ts` → `<domain>.utils.ts`, `types.ts` → `<domain>.types.ts`. For a barrel `index.ts`, prefer deleting it and importing from the concrete files.
4. Update every import that references the old path.

**AVOID**: assuming a multi-export file is safe — the generic-name check fires whatever the exports, so a shared `utils.ts` still needs a domain prefix. Conversely, don't rename a multi-export module after just one of its exports; its name should describe the whole module.

{% include "includes/file_level_issues.md" %}
