A TODO with no ticket reference is debt that lives only in the author's memory. Nobody else can triage it, prioritize it, or find it again, and it quietly ages into an assumption no one questions anymore.

**What triggers**: any comment containing one of the configured `terms` (default `["TODO"]`, case-sensitive substring, so `todo` isn't caught but `TODOS` is) that has no match for `pattern` (default `([A-Z0-9]+-\d+)`, case-insensitive, matched anywhere in the comment). Options are `terms`, `pattern`, and `commentPattern` (replaces `pattern` when set). No autofix.

**Fix**:

1. Open (or find) a ticket describing the follow-up work.
2. Put its key or URL directly in the comment — `// TODO: JIRA-1234 - <short description>`, or the full `.../browse/JIRA-1234` link.
3. If the work is genuinely small enough to just do right now, do it now instead of leaving a TODO at all.

**AVOID**: pasting an unrelated or made-up-looking ticket ID just to satisfy the pattern, or lowercasing the term (`todo:`) to dodge it. An untraceable reference is worse than an honest bare TODO, because it looks resolved to anyone scanning for one.

{% include "includes/line_level_issues.md" %}
