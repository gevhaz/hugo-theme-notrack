# Instructions for Claude Code

## Comments

- Start a partial or shortcode with a comment written for the caller:
  give enough to use it without reading its code. Say what it returns
  or renders, what it expects as context or parameters, and the
  special cases and constraints that its name doesn't show.
- Use a single line when the name says the rest. An example often says
  more than another sentence would.
- Explain how it works in comments in its body, so that the comment at
  the top stays true when the implementation changes. Leave out
  background that the caller doesn't need.
- Whatever a comment repeats from the code has to be kept in sync by
  hand, and no check notices when it isn't. Prefer saying less to
  saying something that can go stale.

## Spellcheck

- Keep the words in `.github/data/project-dictionary.txt` sorted
  alphabetically, with uppercase before lowercase.

## Writing

- Write pull request descriptions and commit messages for a reader who
  reads them first, to get oriented, and only then looks at the code.
  Don't assume they already have a specific part of the code in mind.

## Commits

- Write the subject in the imperative mood, capitalized, without a full
  stop and without prefixes like `feat:`, e.g. "Fix spacing in footer".
  Keep it short, ideally under 50 characters.
- In the body, explain what's wrong without the change and why the
  change fixes it. The diff shows how.
- Keep commit messages as long as the change needs, and only a little
  longer than in code written without AI. A small change gets a subject
  line and at most a few lines of body.
- Make one commit per logical change, e.g. a refactoring, a bug fix and
  a new feature are separate commits. One change across many files is
  still one commit. Each commit should pass the checks on its own.
- Until a branch is merged, fold review fixes into the commits they fix.

## Pull requests

- Start the description with the problem, then explain why the change
  fixes it.
- Link the issues it fixes with a closing keyword, e.g. "Closes #84",
  so they're closed when the pull request is merged.
- Name the decisions and trade-offs, and the cases the change still
  doesn't handle.
- Leave out what the diff, the commit list or CI already shows, e.g.
  that the checks pass or a summary of each commit.
- Keep the description in proportion to the change. A small fix gets a
  few sentences.
- Write in prose. Use headings only when the description is long enough
  that a reader needs to skip to a part.
