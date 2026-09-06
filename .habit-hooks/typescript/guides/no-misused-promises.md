An `async` function returns a promise, but `onClick`, `onSubmit`, and similar DOM/React event-handler props expect a plain `void`-returning callback. Pass the async function straight through and its rejection has nowhere to go — same silent-failure problem as an unawaited promise, just hidden one layer deeper behind a prop.

**Break the implicit promise chain at the boundary, not inside the handler:**
1. At the call site, wrap it so the handler itself is synchronous: `onClick={() => void handleSubmit(onSubmit)(e)}` (or `onClick={() => void doSomethingAsync()}`).
2. If the same async handler is wired into several places through a shared component (a confirm dialog's `onConfirm`, a shared submit-button shell), fix it once where that component invokes the callback, and widen the prop's type to `() => void | Promise<void>` — that fixes every caller at once instead of repeating the wrapper everywhere.
3. If the handler doesn't actually need to be `async` (no real `await` inside it), the more honest fix is dropping `async` entirely rather than papering over it.

**AVOID**: sprinkling `.catch(() => {})` at each call site as a reflex — that just discards the rejection instead of deciding whether it should surface (toast, retry, log) or is genuinely fire-and-forget.

{% include "includes/line_level_issues.md" %}
