A flat folder with dozens of sibling files has no visible structure: the reader can't tell which files belong together, where a feature starts and ends, or where a new file should go — so the next file lands in the same pile and the folder keeps growing.

**What triggers**:

- A folder whose direct-child source files (`.ts` `.tsx` `.js` `.jsx` `.mts` `.cts`) exceed `max` (default `20`). Reported on every counted file of that folder. Sub-folders are not counted.
- Not counted (and never reported): `*.test.*`, `*.spec.*`, `*.stories.*`, `*.d.ts`, `index.*` barrels, non-source files (`.css`, `.json`, assets).
- Option `ignoreFolders`: globs matched against the folder's absolute path (generated code, migrations). No autofix.

**Fix**:

1. List the files and group them by feature or concern (e.g. `auth/`, `api/`, `forms/`) — each group should be describable in one sentence.
2. Move each group into its own sub-folder, taking its tests/stories along with it.
3. Update every import (and barrel re-exports, if any) and run the type-checker to catch missed paths.

**AVOID**: dump folders (`misc/`, `helpers/`, `other/`, `part-2/`) or splitting alphabetically / arbitrarily just to drop under the limit — that moves the pile instead of structuring it. Don't add the folder to `ignoreFolders` unless it is genuinely flat by nature (generated, migrations).

{% include "includes/file_level_issues.md" %}
