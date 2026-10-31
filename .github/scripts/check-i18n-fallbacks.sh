#!/usr/bin/env bash
# Check that every i18n lookup in the templates has an English fallback,
# e.g. `i18n "readMore" | default "Read more..."`, and that the fallbacks
# match i18n/en.yaml. Run from the repository root.
set -euo pipefail

if grep -rn 'i18n "' layouts | grep -v '| default'; then
    echo "These lookups have no fallback text."
    exit 1
fi

diff -u --label i18n/en.yaml --label layouts \
    <(grep -vE '^(#|$)' i18n/en.yaml | sed 's/{{ \.Title }}/%s/' | sort -u) \
    <(grep -rhoE 'i18n "\w+"( \.)? \| default (\(printf )?"[^"]*"' layouts |
        sed -E 's/i18n "(\w+)".*"([^"]*)"$/\1: "\2"/' | sort -u)
