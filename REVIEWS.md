# Reviews — local fallback and Forge integration

Canonical reviews rule for Codex, Cursor, GitHub Copilot and Antigravity. Read it when creating a website, adding testimonials, editing local reviews or changing review imports. Apply [MULTILANG.md](MULTILANG.md) for language architecture. Reviews follow the same optional-section, shared-import and per-locale replacement model as [FAQ.md](FAQ.md), with the authenticity requirements below.

## 1. Determine whether reviews are requested

Use the user's request and existing configuration. Ask only when the decision is unknown.

For a new site without reviews, do not build a reviews section, generate fallback testimonials, fetch reviews, add review navigation anchors or generate review structured data. Keep `FORGE_REVIEWS_ENABLED=false`.

Do not remove an existing reviews section without an explicit request.

## 2. Prepare local content without inventing customer experiences

When reviews are requested, create a reusable section and a local fallback dataset presented with the same component as Forge reviews.

Unlike FAQ answers, testimonials describe other people's experiences. Context and theme alone are not evidence of a real review.

- Use authentic testimonials supplied or verified by the client for production fallback content.
- Preserve their meaning, attribution and actual rating. Do not invent customer names, quotations, outcomes, dates, ratings or verification badges.
- Use only the attribution approved for display; do not invent a full identity for an anonymous testimonial.
- Contextual example reviews may be written for development previews, but must be visibly marked as fictional examples and explicitly excluded from production output and structured data.
- Keep example fixtures separate from the production fallback dataset. Do not rely only on removing their example labels before launch.
- If no authentic local reviews and no published Forge reviews are available, omit the public reviews section and report the missing content. Keep the preview layout available without publishing fictional social proof.
- Do not automatically upload local reviews to Forge. CMS authoring is a separate task.

Authentic local and remote reviews have the same visual presentation; visitors do not need a label describing the technical fallback source.

## 3. Reuse the shared Forge connection

If Forge is already connected for the blog, FAQ or another resource, reuse its API client, base URL, website token, build-time infrastructure and rebuild integration. Do not duplicate the connection or ask for credentials already configured.

If no integration exists, use the shared setup skill when available. Provisioning will be specified separately; do not invent a missing skill or silently create accounts.

Forge language settings are configured before site creation. Consume them without changing them unless requested.

## 4. Enable imports by default for requested reviews

Configure:

```dotenv
FORGE_REVIEWS_ENABLED=true
FORGE_URL=<shared Forge API base URL>
FORGE_API_TOKEN=<shared website API token>
```

The enabled flag is configuration, not a credential; it may use the deployment's existing variables/secrets mechanism. Read it with an exact comparison to the string `true`.

Document variables in `.env.example` without real credentials, declare types in `src/env.d.ts`, and supply equivalent production build settings. A local `.env` does not configure production. Keep the token build-side, never in `PUBLIC_` variables or browser scripts.

The flag controls the import source, not whether reviews are requested. Explicitly disabling imports retains authentic local fallback content and makes no reviews API call.

## 5. Resolve the displayed list per locale

Fetch published reviews during Astro's build, not from the browser. Inspect the actual API contract, normalize field names, validate content/attribution and ratings when present, and preserve the intended ordering. Do not silently convert missing ratings to five stars.

| Condition | Production display |
| --- | --- |
| Reviews not requested | No section, fetch or review schema |
| Reviews requested, imports explicitly disabled | Authentic local reviews, if available |
| Valid Forge response with zero published reviews in the current locale | Authentic local reviews for that locale, if available |
| Valid Forge response with one or more published reviews in the current locale | Only those Forge reviews |
| No authentic local or published Forge reviews | No public reviews section; report missing content |

One published Forge review replaces the entire local list. Do not merge, pad or supplement it with local items. Removing all published Forge reviews restores the authentic local list after rebuilding, or hides the section if that list is empty.

Network failures, missing credentials and invalid responses are not valid empty lists. Report them distinctly and follow the project's explicit failure policy. Existing helpers fall back locally on unusable responses; recording this rule does not change runtime behavior or impose the blog's failure policy on reviews.

## 6. Handle multilingual reviews independently

Forge supplies localized review content through its API.

- Use the website's published languages, not a separate review language configuration.
- Request the expected locale through the actual API contract and validate returned locale metadata where available.
- Do not translate or rewrite Forge reviews locally, or copy them into local dictionaries.
- Do not present default-language API fallback as a target-language translation.
- Prepare authentic local content for each published language when available. A translation of a local testimonial must preserve its meaning, attribution and rating, and must not imply a second independent reviewer.
- Resolve the source independently for each locale. French Forge reviews may coexist with English local reviews.
- If the current locale has neither published remote reviews nor authentic local content, omit its public section rather than using another language or invented reviews.

Use the website's language switcher; do not create a review-specific switcher.

## 7. Organize data and presentation

Use English source names. Suggested locations for new implementations:

```text
src/features/reviews/
  ReviewsSection.astro
  ReviewCard.astro
  content.ts
src/integrations/forge/reviews.ts
```

For a new monolingual site, use ordinary local content such as `src/content/reviews.ts`, without i18n or translation keys.

For multilingual sites, place interface text and authentic localized fallback content in the relevant page dictionary or shared `reviews.json` namespace. Keep language-independent review facts owned by one data source where practical. Do not require unpublished languages or duplicate remote content into dictionaries.

Normalize both sources into one view model, for example `{ author, text, rating }`, with a rating only when the contract and actual review provide one. The current repository uses `content` remotely and `text` locally; map that difference at the integration boundary.

Use the same layout, typography and rendering for authentic local and Forge reviews. Prefer readable static cards; a carousel is not required. Keep text in generated HTML and accessible without JavaScript. Give ratings a textual accessible equivalent and mark decorative stars appropriately.

## 8. Keep ratings and structured data truthful

Resolve the selected dataset once per locale and reuse it for rendering and any structured data.

- Never emit fictional preview testimonials in production HTML, metadata or JSON-LD.
- Do not invent an aggregate rating or review count.
- Do not present the average of a displayed subset as the rating of all customer reviews.
- Do not count translations of the same review as separate reviews.
- Do not add Review or AggregateRating schema automatically merely because review cards exist. Verify applicability and current search-engine requirements when implementing it.
- Any applicable schema must describe the actual reviewed entity and match genuine visible content and verified rating data.

Render plain text safely. For rich HTML, follow the shared integration's explicit sanitization contract.

## 9. Rebuild after Forge changes

The site reflects the latest successful static build. Enable review changes as a rebuild trigger when configuring Forge, reusing the existing website integration instead of creating a duplicate webhook.

Verify that the first published review replaces local content after rebuilding. Verify that removal of all published reviews restores authentic local content or hides the section when none exists. Do not imply live updates without a rebuild.

## 10. Verify the result

Check the applicable cases:

- No requested reviews: no section, fetch or review schema.
- Requested reviews: imports enabled by default in setup and deployment configuration.
- Empty remote list: authentic local fallback, or an omitted public section.
- N published reviews: exactly those N, ordered correctly, without local additions.
- Independent source selection for every published locale.
- Identical rendering for local and remote data, including normalized field names.
- Ratings and attribution remain faithful to source data.
- Fictional examples are marked in previews and absent from production and schema.
- Keyboard access, mobile layout and textual rating labels work.
- API failures follow the explicit project policy and credentials stay out of client output.

Report checks performed and remaining limitations.

## Existing repository: migration boundary

The repository has `fetchReviews()` in `src/lib/forge-blocks.ts`, `localReviews()` in `src/lib/local-blocks.ts` and local review entries in its locale files. Their presence does not verify testimonial authenticity or establish a rendered reviews section. Confirm provenance before using these entries as production fallback.

Recording this rule does not add a section, enable production imports, rewrite the existing i18n structure, change Forge settings or alter failure policy. Implementation is a separate task.
