---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Security (all CRITICAL)

- No `eval()` or `new Function()` with any input → use lookup maps or `JSON.parse`
- No `innerHTML` / `dangerouslySetInnerHTML` with raw user data → `DOMPurify.sanitize` first
- No string interpolation in SQL/NoSQL queries → parameterized queries or ORM
- No user input in `path.join` / `fs` calls → `path.resolve` + `startsWith(BASE_DIR + path.sep)` check
- No hardcoded API keys, tokens, passwords → `process.env` validated with zod at startup
- No `Object.assign` / spread with untrusted external objects → zod schema first
- No `exec()` / `spawn({shell:true})` with user input → `execFile()` with args array + allowlist
