A folder holding more than 20 source files directly is a flat dump, not a structure: a reader scanning it can't tell which files belong together, and the folder name no longer says anything about its content. Test, story, `.d.ts` and `index.*` files don't count — only direct `.ts`/`.tsx`/`.js`/`.jsx` source files.

**Fix:**
1. Identify the groups — which files share a feature, a concern, or a single consumer? (e.g. a screen's sections, its hooks, its utils).
2. Move each group into a sub-folder named after that one responsibility. Update imports.
3. Move each file's companions (`*.test.ts`, `*.stories.tsx`) along with it.

**Known, deliberate exception**: a legitimately flat folder (generated code, migrations) is excluded via the rule's `ignoreFolders` option in `eslint.config.js`, not disabled file-by-file.

**AVOID**: mechanical splits — `part-1/` / `part-2/`, or alphabetical buckets. That satisfies the count without grouping anything. If you cannot name each sub-folder in a couple of words, you have not found the grouping yet.

{% include "includes/file_level_issues.md" %}
