Reading `import.meta.env.VITE_*` directly from wherever a value is needed means the set of environment variables this app actually depends on is scattered across the codebase instead of declared in one place — nothing validates that a variable is actually set, typos in the key name fail silently at runtime, and there's no single spot to see the app's full environment contract.

**Fix**: add (or reuse) a named getter in `src/utils/environment.utils.ts` — e.g. `export const getApiBaseUrl = (): string => import.meta.env.VITE_PUBLIC_API_BASE_URL;` — and import that getter everywhere the value is needed, instead of reading `import.meta.env` inline.

**Known, deliberate exception**: `src/utils/environment.utils.ts` itself is exempt in `eslint.config.js` — it's the one file allowed to read `import.meta.env` directly, since it's where the named getters live.

**AVOID**: reaching for a bare `eslint-disable` at each call site instead of adding the getter — that defeats the point (one place to see and validate the app's env contract) and just relocates the scatter.

{% include "includes/line_level_issues.md" %}
