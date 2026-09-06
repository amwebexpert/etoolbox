---
paths:
  - "**/*.tsx"
---

# React component rules

> Mechanical rules are enforced by ESLint (`@lichens-innovation/eslint-plugin-coding-guide` + [eslint.config.js](../../eslint.config.js)). Do not flag violations ESLint already catches.

> Component structure and decomposition: follow the **react-single-responsibility** skill (review step 4). ESLint handles mechanical JSX/hook patterns (`no-jsx-in-variable`, `no-inline-render-function`, `hoist-static-component-constants`, etc.).

No additional reviewer checks beyond the skill and ESLint.

Prefer clear prop/state naming when a prop seeds local state (e.g. prop `initialSortOrder` paired with state `sortOrder`) — avoid reusing the same name for both.
