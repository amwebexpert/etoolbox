"""Drop Arrange/Act/Assert markers in test files; keep every other finding."""

from __future__ import annotations

import json
import re
import sys

TEST_FILE = re.compile(r"\.(?:test|spec)\.[cm]?[jt]sx?$", re.IGNORECASE)
AAA_BODY = re.compile(
    r"^(Arrange|Act|Assert)(?:\s*[/&]\s*(Arrange|Act|Assert))*(?:\s*[—–\-:].*)?$",
    re.IGNORECASE,
)
QUOTED_COMMENT = re.compile(r'comment:\s*"(.*)"\s*$')
SMELL = "non-essential-comment"


def comment_body(message: str) -> str:
    quoted = QUOTED_COMMENT.search(message)
    raw = quoted.group(1) if quoted else message
    stripped = re.sub(r"^/\*+|\*+/$", "", raw)
    stripped = re.sub(r"^//", "", stripped)
    return re.sub(r"\s+", " ", stripped).strip()


def is_aaa_in_test(issue: dict) -> bool:
    details = issue.get("details") or {}
    file_path = str(details.get("file") or issue.get("key") or "").replace("\\", "/")
    if not TEST_FILE.search(file_path):
        return False
    return bool(AAA_BODY.match(comment_body(str(details.get("message") or ""))))


def transform(findings: list) -> list:
    result = []
    for finding in findings:
        if finding.get("smell") != SMELL:
            result.append(finding)
            continue
        kept = [issue for issue in finding.get("issues") or [] if not is_aaa_in_test(issue)]
        if kept:
            result.append({**finding, "issues": kept})
    return result


def main() -> int:
    json.dump(transform(json.load(sys.stdin)), sys.stdout)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
