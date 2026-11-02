---
name: forge-ressources
description: >-
  Integrates Forge blog articles, reviews, and FAQs into an Astro brochure
  site at build time. Each resource is static and depends on its .env flag
  (FORGE_FAQ_ENABLED, FORGE_REVIEWS_ENABLED, FORGE_ARTICLES_ENABLED). Use when
  fetching Forge content, editing the blog, FAQs, reviews, or those flags.
---

# Forge resources

Blog articles, reviews, and FAQs are integrated through the build. They are static, not dynamic. A built resource depends on its variable in `.env`.

## Flags

Read a flag only as the string `true` (`import.meta.env.FORGE_*_ENABLED === 'true'`). Any other value is off. Declare each flag in `.env`, `.env.example`, and `src/env.d.ts`.

| Flag | `true` | not `true` |
|---|---|---|
| `FORGE_FAQ_ENABLED` | FAQs come from Forge | FAQs are not provided by Forge |
| `FORGE_REVIEWS_ENABLED` | Reviews come from Forge | Reviews are not provided by Forge |
| `FORGE_ARTICLES_ENABLED` | Blog articles are pages of the site | `/blog` is not generated |

`FORGE_FAQ_ENABLED=false` means FAQs are not provided by Forge. The same rule applies to reviews. When FAQs or reviews are off, or the fetch fails, the section uses the local copy in this repository.

## Build

The fetch runs while Astro generates the site. The HTML is written then. Do not request these resources from the browser.

`fetchForge` calls `{FORGE_URL}/{path}?locale=` with `Authorization: Bearer ${FORGE_API_TOKEN}` and `Accept: application/json`. `FORGE_URL` defaults to `https://forge.1344.fr/api/v1`. A list response is `{ updated_at, data }`. An empty token or a failed response is a failed fetch.

## Articles

When `FORGE_ARTICLES_ENABLED=true`, blog articles are pages of the site. Each page is reached by its slug. The slug is provided by the API (`GET /articles`, then `GET /articles/:slug`), which is why the blog is static content supplied at build time.

- The index is `/blog/`. An article is `/blog/{slug}/`.
- A failed index request does not generate those pages.
- An empty `data` array still generates the index, with no articles.

Use the existing helpers in `src/lib/forge.ts`, `forge-blog.ts` and `forge-blocks.ts`. The article list uses the response’s `data` array. An individual article is returned directly. Empty or unusable FAQ and review blocks fall back to local copy in `src/lib/local-blocks.ts`.
