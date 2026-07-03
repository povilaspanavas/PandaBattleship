"""Summarise .trx test results as GitHub-flavoured markdown.

Reads every *.trx file under the results directory passed as the first
argument (default: "TestResults"), sums the counters across all test
projects, and prints a markdown block suitable for $GITHUB_STEP_SUMMARY.

A green check is shown only when no tests failed or errored.
"""

import glob
import os
import sys
import xml.etree.ElementTree as ET

# Emit UTF-8 regardless of the host console's default encoding (e.g. Windows cp1252).
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

results_dir = sys.argv[1] if len(sys.argv) > 1 else "TestResults"
ns = {"t": "http://microsoft.com/schemas/VisualStudio/TeamTest/2010"}

total = passed = failed = 0
found = False
for path in glob.glob(os.path.join(results_dir, "**", "*.trx"), recursive=True):
    counters = ET.parse(path).getroot().find(".//t:ResultSummary/t:Counters", ns)
    if counters is None:
        continue
    found = True
    total += int(counters.get("total", 0))
    passed += int(counters.get("passed", 0))
    failed += int(counters.get("failed", 0)) + int(counters.get("error", 0))

skipped = max(total - passed - failed, 0)
ok = found and failed == 0
icon = "✅" if ok else "❌"

if not found:
    headline = "No test results found"
elif ok:
    headline = f"All {total} tests passed"
else:
    headline = f"{failed} of {total} tests failed"

lines = [
    f"## {icon} Tests — {headline}",
    "",
    "| Result | Count |",
    "| :-- | --: |",
    f"| Passed | {passed} |",
    f"| Failed | {failed} |",
    f"| Skipped | {skipped} |",
    f"| **Total** | **{total}** |",
]
print("\n".join(lines))
