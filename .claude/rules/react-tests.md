---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "**/*.spec.tsx"
---

# Unit testing rules

> Mechanical rules are enforced by ESLint (`@lichens-innovation/eslint-plugin-coding-guide` + [eslint.config.js](../../eslint.config.js)). Do not flag violations ESLint already catches.

Query style (`screen.*`, `*ByRole` over `*ByTestId`) and colocated tests (no `__tests__/` folders) are enforced by ESLint. Focus on test structure and quality:

| Avoid | Prefer |
| --- | --- |
| Tests without clear Arrange / Act / Assert structure | AAA pattern: distinct Arrange, Act, Assert sections |
| Mocking custom hooks without an explicit spy | `jest.spyOn` / `vi.spyOn` with explicit module imports |
| Multiple individual `it` blocks for similar test cases | `it.each` for parametrized tests |
| Re-assignable object graph for mock data | Mock factory function with partial overrides |
