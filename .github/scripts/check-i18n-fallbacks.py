#!/usr/bin/env python3
# Check that the English fallback of every i18n lookup in the templates, e.g.
# `i18n "readMore" | default "Read more..."`, matches i18n/en.yaml.
# Run from the repository root.
import pathlib
import re
import sys

in_yaml = set()
for line in open("i18n/en.yaml"):
    if line.strip() and not line.startswith("#"):
        key, text = line.split(": ", 1)
        in_yaml.add((key, text.strip().strip('"').replace("{{ .Title }}", "%s")))

in_layouts = set()
for path in pathlib.Path("layouts").rglob("*.html"):
    # The fallback is the first quoted text after the key.
    in_layouts |= set(re.findall(r'i18n "(\w+)"[^"]*"([^"]*)"', path.read_text()))

for key, text in sorted(in_yaml - in_layouts):
    print(f'Only in i18n/en.yaml: {key}: "{text}"')
for key, text in sorted(in_layouts - in_yaml):
    print(f'Only in layouts: {key}: "{text}"')
sys.exit(in_yaml != in_layouts)
