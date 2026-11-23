# Blog — publication and Forge integration

Canonical blog rule for Codex, Cursor, GitHub Copilot and Antigravity. Read it when creating a site, enabling a blog, adding article routes, or changing Forge article imports. Apply [MULTILANG.md](MULTILANG.md) for the site's language architecture. Keep this rule here; other instructions reference it rather than duplicate it.

## 1. Determine whether the website has a blog

Use the user's request and existing configuration. Ask whether a blog is required only when the decision is unknown.

For a new site without a blog:

- Do not create blog pages, article routes or blog components.
- Do not fetch articles or add blog links to navigation, homepage or sitemap.
- Keep `FORGE_ARTICLES_ENABLED=false`.

Do not delete an existing blog without an explicit removal request. Removing published URLs requires a migration decision.

## 2. Use the website's language configuration

Use the published languages and default language already established for the site. Do not ask again or create a separate blog language configuration.

- A new monolingual site has no i18n or language switcher.
- A multilingual site uses the configured languages and shared blog components.
- Source file and component names remain English; public paths follow localized routing.
- Forge languages are configured before site creation. Do not modify them unless requested.

## 3. Enable article imports at build time

For an enabled blog, configure:

```dotenv
FORGE_ARTICLES_ENABLED=true
FORGE_URL=<Forge API base URL>
FORGE_API_TOKEN=<website API token>
```

Document variables in `.env.example` without credentials, declare types in `src/env.d.ts`, and configure equivalent values in the deployment environment. A local `.env` does not configure production.

Read the flag with an exact comparison to the string `true`. Disabled imports make no articles API calls. Fetch articles during Astro's static build, not in browser scripts. Keep `FORGE_API_TOKEN` build-side; do not expose it through a `PUBLIC_` variable or client output.

## 4. Map the actual Forge contract

**Established prerequisite: Forge supplies article translations, their relationship to the same article, and their localized URLs through its API.** Do not ask the user whether Forge provides translations or attempt to generate them locally.

Inspect the actual API response or contract to map field names. Identify the list/detail endpoints, stable article identifier, locale, slug or public path, translation relationships, available publication/modification dates, and any pagination. Do not invent fields.

Keep provider-specific mapping in the Forge integration; components consume normalized article data.

Distinguish a valid empty list from API failure, invalid data, failed article details and missing translations. Request each required locale explicitly where supported. Validate returned locale metadata; do not publish an API default-language fallback as another language.

Use only content eligible for public publication. Respect Forge's publication contract and exclude drafts or future publications when those states are exposed.

## 5. Generate the blog index and article pages

Generate one blog index and one static detail page per published article, for each published language with valid content.

Monolingual example using the existing blog segment convention:

```text
/blog/
/blog/<article-slug>/

src/
  pages/
    blog/
      index.astro
      [slug].astro
  features/
    blog/
      components/
        BlogIndex.astro
        BlogArticle.astro
        BlogCard.astro
      content.ts
      routes.ts
  integrations/
    forge/
      client.ts
      articles.ts
```

Preserve the article slug supplied by Forge. Do not derive a competing slug from its title, translate it or change its spelling. Use the site's routing helpers and base path.

An existing `[...slug].astro` combining index and detail routes may be retained. `[slug].astro` assumes a single segment; use a validated catch-all if the API supplies nested paths.

Multilingual example, French default:

```text
/blog/
/blog/gerer-le-stress/
/en/blog/
/en/blog/managing-stress/

src/pages/[locale]/blog/index.astro
src/pages/[locale]/blog/[slug].astro
src/i18n/locales/fr/blog.json
src/i18n/locales/en/blog.json
```

Generate only configured secondary locale prefixes. The default language stays at the root. Use shared components and localize only the blog interface in `blog.json` (labels, navigation, empty state). Article titles, descriptions and bodies remain in Forge, not local dictionaries.

Distinguish the actual API fields:

- Slug: combine it with the site's localized blog prefix.
- Full public path: normalize against the routing policy without duplicating locale prefixes.
- Absolute URL: verify its intended origin before treating it as a local route.

Do not treat a URL, path and slug as interchangeable. Report conflicts between an API path and the configured site routing rather than silently rewriting the public address.

## 6. Switch to the same translated article

Use the translation relationships and localized URLs returned by Forge.

- Do not infer relationships from identical slugs, similar titles, list positions or locally translated text.
- On an article page, the switcher links to the same article in the selected language using the corresponding API URL/path.
- Expose only published, generated translations in the site's enabled languages.
- Use the same relationships for hreflang.
- If a translation is unavailable, omit its language-switch link and hreflang entry.
- Do not silently substitute a homepage or blog index for a missing article translation.
- On a blog index, switching languages leads to the target-language blog index.

A malformed or incomplete response is an integration error to diagnose, not a reason to invent a translation mapping. Do not claim same-article switching is complete until the mapping is implemented and verified.

## 7. Use one validated publication dataset

Derive static routes, index cards, homepage previews, switcher destinations, hreflang, sitemap entries and optional `llms.txt` references from the same validated publication set.

No card or alternate link may point to a detail page omitted during generation. Validate route uniqueness within each locale and report invalid or conflicting slugs explicitly. Follow API pagination; do not silently publish only the first response page.

Sort articles deterministically, newest publication first with a stable tie-breaker. Do not invent missing dates.

## 8. Handle publication failures explicitly

Recommended production policy for an enabled blog:

- Missing credentials, an API timeout/failure, invalid required data or a detail-fetch failure for an indexed article fails the build with a clear diagnostic.
- This retains the previously deployed site instead of replacing it with an incomplete blog.
- Use bounded request timeouts. Any retries must be bounded and appropriate to transient failures.

A valid empty list is not a network failure: generate an index with an appropriate localized empty state and no article pages. Do not invent sample articles or substitute another language.

A missing translation is not necessarily an API failure: publish valid available versions without false alternates. Do not implement an implicit stale-content cache; retaining cached content requires an explicit freshness/publication policy.

Agree on the failure policy when implementing this integration. Recording this rule does not itself change the existing site's production behavior.

## 9. Render accessible, trustworthy content

Index cards provide meaningful links, titles, descriptions and dates when available. Each article has one primary heading, readable structure, localized navigation back to the index, valid dates where available, and appropriate image alternatives.

Treat Forge HTML according to an explicit sanitization contract. CMS origin alone does not prove raw HTML is safe. Apply the documented URL and HTML security policy to embedded links and media.

Optimize remote images through supported mechanisms where practical; they do not automatically benefit from the local Astro image pipeline. Format dates in the page locale. Never use the build date as an invented article modification date.

## 10. Keep SEO aligned with publication

For indexes and articles, set the correct HTML language, localized title/description, self-referencing canonical and canonical sitemap URL.

For articles:

- Set Open Graph type to `article` and use the actual title, description and cover image.
- Generate `Article` or `BlogPosting` structured data from verified content.
- Use actual authorship, not an assumption that the site owner authored every article.
- Use valid publication/modification dates when supplied.

For multilingual articles, generate reciprocal hreflang links for actual translations, including the current page. Use the default-language equivalent as `x-default` when it exists. Do not canonicalize all translations to one language.

Changing a published slug requires an explicit redirect strategy. Do not silently change existing URLs.

## 11. Verify the implementation

Check the applicable cases:

- Disabled blog: no article fetches, routes or navigation links.
- Enabled blog: expected indexes and detail pages exist.
- Valid empty list: index with an appropriate empty state.
- API failure: the build follows the agreed failure policy.
- Invalid/duplicate slugs: explicit diagnostics.
- No cards, alternates or sitemap entries reference missing pages.
- Localized paths match Forge's actual article versions.
- Language switching reaches the same translated article; missing versions are omitted.
- Metadata and structured data agree with visible content.
- API credentials are absent from browser-delivered output.
- Mobile layouts and keyboard navigation work.

Report checks performed and remaining limitations.

## Existing repository: migration boundary

This rule documents the target behavior; it does not authorize a runtime rewrite. Existing blog routes are `src/pages/blog/[...slug].astro` and `src/pages/en/blog/[...slug].astro`, with helpers in `src/lib/forge-blog.ts`.

The current implementation matches translations by identical slugs and may omit blog pages after fetch failures. These are migration gaps, not the new standard. Adopting Forge's translation relationships and changing the failure policy requires a scoped implementation task. No API field names have been verified merely by recording this rule.
