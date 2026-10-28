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

### Fetch

`GET {FORGE_URL}/articles?locale=fr`. `FORGE_URL` defaults to `https://forge.1344.fr/api/v1`. The token is the website’s API token. The same call works on any brochure site; only the token and the locale change.

```js
const response = await fetch(`${FORGE_URL}/articles?locale=fr`, {
  headers: {
    Authorization: `Bearer ${FORGE_API_TOKEN}`,
    Accept: "application/json",
  },
});
const body = await response.json();
const articles = body.data;
```

`locale` is `fr` or `en`. When that locale has no published article, the API falls back to the website’s default locale. A draft, an archived article, or a published article whose `published_at` is still in the future is absent from `data`.

One article is `GET {FORGE_URL}/articles/{slug}?locale=fr`. That response is the object itself, with no `data` wrapper.

### Response

The index body is `{ updated_at, data }`. `updated_at` is the latest `updated_at` in `data`, or `null` when `data` is empty. The same instant is also the `X-Content-Updated-At` header. The articles are `body.data`. Reading the root as an array (`body[0]`, `body.length`, `body.map`) is `undefined`.

```json
{
  "updated_at": "2024-03-20T12:00:00Z",
  "data": [
    {
      "id": 1,
      "title": "Mon premier article",
      "slug": "mon-premier-article",
      "locale": "fr",
      "description": "Un court résumé...",
      "published_at": "2024-03-20T12:00:00Z",
      "updated_at": "2024-03-20T12:00:00Z",
      "cover_image_url": "https://res.cloudinary.com/demo/image/upload/forge/arm-services/2f1c0c3e-1b4a-4e2a-9c1a-0b6e8a1d4f20.jpg",
      "content_html": "<p>Contenu HTML riche</p><figure><img src=\"https://res.cloudinary.com/demo/image/upload/forge/arm-services/9ab3e6d1-5c44-4a1e-8f20-7d1c2b9e0a11.jpg\" alt=\"\"></figure>"
    }
  ]
}
```

`description`, `cover_image_url`, and `content_html` are `null` when the article has none. `content_html` is the public HTML, with inline images already turned into `<figure><img>`. An empty index is `{ "updated_at": null, "data": [] }`.
