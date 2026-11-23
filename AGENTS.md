## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Website languages

Before creating a site or changing pages, copy, languages, URLs or language SEO, read and apply [MULTILANG.md](MULTILANG.md), the single source of truth for Codex, Cursor, GitHub Copilot and Antigravity.

- New monolingual sites have no i18n library, translation keys, unused language or language switcher.
- Multilingual sites use dictionaries by locale and page, shared components, localized URLs and an accessible language switcher.
- Source names stay English; public slugs follow the page language. Forge languages are configured before site creation.
- Preserve the current site's implementation until a migration is explicitly requested; the new rule alone does not authorize removing its existing i18n.

## Blog

Before creating or changing a blog, article routes, Forge article imports or article language switching, read and apply [BLOG.md](BLOG.md), together with [MULTILANG.md](MULTILANG.md).

- Determine whether a blog is requested; a new site without one has no blog routes or article fetches.
- Forge supplies translations and their localized URLs. Use its translation relationships for same-article switching and hreflang; never infer them from matching slugs.
- Import articles at build time only when `FORGE_ARTICLES_ENABLED` is `true`.
- Recording the rule does not migrate the current site's routes or production failure policy.

## FAQ

Before creating or changing a FAQ, its local content or Forge imports, read and apply [FAQ.md](FAQ.md), together with [MULTILANG.md](MULTILANG.md).

- Build a FAQ only when requested. Its placeholder is a complete, contextual set of local questions and answers, not an empty-state message.
- Enable Forge FAQ imports by default for requested FAQs; reuse the existing Forge connection.
- Resolve each published language independently: zero Forge FAQs uses the full local list; one or more replaces it entirely without merging.
- Use the same rendering and selected data for local/Forge FAQs and any structured data.

## Reviews

Before creating or changing reviews, local testimonials or Forge review imports, read and apply [REVIEWS.md](REVIEWS.md), together with [MULTILANG.md](MULTILANG.md).

- Build reviews only when requested; enable Forge imports by default and reuse its existing connection.
- Resolve each published language independently: zero remote reviews uses authentic local reviews; a non-empty remote list replaces them entirely without merging.
- Never invent production testimonials or ratings. Fictional contextual examples belong only in clearly labelled development previews and must be excluded from production.
- Use the same renderer for both sources. Recording the rule does not enable or implement reviews on this existing site.

## SEO, accessibility and GEO

- Before changing indexable pages, metadata, canonical URLs, sitemaps or structured data, read [SEO.md](SEO.md). Use `.agents/skills/technical-seo/SKILL.md` for implementation or audit.
- Before changing UI, navigation, forms or interactions, read [ACCESSIBILITY.md](ACCESSIBILITY.md). Use `.agents/skills/accessibility/SKILL.md`; target WCAG 2.2 AA without claiming unverified conformity.
- For AI search visibility, citations, llms.txt or AI crawler policies, read [GEO.md](GEO.md) and `.agents/skills/geo/SKILL.md`. Separate search and training policies; never promise citations.
- Audit roles: `seo-reviewer`, `accessibility-reviewer`, `geo-reviewer`. Their adapters point to shared skill audit modes. Invoke for requested reviews, not automatically for every edit. Preserve the user's scope and current runtime unless changes are requested.

## Integrated SEO / GEO / accessibility workflow

Before building or changing a page or UI, apply [SEO_GEO_ACCESSIBILITY.md](SEO_GEO_ACCESSIBILITY.md) and its relevant domain rules. Semantic HTML and heading hierarchy, accessibility and applicable SEO/GEO requirements are part of implementation, not deferred to an audit.

- `/seo-geo-accessibility-audit`: use `.agents/skills/seo-geo-accessibility-audit/SKILL.md`; the `seo-geo-accessibility-auditor` may update the designated todo.md checklists but not website source code.
- `/seo-geo-accessibility-fix`: use `.agents/skills/seo-geo-accessibility-fix/SKILL.md`; the `seo-geo-accessibility-fixer` implements authorized repository tasks and checks boxes only with validation evidence.
- If a client passes these slash strings as plain text, treat them as workflow aliases; do not claim native command registration. Use the skill in the current session when a named agent is unavailable.
- [fast_commands.md](fast_commands.md) documents invocation. [tasks.md](tasks.md) is the delivery checklist; [todo.md](todo.md) contains site-specific findings. Preserve existing tasks, confirmations and history; never infer external completion from local edits.

## Build command catalog

When the user sends `/build` alone, read `.agents/skills/build/SKILL.md` and show the command catalog without executing work. `/build-<skill>` aliases read `.agents/skills/build-<skill>/SKILL.md`, which delegates to the original skill. Preserve the original workflow boundaries; the prefix does not mean to compile the site. See fast_commands.md. Keep existing non-prefixed skills available for compatibility.

## Missing client information

When requested content requires client information that is unavailable, first check existing confirmed facts and tasks. Never invent it. Use an explicit placeholder during preparation where appropriate and add or update a task in `todo.md` with the missing information and exact page/component/file locations. Do not create a second `todos.md`. Avoid duplicate requests for already confirmed facts. Replace all affected placeholders after confirmation and check the task only after integration is verified. Do not expose placeholders as real contact details, working links, metadata or structured data, or publish them; hide optional missing information and keep required missing information as an explicit publication blocker.
