---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "**/*.spec.tsx"
---

# Unit testing rules

| Avoid | Prefer |
|-------|--------|
| Tests without clear Arrange / Act / Assert structure | AAA pattern: distinct Arrange, Act, Assert sections |
| Destructuring `getByText` (etc.) directly from the render result | `screen.getByText` / `screen.getByRole` for consistent, readable queries |
| Mocking custom hooks without an explicit spy | `jest.spyOn` / `vi.spyOn` with explicit module imports |
| Multiple individual `it` blocks for similar test cases | `it.each` for parametrized tests |
| `getByTestId` for finding UI elements | `getByRole` (semantic, accessible queries) |
| Re-assignable object graph for mock data | Mock factory function with partial overrides |
| Tests in a separate `__tests__/` folder | `*.test.ts` / `*.spec.ts` colocated next to the source file |
