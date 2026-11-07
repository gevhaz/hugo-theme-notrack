# Changelog

## [Unreleased]

## [1.4.0] - 2026-11-07

### Added

- German translation.
- Social links to 27 more sites, e.g. Bluesky, Pixelfed, PeerTube, Codeberg,
  PyPI and arXiv, and to Gitea and Forgejo on any server. `fediverse` links to
  profiles on servers like Misskey or GoToSocial.
- Social sites can be changed or added in your site's own
  `data/notrack/social.yaml`. See "How to change or add social sites" in the
  README.
- Unknown keys in `params.social`, e.g. misspelled ones, give a warning when
  building.
- `params.author` can be a table with `name` and `email`, which puts your
  email address in RSS feeds. See the README.

### Breaking

- Disqus comments are removed because it's unethical to have your users load
  Disqus code. Disqus has been deprecated for some time already. I will be
  looking at other commenting solutions. Open an issue if this breaks
  anything.
- `mastodon` takes a full handle like `@user@example.org`, so that the link
  goes to your server. A value without a server fails the build.
- `googlescholar` takes only the profile ID, without `user=`.
- `skype`, `vine`, `foursquare`, `youtubelegacy` and `youtubecustom` are
  removed. For YouTube, use `youtube` with the channel's handle.

## [1.3.0] - 2026-11-02

### Added

- The theme's text, like "Posted:" and "Read more...", can be translated in
  your site's translation files.
- `dateFormat` sets how post dates are shown, e.g. `:date_long`, with month
  names in the language of your `locale`.
- The taxonomy buttons at the top of the blog show the title of the
  taxonomy's page, which you can set in e.g. `content/categories/_index.md`.
- The standard edition of Hugo is enough. The extended edition is no longer
  needed.

### Breaking

- Hugo 0.158.0 or newer is required.
- RSS feeds use Hugo's built-in template. The home feed, `/index.xml`, now
  lists all pages, e.g. your resume, not only blog posts. The RSS social link
  points to the feed of the first section in `mainSections`, e.g.
  `/blog/index.xml`.

## [1.2.0] - 2026-10-25

### Added

- The theme builds with recent Hugo versions, which no longer have
  `.Site.Author`.

## [1.1.0] - 2025-04-08

### Added

- The RSS social link works on sites served from a subdirectory, e.g.
  `https://example.org/blog/`.

## [1.0.0] - 2025-03-04

There is no changelog for this release and the ones before it.

[Unreleased]: https://github.com/gevhaz/hugo-theme-notrack/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/gevhaz/hugo-theme-notrack/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/gevhaz/hugo-theme-notrack/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/gevhaz/hugo-theme-notrack/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/gevhaz/hugo-theme-notrack/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/gevhaz/hugo-theme-notrack/releases/tag/v1.0.0
