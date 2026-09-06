---
name: update-dependencies
description: Upgrade this repo's npm dependencies safely — dry-run ncu, apply minor/patch only, migrate deprecated APIs, verify sanity scripts, run e2e and report the run. Use when the user asks to update dependencies, upgrade packages, bump deps, check for outdated packages, or run ncu.
---

Upgrades every minor/patch-bumpable dependency in one pass, skips majors, migrates deprecated API usage surfaced by the bump, then proves the upgrade didn't break anything before reporting. Never bump a major in this flow — log it for a separate, deliberate pass instead.

This repo uses **Bun** (`packageManager: bun@1.3.14`), `bun.lock`, and `patch-package` on install.

## 1. Classify

```bash
bunx npm-check-updates
```

Sort every listed package into two sets by comparing its leftmost version segment: unchanged = minor/patch (safe), changed = major (skip).

Done when: every listed package is sorted into one of the two sets.

## 2. Apply the safe set

```bash
bunx npm-check-updates -u -x <comma-separated-major-pkgs>
bun install
```

Excluding majors up front keeps this idempotent — rerunning after a partial failure is safe.

**Project-specific checks after install:**

- `postinstall` runs `patch-package`. If install fails on `eslint-plugin-react`, the patch in `patches/` no longer applies — stop and report; do not delete the patch to unblock.
- `vite` is pinned as `npm:rolldown-vite@<version>` in both `devDependencies` and `overrides`. If ncu bumps `vite`, keep the alias form and sync both entries.

Done when: `bun install` exits 0.

## 3. Migrate deprecated APIs

Libraries often mark old APIs `@deprecated` in their types before removing them in the next major. Catch and fix usage here — before sanity scripts and e2e — so failures aren't misread as test/build regressions.

### 3a. Scan typed deprecations (primary)

```bash
bunx eslint src --rule '@typescript-eslint/no-deprecated: error' --max-warnings 0
```

Reuses this repo's type-aware ESLint setup (`projectService` on `src/**`). Each hit includes the library's replacement hint from JSDoc (e.g. Ant Design prop renames). Fix every finding under `src/` — including pre-existing ones; a dep-upgrade pass is the right time to clear them.

Re-run until the command exits 0.

### 3b. Skim upgraded-package release notes

For each package in the applied set, check for migration guidance the type checker won't surface (runtime-only deprecations, config renames, removed subpath exports):

```bash
for pkg in <space-separated-upgraded-pkgs>; do
  ls "node_modules/$pkg"/{CHANGELOG,CHANGES,MIGRATION,UPGRADING}* 2>/dev/null
done
```

Also open the package's GitHub releases when the on-disk changelog is thin. Search for "deprecated", "removed", "migrate", "renamed". Cross-check with `git diff -- package.json bun.lock`.

Apply straightforward call-site fixes (import paths, prop/option renames, config key swaps). Stop and report when a deprecation needs a design call or touches many files — don't silently defer.

Done when: `no-deprecated` is clean and changelog-driven migrations for the applied set are fixed or explicitly deferred with reason.

## 4. Verify sanity scripts

Run in order, stopping on the first failure — mirrors `.github/workflows/ci.yml` plus a local build:

`bun run lint:ci` → `bun run format:check` → `bun run lint:package` → `bun run lint:unused` → `bun run typecheck` → `bun run test` → `bun run build`

- `@playwright/test` in the applied set → proactively run `bunx playwright install chromium` before e2e. Default e2e script uses `--project=chromium` only; a patch bump can orphan cached browser binaries (`browserType.launch: Executable doesn't exist` otherwise).
- `prettier` in the applied set → a `format:check` failure on previously-clean files is expected on new rules. Run `bun run format`, then confirm the diff only touches the files `format:check` flagged — a wider diff means something else broke.
- Ignore as pre-existing, not a regression: the "chunks larger than 500 kB" build warning from Vite/Rolldown.
- Any other failure: trivial fix (type signature, import path) → apply and continue. Real API break → stop, report, never downgrade unilaterally to route around it.

`bun run lint` (habit-hooks coaching) is optional local feedback — CI gates on `lint:ci`, not habit-hooks.

Done when: all seven scripts exit 0.

## 5. Run e2e

```bash
bun run test:e2e
```

Playwright starts the Vite dev server automatically (`e2e/playwright.config.ts`). E2E is local-only (not in CI) but required here. Scan output for runtime `deprecated` / `DeprecationWarning` lines — fix any tied to upgraded packages.

Done when: the full suite reports its pass/fail counts.

## 6. Report

Rank skipped majors by adoption risk: lint/test-only deps with no in-repo usage rank lowest; framework/runtime deps with heavy in-repo usage, or several majors jumped at once, rank highest.

Report to the user: what upgraded, deprecated APIs migrated, majors skipped with risk ranking, anything hit plus the fix applied, sanity/e2e result.

Done when: the user has the summary.
