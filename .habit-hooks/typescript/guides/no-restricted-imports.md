A default import of a whole utility package (`import _ from "lodash"`) pulls in — or at least makes the bundler's job harder to prove it doesn't pull in — the entire library, when the file almost always uses one or two functions from it. Tree-shaking works far more reliably on named imports from an ESM-first build.

**Fix**: import only what you use, from the ESM-friendly entry point named in the lint error's message (e.g. `import { groupBy } from "lodash-es"` instead of `import _ from "lodash"`).

**AVOID**: keeping the default import and just renaming it, or wrapping it in a re-export — that doesn't change what actually ships in the bundle.

{% include "includes/line_level_issues.md" %}
