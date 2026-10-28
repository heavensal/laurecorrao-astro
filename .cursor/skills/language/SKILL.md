---
name: language
description: >-
  Keeps a brochure site’s source in English (files, folders, the tree, and
  markdown) while French and English copy both live in i18n. ENABLE_MULTILANG
  defaults to false and is the switch that publishes /en/. Use when adding
  pages, renaming files, editing copy, slugs, locale JSON, or ENABLE_MULTILANG.
---

# Language

1. Code is always in English: files, folders, the tree, identifiers, and markdown.
2. `ENABLE_MULTILANG` decides whether the site is French only or publishes several languages. The default is `ENABLE_MULTILANG=false`.
3. Even when `ENABLE_MULTILANG=false`, the site has i18n, in French and in English.

## Code

- File names, folder names, component names, variables, and comments are English.
- Markdown in the repository is English (`README.md`, `MULTILANG.md`, this skill).
- A public URL slug is an address, not a file name. Slugs live in `src/lib/paths.ts`. French pages keep French slugs. English pages keep English slugs under `/en/`.
- Route files have English names. French URLs are emitted by `src/pages/[...slug].astro` from `contentSlugs` and `legalSlugs`. Do not add `src/pages/mentions-legales.astro` or any other French file name.
- Visible sentences are not written in `.astro` or `.ts`. They live in `src/i18n/locales/fr.json` and `en.json`, read with `getFixedT(locale)`.
- Keys are English (`Contact.firstName`). French and English values are the copy.

## ENABLE_MULTILANG

Declared in `.env`, `.env.example`, and `src/env.d.ts`. Read only through `isMultilangEnabled()` (`import.meta.env.ENABLE_MULTILANG === 'true'`). Any other value is off. Default: `false`.

| Site | `publishedLocales` | `ENABLE_MULTILANG` |
|---|---|---|
| French only | `['fr']` | `false` |
| French and English | `['fr', 'en']` | `true` |

Turn both on together. `false` generates no `/en/` URL and hides the language switcher. `true` generates `/en/` and shows the switcher. `en.json` does not create a URL by itself.

## i18n while the flag is false

Every new or changed key in `fr.json` is written in `en.json` in the same change. A missing English key would later show French on an English URL. An empty English string is allowed only when the French string is empty.

Keep `en.json` and `src/pages/en/[...slug].astro` when the flag is `false`. `getStaticPaths()` there returns `[]` until the flag is `true`.
