`useState()` with no argument, or `useState(null)`, gives TypeScript nothing to infer a useful type from — the binding ends up typed as `undefined` or `null` forever, so every later assignment needs an unsafe cast or fails to type-check.

**What triggers**: a bare `useState(...)`/`useRef(...)` call with no type argument whose initial value is missing, `null` or `undefined`. Calls with an inferable initial value (`useState(0)`, `useState<Item[]>([])`, `useState([])`) aren't flagged. No autofix.

**Fix**: add the real eventual type as a generic, keeping the empty initial value:

- `useState(null)` → `useState<User | null>(null)`
- `useState()` → `useState<string>()`
- `useRef(null)` → `useRef<ComponentRef<"div">>(null)` for DOM refs, or `useRef<number | null>(null)` for a timer id.

**AVOID**: `useState<any>()` or `useRef<any>(null)` to silence it quickly — that satisfies the rule's letter while giving up exactly the type safety it exists to protect.

{% include "includes/line_level_issues.md" %}
