Cognitive complexity is not cyclomatic complexity with a different name. It does not just count branches — it charges extra for **nesting**: every `if`/`else if`/`else`, loop, `switch`, `catch`, ternary, mixed `&&`/`||` sequence, or recursive call costs one point for existing, plus one more for every level of nesting it sits inside. Two flat conditions cost 2; the same two conditions nested inside each other cost 5. The score is measuring how much state a reader has to hold in their head at once, not how many paths exist.

**Attack nesting depth first, branch count second:**
1. Guard clauses before anything else — turn `if (ok) { ...whole body... }` into `if (!ok) return; ...whole body...`. This is the single highest-leverage move: it removes a nesting level from everything that follows, at zero cost to branch count.
2. A condition nested inside a loop nested inside a condition is a sign the loop body wants its own function — extracting it drops two nesting levels in one move, even though the extracted function still has its own (now-flat) branches.
3. A long `if`/`else if` chain switching on one value's shape is a lookup table or polymorphism; a `switch` with a case per type is often a map of type → handler.
4. Mixed `&&` and `||` in one condition each add to the score on top of the nesting — name the condition (`const isEligible = a && (b || c)`) so the logic reads once instead of being re-parsed at the branch.

**AVOID**: collapsing nested `if`s into one `if (a && b && c)` purely to lower the number — that trades a nesting penalty for a same-line boolean-sequence penalty and reads worse. The fix is fewer nesting levels around real work, not a smaller expression hiding the same decisions.

{% include "includes/line_level_issues.md" %}
