#!/usr/bin/env bash
# Check that the icons that data/notrack/social.yaml names are the SVG files in
# assets/icons. A name without a file fails the build of every website that
# uses that social link, and a file that nothing names is left over.
# Run from the repository root.
diff --unified=0 \
    --label "icons named in data/notrack/social.yaml" \
    <(grep '^  icon: ' data/notrack/social.yaml | cut -d ' ' -f 4 | sort -u) \
    --label "files in assets/icons" \
    <(basename -s .svg assets/icons/*.svg | sort)
