---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Security (all CRITICAL)

> Mechanical rules are enforced by ESLint (`@lichens-innovation/eslint-plugin-coding-guide` + [eslint.config.js](../../eslint.config.js)). Do not flag violations ESLint already catches.

`eval` / `new Function` and raw `dangerouslySetInnerHTML` are blocked by ESLint. If those rules are disabled via `eslint-disable`, verify the disable is justified and that any HTML is sanitized (`DOMPurify.sanitize`).

- No string interpolation in SQL/NoSQL queries → parameterized queries or ORM
- No user input in `path.join` / `fs` calls → `path.resolve` + `startsWith(BASE_DIR + path.sep)` check
- No hardcoded API keys, tokens, passwords → `process.env` validated with zod at startup
- No `Object.assign` / spread with untrusted external objects → zod schema first
- No `exec()` / `spawn({shell:true})` with user input → `execFile()` with args array + allowlist
