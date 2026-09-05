A mixed-case filename (`myComponent.tsx`, `MyComponent.tsx`) breaks the project's one naming rule for every file in the tree — kebab-case everywhere — and on case-insensitive filesystems (macOS default, Windows) two contributors can end up with silently divergent git history for what they think is "the same file".

**Fix**: rename the file to kebab-case (`my-component.tsx`), and update every import that references it by path. Use your editor's/IDE's rename-file refactor when available so imports update automatically; otherwise grep for the old path before renaming.

**Exempt by convention**: generated files (`*.gen.ts` under `src/api/generated/**`) are excluded — they're not hand-authored, so this repo's naming convention doesn't apply to them.

**AVOID**: renaming the file without updating its imports — a case-only rename can pass a case-insensitive filesystem locally while breaking CI or a teammate's case-sensitive checkout.

{% include "includes/line_level_issues.md" %}
