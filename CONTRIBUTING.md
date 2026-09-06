# Contributing to This Project

Thanks for your interest in contributing! This repository is a React (TypeScript) app that uses **Ant Design**, **Zustand** for state, and **TanStack Query** for server state. This guide keeps things simple so you can get started fast.

---

## Quick Start

1. **Fork** the repo and create a topic branch:
   ```bash
   git checkout -b feature/short-description
   ```
2. **Install [uv](https://docs.astral.sh/uv/)** (Python 3.11+, recommended for local lint coaching via habit-hooks).
3. **Install** dependencies:
   ```bash
   bun install
   ```
   This also wires up git hooks (`prepare` → husky) and installs [habit-hooks](https://github.com/habit-hooks/habit-hooks) (`postinstall`, used by `bun run lint` and the pre-commit hook). If `uv` is not installed, `bun install` still succeeds — install `uv` and re-run `bun install`, or run `uv tool install "habit-hooks[typescript]"` manually.
4. **Run** the app locally:
   ```bash
   bun start
   ```
5. **Commit** and push your changes, then open a **Pull Request** to `main`.

---

## What You Can Work On

- Bug fixes and small improvements
- UI tweaks (Ant Design components)
- State management (Zustand stores)
- Data fetching & caching (TanStack Query)
- Docs and tests

If your change is large (new feature, big refactor), please open an issue first to discuss the approach.

---

## Project Conventions

### TypeScript & React

- Use **TypeScript** everywhere; prefer explicit types for public APIs.
- Functional components, hooks, and composition over inheritance.
- Keep components small; extract logic to hooks when it grows.

### Ant Design

- Use AntD components for consistent UI; prefer `Form`, `Button`, `Typography`, etc.
- Follow design tokens and theming via AntD when styling.
- Avoid deeply custom styling unless necessary.

### Zustand (Client State)

- Co-locate small stores with features; keep stores minimal and focused.
- Derive state with selectors; avoid unnecessary re-renders.
- No side effects in stores—use hooks/effects in components.

### TanStack Query (Server State)

- Prefer `useQuery`/`useMutation` over manual `fetch`.
- Use meaningful **query keys** (e.g., `['users', userId]`).
- Configure sensible cache times; enable retries only when appropriate.
- Invalidate queries after mutations to keep UI fresh.

---

## Code Style & Commits

- Lint & format before committing:
  ```bash
  bun run lint && bun run format
  ```
- Commit messages: [Conventional Commits](https://www.conventionalcommits.org/) with a **required scope** (e.g., `fix(base64): button alignment`, `feat(json-formatter): add user list`). Enforced by commitlint on commit.
- Keep PRs focused and small; add screenshots for UI changes.

---

## Testing

- Add unit tests for logic (hooks, utils) when practical.
- Ensure the app builds and runs locally.
- If you change API interactions, verify loading/error states.

---

## Pull Request Checklist

- [ ] The branch is up to date with `main`
- [ ] Linting & formatting pass
- [ ] Added/updated tests (if relevant)
- [ ] Screenshots for visual changes
- [ ] Clear description of the change and rationale

---

## Reporting Issues

Please include:

- Steps to reproduce
- Expected vs. actual behavior
- Screenshots or logs when useful
- Environment (OS, browser, Node version)

---

## Code of Conduct

By participating, you agree to uphold a respectful, inclusive environment:

- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) file

---

## License

By contributing, you agree your contributions will be licensed under this repository’s license. For more information see [`LICENSE`](./LICENSE) file.
