A promise nobody awaits is a rejection nobody handles. If the async call throws, the failure vanishes into an unhandled-rejection warning instead of surfacing where the caller could react to it — the UI silently gets stuck on a stale spinner, a mutation looks like it "did nothing", or a redirect never fires.

**Give every promise an explicit fate:**
1. If the caller genuinely needs the result or needs to know it finished: `await` it, in an `async` function.
2. If it's deliberately fire-and-forget (navigation, a fire-and-forget refetch/invalidate, a logout redirect) and any rejection would just be noise: mark it with the `void` operator — `void someAsyncCall()`. This documents the choice instead of hiding it.
3. If you want to react to failure without awaiting: end the chain with `.catch(...)`.

**AVOID**: wrapping the call in `.then(() => {})` with no rejection handler just to make the checker stop complaining — that silences the exact failure this rule exists to surface, without the honesty of `void`.

{% include "includes/line_level_issues.md" %}
