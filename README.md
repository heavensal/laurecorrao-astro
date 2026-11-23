# Laure Corrao — Brochure site

Brochure site for Laure Corrao, psychotherapist and couples therapist in Port-de-Bouc. Built with Astro 7 and Tailwind 4, with full SEO (sitemap, Open Graph, local JSON-LD) and GitHub Pages deployment.

**Requirements:** Node.js ≥ 22 (see `package.json` → `engines`).

The current implementation keeps visible copy in `src/i18n/locales/fr.json` and `en.json`. `ENABLE_MULTILANG` defaults to `false`: the site publishes French only, and English copy stays in `en.json` without a `/en/` URL. See [Languages and hreflang](#languages-and-hreflang), [Multilang: how and why](#multilang-how-and-why), and `MULTILANG.md`.

---

## SEO, GEO et accessibilité : construire, auditer, corriger

[SEO_GEO_ACCESSIBILITY.md](SEO_GEO_ACCESSIBILITY.md) est le point d'entrée commun vers les règles détaillées. Elles s'appliquent pendant le développement via AGENTS.md.

- Audit : skill `seo-geo-accessibility-audit`, agent `seo-geo-accessibility-auditor`, actualisation des deux checklists de todo.md.
- Correction : skill `seo-geo-accessibility-fix`, agent `seo-geo-accessibility-fixer`, exécution des tâches autorisées et validation avant clôture.
- [Commandes et prompts en français](fast_commands.md).
- [Checklist de création et livraison](tasks.md), incluant domaine, GitHub Pages, Forge et services externes.

Les profils Codex, Cursor et Copilot renvoient aux skills partagés dans `.agents/skills`. Antigravity peut utiliser ces workflows directement. Les reviewers spécialisés existants restent disponibles pour des audits ciblés sans modification. Les profils n'ont pas été testés dans tous les clients ; utiliser les prompts explicites si la commande n'est pas reconnue.

Ces instructions ne constituent pas un audit déjà réalisé et ne changent pas le comportement du site.

## Table of contents

- [Features](#features)
- [Quick start](#quick-start)
- [Before publication](#before-publication)
- [Project structure](#project-structure)
- [Forge content](#forge-content)
- [Languages and hreflang](#languages-and-hreflang)
- [Multilang: how and why](#multilang-how-and-why)
- [Configuration](#configuration)
- [Components](#components)
- [SEO configuration](#seo-configuration)
- [Geographic SEO](#geographic-seo)
- [Booking](#booking)
- [Style conventions](#style-conventions)
- [Deployment](#deployment)
- [Commands](#commands)

---

## Features

- **SEO**: Open Graph, Twitter Cards, canonical URLs, hreflang (`fr` and `x-default` only), JSON-LD, sitemap, generated `robots.txt`
- **Local SEO**: `ProfessionalService` for Port-de-Bouc with the practice address and service area. See [Geographic SEO](#geographic-seo)
- **i18n**: French is published. `ENABLE_MULTILANG=false` generates no `/en/` URL. English copy still lives in `en.json`. See [Languages and hreflang](#languages-and-hreflang)
- **FAQ, reviews, blog**: each has its own Forge flag (`true` / `false`). On this site, article and FAQ imports are on; FAQ content falls back to local copy. Review imports are off. Details in [Forge content](#forge-content)
- **Contact form**: dialog in the footer, `POST` to Forge (`PUBLIC_CONTACT_FORM_URL` + **`PUBLIC_CONTACT_FORM_TOKEN`**, `Authorization: Bearer` header)
- **Landing sections**: hero, services, about, approach, place, articles, FAQ, contact, booking
- **Legal pages**: legal notice, privacy policy, terms of service
- **Accessibility**: semantic HTML, ARIA labels, visible focus
- **Animations**: transitions, with `prefers-reduced-motion`

---

## Quick start

### Install

```sh
git clone https://github.com/heavensal/laurecorrao-astro.git
cd laurecorrao-astro
pnpm install
pnpm dev
```

### Initial setup

After cloning, copy **`.env.example`** to **`.env`**, then adjust if needed (`ENABLE_MULTILANG`, `FORGE_*`, **`PUBLIC_CONTACT_FORM_URL`**, **`PUBLIC_CONTACT_FORM_TOKEN`**). In particular, update:

1. **`astro.config.mjs`** — set `site` and `base` for the deployment URL
2. **`src/site.config.ts`** — site identity, contact, geography, opening hours, `sameAs` profiles
3. **`src/i18n/locales/fr.json`** and **`en.json`** — existing copy files (home, sections, legal pages). Update published languages; unpublished English copy is not mandatory. See `MULTILANG.md` before creating a new site or migrating this structure.

---

## Before publication

- Complete the outstanding legal details in [todo.md](todo.md).
- Set `FORGE_API_TOKEN` in `.env` to the Forge token for `laurecorrao.fr`. Without it, `/blog` is not generated. The same token goes in `PUBLIC_CONTACT_FORM_TOKEN` for the contact form (it is exposed to the browser).
- Configure the Cal.com event referenced in `src/components/CalEmbed.astro` as a free 10-minute introductory conversation without payment. Update the embed path if the event URL changes.
- Laure schedules consultations herself after the introductory conversation and emails the quote, terms and payment link. Clients can pay online before the session or on arrival at the practice.
- Check a booking end to end on Laure’s account, including payment, email, and cancellation.
- Deploy only after the provisional details are replaced. The canonical domain is `https://laurecorrao.fr`.

---

## Project structure

```text
/
├── public/
│   ├── favicons/             # ICO, PNG, apple-touch, PWA maskable
│   ├── site.webmanifest
│   └── images/
├── src/
│   ├── components/           # Landing sections, header, footer, legal articles
│   ├── lib/
│   │   ├── jsonld.ts         # SEO + local business JSON-LD
│   │   ├── paths.ts          # Slugs and public URLs
│   │   ├── seo.ts            # Canonical, hreflang, Open Graph locale
│   │   └── forge.ts
│   ├── layouts/
│   │   └── Layout.astro      # SEO: meta tags, Open Graph, hreflang
│   ├── i18n/
│   │   ├── i18n.ts
│   │   └── locales/          # fr.json, en.json
│   ├── pages/
│   │   ├── index.astro       # French home
│   │   ├── [...slug].astro   # French content and legal URLs
│   │   ├── robots.txt.ts
│   │   └── en/
│   │       └── [...slug].astro  # /en/ only when ENABLE_MULTILANG=true
│   └── styles/
│       └── global.css        # Tailwind + Laure theme
├── astro.config.mjs          # SEO: site URL and base path
└── MULTILANG.md              # URL rule for one language and for several
```

Blog pages (generated only when `FORGE_ARTICLES_ENABLED=true` and the locale is in `publishedLocales`): `src/pages/blog/[...slug].astro` and `src/pages/en/blog/[...slug].astro`. `/en/blog` also requires `ENABLE_MULTILANG=true`. This site publishes French only (`ENABLE_MULTILANG=false`, `publishedLocales` = `['fr']`), so there is no `/en/` URL. `/blog` is generated when the Forge token can read published articles.

---

## Forge content

The shared reviews rule is [REVIEWS.md](REVIEWS.md): optional section, Forge imports enabled by default when requested, and per-language replacement of authentic local fallback content. Fictional examples are preview-only. The existing review helpers and locale entries do not themselves implement a visible reviews section.

The shared FAQ rule is [FAQ.md](FAQ.md): optional section, contextual local questions/answers, Forge imports enabled by default when requested, and complete per-language replacement when Forge returns published FAQs. This documentation update does not change the running site.

The shared blog rule is [BLOG.md](BLOG.md). It defines optional blog creation, Forge-provided translations and URLs, same-article language switching, and publication checks. The current implementation described below has not yet been migrated to that rule.

Forge is the CMS (a separate repository). This site only displays content. Three blocks can be connected, **independently**:

| Variable | `true` | `false`, or unreachable API |
| --- | --- | --- |
| `FORGE_FAQ_ENABLED` | `GET /faqs` | `Faq` strings in `fr.json` / `en.json` |
| `FORGE_REVIEWS_ENABLED` | `GET /reviews` (model rating 1–5) | review strings in the locale files |
| `FORGE_ARTICLES_ENABLED` | `GET /articles` and `GET /articles/:slug` → `/blog` and `/blog/[slug]`. `/en/blog` only if `ENABLE_MULTILANG=true` and `en` is in `publishedLocales` | those pages are not generated |

**Configured build:** `FORGE_ARTICLES_ENABLED=true`, `FORGE_FAQ_ENABLED=true`, and `FORGE_REVIEWS_ENABLED=false`. FAQs use Forge when it returns usable content and otherwise use the local copy. `/blog` is generated when `FORGE_API_TOKEN` can read the published articles.

`FORGE_URL` and `FORGE_API_TOKEN` are shared. Reads happen **at build time**. In production, the same names are GitHub Actions secrets (`deploy.yml`). Hero, services, approach, fees, legal pages, and booking stay in this repository.

## Languages and hreflang

Read [MULTILANG.md](MULTILANG.md) for the canonical rule shared by Codex, Cursor, GitHub Copilot and Antigravity. New monolingual sites have no i18n; multilingual sites use dictionaries by locale and page. The rule has been recorded, but this site's runtime has not been migrated.

### Current implementation

Laure Corrao publishes French at the root. `src/site.config.ts` has `publishedLocales: ['fr']`, and the deployment sets `ENABLE_MULTILANG=false`. Existing flat FR/EN dictionaries and i18next remain in place.

- `src/pages/en/[...slug].astro` generates English pages only when `ENABLE_MULTILANG=true`.
- The language switcher follows that flag and currently links to each language's homepage.
- SEO announces English only when the flag is true and `'en'` is in `publishedLocales`; the English blog requires both settings too.
- The current blog associates translations by matching slugs in the remote indexes. This does not establish that the API returned the requested language or that every detail page was generated successfully.
- French content and legal slugs live in `src/lib/paths.ts`; English equivalents use `/en/`.
- Old root-level English legal slugs have redirects configured in `astro.config.mjs`. Static HTML deployment uses meta refresh; a configured 301 is not proof of an HTTP 301 response.

## Multilang: how and why

For new sites, follow the architecture and validation criteria in [MULTILANG.md](MULTILANG.md), including a single publication configuration and same-page language switching.

For ordinary edits to this existing site, retain its current helpers and files. Do not remove i18n or introduce the proposed `src/site/publication.ts` alongside the current settings without an explicit migration request.

Unpublished English copy no longer has to mirror every French edit. Before English is published, audit all required translations, the API's locale behavior, routes and SEO. If enabling English within the existing implementation, update both `publishedLocales` and the deployment's `ENABLE_MULTILANG` setting together; the local `.env` alone does not change production.

## Configuration

### Astro configuration (`astro.config.mjs`)

Update `site` and `base` for deployment:

```javascript
// SEO: Custom domain
const site = 'https://laurecorrao.fr';
const base = '/';

// OR for GitHub Pages without a custom domain:
// const site = 'https://heavensal.github.io';
// const base = '/laurecorrao-astro';
```

### SEO configuration (`src/layouts/Layout.astro`)

Default title and description come from the locale file. The layout appends the site name:

```typescript
const pageTitle = `${title ?? t('Home.metaTitle')} | ${siteConfig.name}`;
const pageDescription = description ?? t('Home.metaDescription');
```

---

## Components

### Component architecture

Landing sections are standalone Astro components. Each one is a single subject. Visible sentences come from `getFixedT(locale)`, not from the markup.

```astro
---
import { getFixedT, type Locale } from '../i18n/i18n';

interface Props {
	locale: Locale;
}

const { locale } = Astro.props;
const t = getFixedT(locale);
---

<section class="px-6 py-16" aria-label={t('HomePage.servicesAria')}>
</section>
```

### Component list

| Component | Description |
|-----------|-------------|
| `SiteHeader.astro` | Brand, navigation, booking CTA, language switcher |
| `HomePage.astro` | Hero, services, about, approach, place |
| `HomeResources.astro` | Articles, FAQ and booking CTA |
| `BookingCTA.astro` | Booking call to action |
| `ContactForm.astro` | Contact dialog |
| `FeesPage.astro` | Fees and the calendar |
| `SiteFooter.astro` | Footer with legal links |

### Create a new component

1. Create `src/components/NewSection.astro`
2. Import it from the page that should show it (`HomePage.astro`, or `PageBody.astro` for a routed page)
3. Update copy for published languages using the current implementation; follow `MULTILANG.md` for new sites or requested language migrations

---

## SEO configuration

The following files and elements need an update for SEO:

### 1. Site URL (`astro.config.mjs`)

```javascript
// SEO: Update the production domain
const site = 'https://laurecorrao.fr';
const base = '/';
```

### 2. Meta tags (`src/layouts/Layout.astro`)

The layout sets these automatically:

- Title and description
- Canonical URL
- hreflang for published locales, plus `x-default`
- Open Graph (type, title, description, url, locale, site_name, image). Blog articles pass `ogType="article"` and `publishedTime`
- Twitter Cards
- JSON-LD when the page passes `jsonLd`

`og:locale:alternate` is rendered only when both French and English are published. A page with `robots="noindex"` (the 404) has no canonical URL.

### 3. Images

Site images live in `src/assets/images/` and go through `astro:assets` (`<Image>` with `widths` and `sizes`), which emits resized WebP files at build time. Forge article images are left as they are.

- `assets/images/home/reference-laure.jpeg` — home portrait and default OG image
- `assets/images/brand/laure_corrao_icon.png` — square brand mark (header, footer)

### 4. Static files (`public/`)

- `site.webmanifest` — PWA manifest (icons in `favicons/`)
- `favicons/` — `favicon.ico`, PNG, `apple-touch-icon`, Android chrome and maskable
- `images/laure_corrao_icon-512.png` — logo referenced by the JSON-LD (needs a stable URL)

### 5. Sitemap, robots, and llms.txt

`@astrojs/sitemap` writes `sitemap-index.xml` from the pages generated at build time, including `/blog` when articles were fetched. The 404 page is excluded. Each URL has a `lastmod`: the Forge publication date for articles, the latest article for `/blog/`, and the last commit touching `src/` or `public/` for the other pages (the deploy workflow checks out the full history for this).

`src/pages/robots.txt.ts` points at that sitemap. `src/pages/llms.txt.ts` writes `/llms.txt`, a plain-text summary for AI assistants built from the same data as the pages (services, fees, FAQ, articles). Its headings come from `Seo.llms` in the locale files.

---

## Geographic SEO

The practice address, coordinates, phone number, and opening hours are in `src/site.config.ts`. `openingHours` mirrors `Footer.hoursSchedule` in the locale files: keep both in sync.

The practice is in Port-de-Bouc. In-person sessions cover the Bouches-du-Rhône and video sessions cover France (`serviceArea`). This area appears in the JSON-LD (`areaServed`) and `llms.txt`, not in the visible copy.

The home page JSON-LD describes the practice (`ProfessionalService` with hours, coordinates, price range, and the service catalog), Laure Corrao (`Person`), the website, and the home FAQ (`FAQPage`). The FAQ follows the same rule as the visible section: Forge FAQs when Forge returns some, the local FAQ otherwise. Service names in the JSON-LD come from `Seo.services`.

## Booking

Booking buttons are links to the fees page agenda (`bookingHref`), so they work without JavaScript. With JavaScript, they open the booking dialog instead. Cal.com is never fetched on page load: the dialog calendar mounts on the first scroll, touch, or key press (or when the dialog opens), and the fees page calendar mounts when it nears the viewport. The home page map loads only after a click on "Afficher la carte".

## Style conventions

### Tailwind CSS — strict rules

This project uses **Tailwind CSS 4** with strict conventions.

#### Do: use native Tailwind classes

```astro
<div class="flex items-center justify-between gap-4 px-6 py-4">
  <h2 class="font-serif text-3xl text-ink md:text-4xl">Title</h2>
  <a class="rounded-md bg-rose-soft px-6 py-3 text-white hover:bg-rose-deep">
    Book
  </a>
</div>
```

#### Do not: use arbitrary values

```astro
<!-- FORBIDDEN: arbitrary values with brackets -->
<div class="w-[347px] mt-[23px] text-[#1a2b3c]">
```

#### Do not: use inline styles

```astro
<!-- FORBIDDEN: inline styles -->
<div style="margin-top: 23px; color: #1a2b3c;">
```

Brand colors live in `global.css` via `@theme`, then as normal utilities (`bg-rose-laure`, `text-ink`, `bg-sand`). That is the palette. It is not a second token system in the markup.

`global.css` also keeps a few rules that have no utility: the native `dialog` backdrop, the focus ring, the disclosure marker, and images inside HTML returned by Forge.

### Animations

#### 1. First: native Tailwind animations

```astro
<div class="animate-pulse">Loading...</div>
```

#### 2. Next: Tailwind transitions

```astro
<a class="transition-colors duration-200 hover:bg-rose-deep">
  Hover me
</a>
```

#### 3. If needed: keyframes in `global.css`

Follow the existing pattern and include `prefers-reduced-motion`. New keyframes are a last resort.

### Color palette

Defined in `global.css` via `@theme`:

- **Rose**: `rose-laure` (`#a35753`) — eyebrows, links, focus
- **Rose soft**: `rose-soft` (`#ad605a`) — primary buttons
- **Rose deep**: `rose-deep` (`#914b46`) — button hover
- **Blush**: `blush` (`#b77d76`) — small rules and symbols
- **Ink**: `ink` (`#36332f`) — text
- **Muted**: `muted` (`#6c6059`) — secondary text
- **Cream**: `cream` (`#fcfaf6`) — page background
- **Sand**: `sand` (`#f6efe8`) — tinted sections
- **Paper**: `paper` (`#faf6f0`) — header and hero
- **Line**: `line` (`#e9ddd3`) — borders

Headings use `font-serif`. Body copy uses `font-sans`.

---

## Deployment

### GitHub Pages

The `.github/workflows/deploy.yml` workflow builds and deploys on push to `main`.

1. **Repository** → **Settings** → **Pages**: source **GitHub Actions**
2. Set `site` and `base` in `astro.config.mjs`
3. **Settings** → **Secrets and variables** → **Actions**: add **`PUBLIC_CONTACT_FORM_URL`**, **`PUBLIC_CONTACT_FORM_TOKEN`**, **`FORGE_URL`**, **`FORGE_API_TOKEN`**, and the three `FORGE_*_ENABLED` flags (`true` or `false`). The workflow injects them at `pnpm run build`. `ENABLE_MULTILANG` is `false`.

The contact form needs **`PUBLIC_CONTACT_FORM_URL`** (for example `https://forge.1344.fr/api/v1/send_form`) and **`PUBLIC_CONTACT_FORM_TOKEN`** in `.env` (GitHub Actions secrets for deployment). Forge must allow the site in **CORS**.

### Custom domain

To use a custom domain:

1. Configure the domain in the GitHub Pages settings
2. Update `astro.config.mjs`:
   ```javascript
   const site = 'https://laurecorrao.fr';
   const base = '/';
   ```

---

## Commands

| Command | Action |
|----------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview the build |
| `pnpm astro add [integration]` | Add an Astro integration |

---

## Documentation

- [Astro documentation](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/)
