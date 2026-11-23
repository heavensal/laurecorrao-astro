# Website languages and localized architecture

Canonical language rule for Codex, Cursor, GitHub Copilot and Antigravity. Read this file before creating a website, adding a language, creating pages, editing visible content, or changing public URLs. Keep this rule in one place; tool-specific instructions must reference it rather than copy it.

## 1. Determine the published languages first

Identify the requested languages, the default language, and whether the site is new or already published. Use the user's request and existing project configuration; do not ask again for information already provided.

- "French only" means a monolingual website without i18n.
- "French and English, develop both languages" means both languages must be fully implemented.
- If languages are unspecified, ask which languages the site will publish.
- If multiple languages are requested and the primary language is unknown, ask which is primary. Do not infer it solely from their order in the prompt.
- Preserve existing public URLs unless a migration is explicitly requested. Adding a language must not silently rename existing URLs.

## 2. Keep one language configuration

For new sites, store publication settings in `src/site/publication.ts`:

```ts
// Monolingual
export const publication = {
  defaultLocale: 'fr',
  locales: ['fr'],
} as const;
```

```ts
// Multilingual
export const publication = {
  defaultLocale: 'fr',
  locales: ['fr', 'en'],
} as const;
```

`defaultLocale` must belong to `locales`. Derive multilingual mode from `locales.length > 1`; do not introduce a second independent `ENABLE_MULTILANG` flag. Routes, navigation, switching and SEO use the same configuration. Dictionary folders and remote content never enable a language implicitly.

## 3. Use English names for source files

Use English names for files, folders, components, identifiers, translation keys, comments and documentation. Locale codes such as `fr`, `en` and `pt-BR` are allowed as folder names.

Separate public URL slugs from source names. Use stable English page identifiers such as `home`, `about`, `services` and `contact`.

Example: `AboutPage.astro` renders `/a-propos/` in French and `/en/about/` in English. Do not create a French-named source file merely to obtain a French URL.

## 4. Monolingual websites: no i18n

When creating a site with one published language:

- Do not install or initialize an i18n library, create dictionaries or translation keys, or add a `t()` helper.
- Do not prepare an unused second language or a language switcher.
- Write visible content directly in the chosen language. Small page-specific copy may stay in `.astro`.
- Extract reusable editorial data into ordinary content files when useful; these are not translation dictionaries.
- Keep business facts such as prices, addresses and opening hours in their dedicated site data files.

```text
src/
  site/
    publication.ts
    pages.ts
  content/
    homepage.ts           # Optional structured editorial content
  views/
    home/HomePage.astro
    about/AboutPage.astro
  routing/
    paths.ts
  pages/
    index.astro
    [...slug].astro
```

Public slugs use the chosen language. The default language has no locale prefix: `/`, `/a-propos/`, `/prestations/`, `/contact/` for a French site.

## 5. Multilingual websites: dictionaries by locale and page

Implement every requested language. Reuse page components and layouts; pass the locale explicitly where needed. Resolve translations during Astro rendering/build, without shipping a client-side i18n runtime for static translated content.

Organize dictionaries by locale and page, not as one large file per language:

```text
src/
  site/
    publication.ts
    pages.ts
  i18n/
    index.ts
    locales/
      fr/
        common.json
        navigation.json
        homepage.json
        about.json
        services.json
        contact.json
        legal-notice.json
        privacy.json
        terms.json
      en/
        common.json
        navigation.json
        homepage.json
        about.json
        services.json
        contact.json
        legal-notice.json
        privacy.json
        terms.json
  components/
    site/LanguageSwitcher.astro
  views/
    home/HomePage.astro
    about/AboutPage.astro
  routing/
    paths.ts
    static-paths.ts
  pages/
    index.astro
    [...slug].astro
    [locale]/
      [...slug].astro
```

Create only dictionaries for actual pages or shared features. `homepage.json` owns homepage copy, `navigation.json` owns shared navigation labels, and `common.json` owns genuinely shared interface text. A shared feature may have its own namespace, such as `booking.json`.

Use meaningful English keys, not source sentences or numbered labels. Translate headings, paragraphs, links, buttons, form labels, errors, statuses, image alternatives, accessibility labels, page titles and meta descriptions.

Do not duplicate language-independent facts such as prices or addresses in dictionaries. Localize their presentation. Required keys must exist for every published locale; silent fallback must not mask incomplete translations.

## 6. Generate localized URLs from a central page registry

Keep stable page IDs and localized slugs in `src/site/pages.ts`. Build links through `src/routing/paths.ts`.

For new sites:

- Default language at the root; other languages under their locale prefix.
- Slugs in the language of the page, with consistent trailing slashes.
- No duplicate prefixed version of the default language.
- No automatic browser-language redirect.

| Page ID | French (default) | English |
| --- | --- | --- |
| home | `/` | `/en/` |
| about | `/a-propos/` | `/en/about/` |
| services | `/prestations/` | `/en/services/` |
| contact | `/contact/` | `/en/contact/` |

Preserve proper names and established technical segments when translation is inappropriate. Use lowercase, hyphen-separated slugs; avoid accents for French and English slugs.

Internal links preserve the current locale, respect Astro's base path, and point to generated pages. Do not scatter hardcoded translated paths through components.

Generate only configured locales and valid page/locale combinations. Unknown locale prefixes must not render fallback content. Reserve locale prefixes so they cannot collide with default-language page slugs.

## 7. Respect Forge's language configuration

Forge language settings are configured before site creation. Treat them as an existing prerequisite; do not recreate or modify them unless requested.

- Fetch content in the expected locale using the supported API contract.
- For multilingual sites, explicitly request each published locale.
- Keep Forge-managed articles, FAQs and reviews in Forge; do not copy them into dictionaries or automatically translate or rewrite them.
- Where the API provides locale information, verify it matches the requested locale.
- A request for `en` does not itself prove the response is English: the API may fall back to the default language.
- Report missing or wrong-language content and apply the feature's explicit missing-content policy. Do not publish it as a valid translation.
- Forge supplies article translations and their localized URLs through the API. Use those translation relationships rather than identical slugs; inspect the actual response to map field names. Apply [BLOG.md](BLOG.md) for the complete blog rule.

## 8. Provide an accessible language switcher

For multilingual sites, create `LanguageSwitcher.astro`:

- Use real links working without JavaScript.
- Display native language names, such as "Français" and "English"; flags must not be the only labels.
- Identify the current language accessibly.
- Link to the equivalent page, preserving page identity across translated slugs.
- Show only available translations.
- Omit an unavailable page translation rather than silently substituting a homepage. If a homepage fallback is explicitly requested, label it as navigation to that language's homepage.

Do not create a language switcher for monolingual sites.

## 9. Keep SEO consistent with the rendered language

Every published page has the correct HTML `lang`, localized title and description, self-referencing canonical URL, appropriate Open Graph locale, localized structured-data text/language, and canonical sitemap URL.

For multilingual pages:

- Generate reciprocal hreflang links only for existing translations, including the page itself.
- Use the default-language equivalent as `x-default` when it exists.
- Never canonicalize every translation to the default-language page.

For monolingual pages, do not announce nonexistent translations or an alternate Open Graph locale. A multilingual hreflang set is unnecessary.

## 10. Validate the result

Verify the following when implementing language changes:

- Published languages match the request and configuration.
- Required local content and keys are present, with no visible keys or unintended language fallback.
- Slugs and routes are unique; internal links preserve locale.
- The switcher reaches the equivalent page and excludes unavailable translations.
- Canonicals, hreflang and sitemap agree with generated routes.
- Forge content matches the expected language.
- Dates, numbers and currencies use the selected locale.
- Mobile and desktop layouts tolerate longer translations.
- A newly created monolingual site has no unnecessary i18n dependency, dictionary, helper or switcher.
- Existing-site migrations preserve URLs and implement explicitly approved redirects.

Report the checks performed and anything unverified.

## Existing repository: migration boundary

This rule defines the target architecture for new sites and explicitly requested migrations. Recording it does not authorize a runtime refactor.

Laure Corrao currently publishes French only but retains the previous i18next implementation, flat `fr.json`/`en.json` dictionaries, `ENABLE_MULTILANG` and `siteConfig.publishedLocales`. Until a migration is requested, use the existing helpers and paths for scoped edits; do not create a parallel publication configuration or remove i18n as a side effect.

The previous requirement to prepare English on every monolingual site is superseded. Do not require updates to unpublished English copy unless requested. Before enabling English on this existing site, audit its content completeness and keep both existing publication settings consistent. The target `src/site/`, `src/routing/`, `src/views/` and per-page dictionary paths above are not yet implemented here.
