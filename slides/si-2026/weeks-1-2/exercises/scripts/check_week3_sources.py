#!/usr/bin/env python3
"""Read-only consistency check for the Lecture 5/6 banks.

Exit 0: matches the reviewed baseline. Exit 1: review needed. Exit 2: bad input.
This deliberately never edits the slides, banks, or baseline.
"""
import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path


def digest(value):
    return hashlib.sha256(value).hexdigest()


class SlideParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.anchors = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section" and "slide" in attrs.get("class", "").split():
            self.anchors.append(attrs["id"])


def describe_deck(root, locale):
    qmd = "index.qmd" if locale == "en" else "pt/index.qmd"
    html = "_site/index.html" if locale == "en" else "_site/pt/index.html"
    raw = (root / qmd).read_bytes()
    active = re.sub(r"<!--.*?-->", "", raw.decode("utf-8"), flags=re.S)
    headings = list(re.finditer(r"^#{1,2} (.+)$", active, flags=re.M))
    rendered = (root / html).read_bytes()
    parser = SlideParser()
    parser.feed(rendered.decode("utf-8"))
    if len(headings) != len(parser.anchors):
        raise ValueError(f"{qmd}: source has {len(headings)} headings, but render has "
                         f"{len(parser.anchors)} slides; render the current source first.")
    records = []
    for i, heading in enumerate(headings):
        end = headings[i + 1].start() if i + 1 < len(headings) else len(active)
        fragment = active[heading.start():end]
        explicit = re.search(r"\{[^}\n]*#([^\s}]+)", heading[1])
        statement = re.search(r"^:::\s*\{#(stmt-[^\s}]+)", fragment, flags=re.M)
        title = re.sub(r"\s*\{.*\}\s*$", "", heading[1]).strip()
        key = explicit[1] if explicit else statement[1] if statement else title
        dependencies = {}
        for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", fragment):
            path = (root / qmd).parent / match[1]
            if "://" not in match[1]:
                dependencies[str(path.resolve().relative_to(root.resolve()))] = digest(path.read_bytes())
        records.append({
            "key": key, "slide": i + 2, "anchor": parser.anchors[i], "title": title,
            "sha256": digest(fragment.strip().encode("utf-8")),
            "dependencies": dependencies,
        })
    if len({x["key"] for x in records}) != len(records):
        raise ValueError(f"{qmd}: duplicate stable source key")
    return {
        "sourceFile": qmd, "renderedFile": html,
        "sourceSha256": digest(raw), "renderedSha256": digest(rendered),
        "slides": records,
    }


def compare(baseline, current, locale):
    old = {x["key"]: x for x in baseline["decks"][locale]["slides"]}
    new = {x["key"]: x for x in current["slides"]}
    changed = set()
    print(f"\n{locale.upper()}:")
    for key in sorted(old.keys() | new.keys()):
        a, b = old.get(key), new.get(key)
        reason = None
        if a is None:
            reason = "ADDED"
        elif b is None:
            reason = "REMOVED / RENAMED"
        elif a["sha256"] != b["sha256"] or a["dependencies"] != b["dependencies"]:
            reason = "CONTENT / FIGURE CHANGED"
        elif a["slide"] != b["slide"] or a["anchor"] != b["anchor"]:
            reason = "NUMBER / ANCHOR CHANGED"
        if reason:
            changed.add(key)
            item = b or a
            print(f"  {reason}: slide {item['slide']} — {item['title']}")
    affected = sorted(question for question, refs in baseline["questionSources"][locale].items()
                      if any(key in changed for key in refs))
    before = baseline["decks"][locale]
    source_changed = before["sourceSha256"] != current["sourceSha256"]
    render_changed = before["renderedSha256"] != current["renderedSha256"]
    if affected:
        print("  Review these questions in BOTH languages: " + ", ".join(affected))
    elif changed:
        print("  No direct question references changed; review lecture scope and slide numbering.")
    if source_changed and not changed:
        print("  Source changed outside mapped slide bodies (e.g. metadata/comments); inspect the diff.")
    if render_changed:
        print("  Rendered deck differs; review and refresh the reference snapshot after approval.")
    if changed and not render_changed:
        print("  Source changed but render did not: the rendered deck may be stale.")
    different = bool(changed or source_changed or render_changed)
    if not different:
        print("  Matches the reviewed baseline.")
    return different


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slides-source", required=True, type=Path,
                        help="Week 3 slide project directory containing index.qmd and _site/")
    parser.add_argument("--baseline", type=Path,
                        default=Path(__file__).resolve().parents[1] / "sources/week-3-baseline.json")
    args = parser.parse_args()
    try:
        baseline = json.loads(args.baseline.read_text())
        print("Reviewed source baseline:", baseline["checkedOn"])
        changes = [compare(baseline, describe_deck(args.slides_source, locale), locale)
                   for locale in ("en", "pt")]
    except (OSError, ValueError, KeyError) as exc:
        print("Cannot verify:", exc)
        return 2
    if any(changes):
        print("\nREVIEW NEEDED. No files were changed. Review answers, assumptions, translations, "
              "scope and source links before refreshing the baseline and snapshot.")
        print("This detects source changes; it does not prove mathematical consistency.")
        return 1
    print("\nBoth banks still match the recorded source version.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
