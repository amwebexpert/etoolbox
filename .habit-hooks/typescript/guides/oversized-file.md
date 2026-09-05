A file over this repo's ESLint `max-lines` limit is a cohesion problem, not a counting problem: the reader has to hold too many ideas at once. Thresholds (blank lines and comments skipped):

- **`.ts` 400 max lines**
- **`.tsx` 150 max lines**

**Fix:**
1. Identify the seams — which exports, types, or helper clusters actually belong together? Typical clean splits: a data type and its operations, one feature pipeline, or one concern per file (`*.utils.ts`, a hook, a screen section).
2. Move each seam to a module whose name describes that one responsibility. Update imports.
3. If the structure resists splitting, responsibilities are tangled — look for the missing abstraction (a focused module with a small interface) that lets related pieces move together.

**AVOID**: mechanical splits — carving at line 400 into `foo-1.ts` / `foo-2.ts`, or dumping every private helper into a generic `utils.ts`. That satisfies the number and hops the cohesion problem to a new file. Write a one-sentence description of each emerging seam first; if you cannot, you have not found the seam yet — do not split.

{% include "includes/file_level_issues.md" %}
