"""Drop findings whose line carries a habit-hooks-disable(-next-line) directive."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

DIRECTIVE = re.compile(
    r"habit-hooks-disable(-next-line)?\b[:\s]*(.*)$", re.IGNORECASE
)

_lines_cache: dict[str, list[str] | None] = {}


def _lines(file: str) -> list[str] | None:
    if file not in _lines_cache:
        try:
            _lines_cache[file] = Path(file).read_text().splitlines()
        except OSError:
            _lines_cache[file] = None
    return _lines_cache[file]


def _directive_on(file: str, line_no: int) -> tuple[str, set[str]] | None:
    lines = _lines(file)
    if not lines or line_no < 1 or line_no > len(lines):
        return None
    match = DIRECTIVE.search(lines[line_no - 1])
    if not match:
        return None
    scope = "next-line" if match.group(1) else "line"
    tail = re.sub(r"\*+/\s*$", "", match.group(2)).strip()
    smells = {s.strip().lower() for s in tail.split(",") if s.strip()}
    return scope, smells


def _matches(scope_wanted: str, directive: tuple[str, set[str]] | None, smell: str) -> bool:
    if directive is None:
        return False
    scope, smells = directive
    return scope == scope_wanted and (not smells or smell.lower() in smells)


def is_disabled(smell: str, issue: dict) -> bool:
    details = issue.get("details") or {}
    file = str(details.get("file") or issue.get("key") or "")
    line_no = details.get("line") or details.get("startLine")
    if not file or not isinstance(line_no, int):
        return False
    return _matches("line", _directive_on(file, line_no), smell) or _matches(
        "next-line", _directive_on(file, line_no - 1), smell
    )


def transform(findings: list) -> list:
    result = []
    for finding in findings:
        smell = finding.get("smell", "")
        kept = [issue for issue in finding.get("issues") or [] if not is_disabled(smell, issue)]
        if kept:
            result.append({**finding, "issues": kept})
    return result


def main() -> int:
    json.dump(transform(json.load(sys.stdin)), sys.stdout)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
