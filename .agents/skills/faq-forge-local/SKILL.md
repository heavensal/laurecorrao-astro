---
name: faq-forge-local
description: >-
  Adds a home FAQ accordion with French and English local copy and optional
  Forge import at build time. FORGE_FAQ_ENABLED toggles the API; zero Forge FAQs
  falls back to Local.faqs. Use when adding or replicating FAQs, editing
  Local.faqs, FORGE_FAQ_ENABLED, or FAQ section styling on an Astro brochure site.
---

# FAQ block (local + optional Forge)

Static FAQ section for ARM Services–style Astro brochure sites. Copy lives in i18n. Forge is optional and evaluated **at build time** only.

## Expected behavior

| Condition | What visitors see |
| --- | --- |
| `FORGE_FAQ_ENABLED` is not the string `true` | All items in `Local.faqs` for the page locale |
| Flag is `true`, API fails or token missing | `Local.faqs` |
| Flag is `true`, API returns **0** published FAQs | `Local.faqs` |
| Flag is `true`, API returns **1 or more** FAQs | **Only** those Forge items (count matches Forge; local list is not merged) |

There is no empty-state placeholder: local copy is the deliberate fallback, not temporary text.

Fetch runs during `astro build` / `astro dev` SSR generation, not in the browser. Requires `FORGE_API_TOKEN` when the flag is on. Shared Forge helpers: skill **forge-ressources** (`GET /faqs`, `{ data: [...] }`).

## Replication checklist

Copy or implement on a new site:

```
Task progress:
- [ ] Env: FORGE_FAQ_ENABLED in .env, .env.example, src/env.d.ts
- [ ] isFaqEnabled() in src/lib/forge.ts (strict === 'true')
- [ ] fetchFaqs() in src/lib/forge-blocks.ts
- [ ] localFaqs() in src/lib/local-blocks.ts
- [ ] i18n: Resources.* labels + Local.faqs in fr.json and en.json
- [ ] UI: FAQ section component wired on the home page
- [ ] CI: same env name in deploy workflow if Forge is used in production
```

Read [reference.md](reference.md) for file templates and the UI markup pattern.

## 1. Local FAQ (French and English)

**Section chrome** (not the Q/A bodies) under `Resources`:

- `faqEyebrow` — small label above the title
- `faqTitle` — section heading
- `optional`: `otherQuestion` — link or button to contact (e.g. `data-contact-open`)

**FAQ items** under `Local.faqs`: array of `{ "question", "answer" }`.

Rules (align with skill **language**):

- Keys and file structure stay in English; French and English **values** hold the copy.
- Every new or changed `fr.json` key is mirrored in `en.json` in the same change.
- Write real site-specific answers in both locales; do not leave English empty while French is filled.

Example shape:

```json
"Resources": {
  "faqEyebrow": "…",
  "faqTitle": "…",
  "otherQuestion": "…"
},
"Local": {
  "faqs": [
    { "question": "…", "answer": "…" }
  ]
}
```

`localFaqs(locale)` loads `Local.faqs` via `getFixedT(locale)(..., { returnObjects: true })` and returns `[]` if the value is not an array.

## 2. Design (match site theme)

Reuse the same typography and spacing as other home sections (hero, resources, CTA):

- Section: full-width band, e.g. `bg-paper` (or the site’s alternate surface token), consistent horizontal padding `px-6 md:px-10 lg:px-16`, vertical `py-16`.
- Centered narrow column: `mx-auto max-w-4xl` for readability.
- Eyebrow: same class recipe as other sections (`text-xs tracking-widest uppercase` + site accent, e.g. `text-rose-laure`).
- Title: serif display scale used elsewhere (`font-serif text-3xl md:text-4xl text-ink`).
- Accordion: native `<details>` / `<summary>` (no client JS required).
  - Rows: `border-t border-line`, `last:border-b`.
  - Summary: `flex`, `cursor-pointer`, serif question line, muted body under the fold (`text-muted`).
  - Optional “+” affordance: rotate when open (`group` / `group-open:rotate-45`), accent color on the icon.
- Accessibility: `aria-labelledby` on `<section>` pointing at the `h2` id; meaningful summary text (the question).

Do not invent a new visual language; copy class tokens from an existing section component on the same site.

## 3. `FORGE_FAQ_ENABLED`

- Declare in `.env`, `.env.example`, and `src/env.d.ts` as `string | undefined`.
- Read **only** with `import.meta.env.FORGE_FAQ_ENABLED === 'true'`. Any other value (`false`, empty, unset) means Forge FAQ import is off.
- Document in README: `true` → try Forge at build; otherwise local only.

When off, `fetchFaqs` must return `null` so the UI never depends on the network.

## 4. Resolve displayed list (single expression)

In the Astro section (e.g. home resources):

```ts
const faqs = (await fetchFaqs(locale)) ?? localFaqs(locale);
```

`fetchFaqs` contract:

1. If `!isFaqEnabled()` → `null`.
2. `fetchForge('faqs', locale)` → if `null`, return `null`.
3. Parse list with `asList(payload)`; keep items with non-empty `question` and `answer` strings; sort by numeric `position` (default `0`).
4. If the resulting array length is **0** → `null` (trigger local fallback).
5. Otherwise return the array as-is (partial Forge list is correct).

Do not merge Forge and local items. Do not filter out “unused” local entries when Forge returns a subset.

## Editing workflows

| Goal | Action |
| --- | --- |
| Change FAQ text before Forge is used | Edit `Local.faqs` in `fr.json` / `en.json` |
| Stay 100% local | `FORGE_FAQ_ENABLED=false` (or omit / any non-`true` value) |
| Pilot one FAQ from CMS | Publish one FAQ in Forge; rebuild; site shows one accordion row |
| Forge unavailable in dev | Without token, behavior matches empty/failed fetch → local |

## Verification

After changes:

1. With flag off (or no token): home shows full `Local.faqs` count in FR and EN routes.
2. With flag on and empty Forge: same as (1).
3. With flag on and N published Forge rows: exactly N rows, ordered by `position`.
4. Section visually matches adjacent home blocks (spacing, fonts, borders).

## See also

- [reference.md](reference.md) — TypeScript and Astro templates
- Skill **forge-ressources** — Forge URL, token, `fetchForge`, list response shape
- Skill **language** — bilingual i18n rules