A test tucked away in a `__tests__/` folder separates it from the source file it exercises — renaming, moving, or deleting the source file gives no signal that a test elsewhere now references a path that no longer exists, and a reader opening the source file has no visual cue that a test for it exists at all.

**What triggers**: any linted file whose path contains `/__tests__/` — tests, fixtures and helpers alike. Other folders such as `__mocks__` are unaffected. No autofix.

**Fix**:

1. Move each test next to its source file as `<name>.test.ts(x)` — same folder, same base name.
2. Move fixtures/helpers next to the tests that use them (e.g. `<name>.fixtures.ts`).
3. Update relative imports in the moved files, and in anything that imported them.
4. Check the test runner config (Jest `testMatch`/`roots`, Vitest `include`) still picks up colocated `*.test.ts(x)`, then delete the empty `__tests__` folder.

**AVOID**: half-migrating (some tests still in `__tests__`), or renaming the folder to `tests/` — it dodges the rule but keeps tests separated from their sources.

{% include "includes/file_level_issues.md" %}
