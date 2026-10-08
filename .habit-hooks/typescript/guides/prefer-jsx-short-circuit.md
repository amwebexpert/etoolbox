`{count && <List />}` looks like "render `<List/>` when there are items", but when `count` is `0` React renders the literal `0` onto the page — a stray digit sitting where nothing should be. Likewise `cond ? <X /> : null` spends a whole ternary to say "maybe render X".

**What triggers** (JSX children only, not attribute values):

- A ternary whose consequent is JSX and whose alternate is `null`, `undefined`, or `false` — rewrite as `&&`.
- Any `&&` operand except the last (the rendered content) that may leak a non-boolean. Comparisons, calls (`isNotBlank(x)`), `!x`/`!!x`, and boolean-typed values are accepted; `.length` is always flagged. With type info, string guards get their own message asking for `isNotBlank(x)`. Autofix: `.length` → `.length > 0`; strings → `isNotBlank(x)` only when `isNotBlank` is already imported (otherwise no fix); everything else → `!!x`.

**Fix**:

1. Counts / `.length`: compare — `{items.length > 0 && <List />}`.
2. Already-boolean conditions: short-circuit as-is — `{isReady && <List />}`.
3. Strings (`string | undefined`): `{isNotBlank(name) && <Label />}` from `@lichens-innovation/ts-common` — not `!!name`, which trips `prefer-blank-helpers`.
4. Nullable objects: `{!isNullish(user) && <Avatar user={user} />}`.
5. Keep a real ternary only when **both** branches render something: `{cond ? <A /> : <B />}`.

**AVOID**:

- Converting back to `cond ? <X /> : null` — that's the old `react/jsx-no-leaked-render` ternary autofix and it reads worse for a single optional branch.
- Writing `!!name` on a string by hand to silence the report — it trips `prefer-blank-helpers`; use `isNotBlank(name)`.

{% include "includes/line_level_issues.md" %}
