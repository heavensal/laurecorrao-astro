# FAQ — contextual local content and Forge integration

Canonical FAQ rule for Codex, Cursor, GitHub Copilot and Antigravity. Read it when creating a website, adding a FAQ section, editing FAQ content or changing FAQ imports. Apply [MULTILANG.md](MULTILANG.md) for language architecture. Keep this rule here; skills and other instructions reference it.

## 1. Determine whether a FAQ is requested

Use the user's request and existing configuration. Ask only when the decision is unknown.

For a new site without a FAQ, do not build a section or local fallback, fetch FAQs, add FAQ navigation anchors, or generate FAQ structured data. Keep `FORGE_FAQ_ENABLED=false`.

Do not remove an existing FAQ without an explicit request.

## 2. Write a complete contextual local FAQ

When a FAQ is requested, write real questions and answers based on the website's activity, audience, theme, existing content and known client information.

The requested "placeholder" means a fully written local FAQ that looks and works exactly like imported Forge content. It is not a loading skeleton, lorem ipsum, an empty-state message or a "coming soon" notice.

- Choose useful questions appropriate to the site's context rather than a generic fixed list.
- Write publishable answers consistent with known facts.
- Do not invent prices, qualifications, guarantees, availability or commercial conditions.
- When a necessary fact is unknown, omit that claim or request the missing information; do not publish an invented answer.
- Keep this local dataset available when Forge has no published FAQs.
- Do not automatically upload the generated local content to Forge. CMS authoring is a separate task.

Visitors see a normal FAQ, without labels identifying the local fallback or its provider.

## 3. Reuse the shared Forge integration

If Forge is already connected for the blog or another resource, reuse its API client, base URL, website token and build-time infrastructure. Add the FAQ resource without duplicating the integration or requesting credentials already configured.

If no integration exists, use the shared Forge setup skill when available. Its creation/provisioning workflow will be specified separately; do not invent a missing skill or silently provision an account.

Forge language settings are already configured before site creation. Consume the configured content without changing those settings unless requested.

## 4. Enable FAQ imports by default

For a requested FAQ, configure:

```dotenv
FORGE_FAQ_ENABLED=true
FORGE_URL=<shared Forge API base URL>
FORGE_API_TOKEN=<shared website API token>
```

`FORGE_FAQ_ENABLED` is a configuration flag, not a credential; it may use the deployment's existing variables/secrets mechanism. Read it with an exact comparison to the string `true`.

Document the variables in `.env.example` without credentials, declare their types in `src/env.d.ts`, and supply equivalent production build settings. A local `.env` does not configure production. Keep the API token build-side, never in `PUBLIC_` variables or browser code.

The import flag controls the source, not whether the FAQ was requested. If imports are explicitly disabled for a requested FAQ, keep its local questions and answers and make no FAQ API request.

## 5. Resolve the displayed list per locale

Fetch published FAQ content during Astro's build, not from the browser. Inspect the API's actual field names, validate questions and answers, and preserve its intended order (for example, ascending `position` when that is the contract).

| Condition | Display |
| --- | --- |
| FAQ not requested | No section, fetch or FAQ schema |
| FAQ requested, imports explicitly disabled | Complete local FAQ |
| Valid Forge response with zero published FAQs in the current locale | Complete local FAQ for that locale |
| Valid Forge response with one or more published FAQs in the current locale | Only those Forge FAQs |

One published Forge FAQ replaces the entire local list with one FAQ. Do not merge, pad or supplement Forge's list with local items. Removing all published Forge FAQs restores the complete local list after a rebuild.

A network failure, missing credentials or invalid response is not a valid empty list. Report the distinction and follow the project's explicit failure policy. The current repository falls back locally on these failures; recording this rule does not change that behavior or impose the blog's failure policy on FAQs.

## 6. Handle multilingual FAQ content independently

Forge provides localized FAQ questions and answers through its API.

- Use the site's configured published languages, not a separate FAQ language configuration.
- Request the expected locale using the actual API contract and validate returned locale information where available.
- Do not translate or rewrite Forge FAQs locally, or copy them into local translation dictionaries.
- Do not render a default-language API fallback as another language's translation.
- Prepare contextual local questions and answers for every published language.
- Resolve the source independently for each language: French Forge content may coexist with English local content when Forge has no English FAQs.
- A valid empty list in the target locale uses that locale's local FAQ, not questions from another language.

Use the website's language switcher; do not create a separate switcher for the FAQ.

## 7. Store local content according to the language mode

Keep source names in English.

For a new monolingual site, store local questions/answers as ordinary content, for example `src/content/faq.ts`. Write the heading and interface text in the chosen language. Do not introduce i18n, dictionaries or translation keys.

For a multilingual site, use the relevant page dictionary if the FAQ belongs to one page, or a shared feature dictionary when reused, for example:

```text
src/i18n/locales/fr/faq.json
src/i18n/locales/en/faq.json
```

Those dictionaries hold locally authored fallback questions/answers and interface text, not copies of remote Forge content. Do not require an unpublished language.

The current site's flat `Local.faqs` and `Resources` dictionaries may remain until an explicit migration is requested.

## 8. Use identical rendering for both sources

Normalize selected data into a shared shape such as `{ question, answer }`. Use the same FAQ component, layout, typography and interaction for local and Forge content.

Prefer native `details`/`summary`, with meaningful questions, a labelled section and visible keyboard focus. The questions and answers must be present in the generated HTML and usable without JavaScript.

Render plain text safely. If Forge provides rich HTML, follow the shared integration's explicit sanitization contract instead of assuming remote HTML is safe.

Resolve and reuse the same selected list per locale for visible content, any FAQPage JSON-LD, and optional FAQ content in `llms.txt`.

If FAQ structured data is used, include exactly the actual visible questions and answers, regardless of whether they came from local content or Forge. No FAQ schema is emitted for an absent section. Do not add unrelated ratings or reviews.

## 9. Rebuild when Forge content changes

The site reflects Forge content from its most recent successful build.

When configuring rebuilds, enable FAQ updates as a trigger and reuse the website's existing rebuild integration. Do not create a duplicate webhook if the blog already uses one.

Verify that publishing the first FAQ replaces the local list after a successful rebuild, and that removing all published FAQs restores it. Do not imply that static pages update without rebuilding.

## 10. Verify the result

Check applicable cases:

- No requested FAQ: no section, local fallback, fetch or FAQ schema.
- Requested FAQ: imports enabled by default in local examples and deployment configuration.
- Zero published FAQs: the complete contextual local FAQ appears.
- N published FAQs: exactly those N appear, in the expected order, without local additions.
- Each published language receives its own Forge or local content independently.
- Local and remote datasets render identically and remain usable by keyboard.
- Any structured data matches the selected visible list.
- API failures are distinguishable from empty lists and follow the agreed project policy.
- Credentials are absent from browser output.

Report checks performed and remaining limitations. Recording this rule does not itself modify site content, runtime code, Forge settings or deployment configuration.
