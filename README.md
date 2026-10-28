# Laure Corrao — Brochure site

Brochure site for Laure Corrao, psychopractitioner and couples therapist in Martigues. Built with Astro 7 and Tailwind 4, with full SEO (sitemap, Open Graph, local JSON-LD) and GitHub Pages deployment.

**Requirements:** Node.js ≥ 22 (see `package.json` → `engines`).

Visible copy is in `src/i18n/locales/fr.json` and `en.json`. `ENABLE_MULTILANG` defaults to `false`: the site publishes French only, and English copy stays in `en.json` without a `/en/` URL. See [Languages and hreflang](#languages-and-hreflang), [Multilang: how and why](#multilang-how-and-why), and `MULTILANG.md`.

---

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
- [Style conventions](#style-conventions)
- [Deployment](#deployment)
- [Commands](#commands)

---

## Features

- **SEO**: Open Graph, Twitter Cards, canonical URLs, hreflang (`fr` and `x-default` only), JSON-LD, sitemap, generated `robots.txt`
- **Local SEO**: city-level `ProfessionalService` for Martigues (`areaServed`, `PostalAddress` without a street, `GeoCoordinates`). See [Geographic SEO](#geographic-seo)
- **i18n**: French is published. `ENABLE_MULTILANG=false` generates no `/en/` URL. English copy still lives in `en.json`. See [Languages and hreflang](#languages-and-hreflang)
- **FAQ, reviews, blog**: each has its own Forge flag (`true` / `false`). On this site, articles are on. FAQ and reviews stay in i18n. Details in [Forge content](#forge-content)
- **Contact form**: dialog in the footer, `POST` to Forge (`PUBLIC_CONTACT_FORM_URL` + **`PUBLIC_CONTACT_FORM_TOKEN`**, `Authorization: Bearer` header)
- **Landing sections**: hero, services, about, approach, place, reviews, articles, FAQ, contact, booking
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
2. **`src/site.config.ts`** — site identity, contact, geography, OG image
3. **`src/i18n/locales/fr.json`** and **`en.json`** — copy (home, sections, legal pages). Every new or changed French key is written in `en.json` in the same change

---

## Before publication

- Add the practice address, access notes, phone, email, status, and SIRET. Do not invent them. The host is GitHub, Inc. The technical provider is #1344 Solutions (`https://1344.fr`).
- Set `FORGE_API_TOKEN` in `.env` to the Forge token for `laurecorrao.fr`. Without it, `/blog` is not generated. The same token goes in `PUBLIC_CONTACT_FORM_TOKEN` for the contact form (it is exposed to the browser).
- The test calendar `adam-1344-vm70qf/30min` in `src/components/CalEmbed.astro` stays until Laure’s calendar replaces it. The public Cal.com embed uses no secret.
- In Cal.com, configure the individual event (€60, 60 min) and the couples event (€80, 60 min), practice or video, availability, name, email, phone, cancellation policy, confirmations, reminders, and reschedule or cancel links.
- Configure secure payment and the video link in Cal.com. This site does not collect patient data itself.
- Check a booking end to end on Laure’s account, including payment, email, and cancellation.
- Deploy only after the provisional details are replaced. The canonical domain is `https://laurecorrao.fr`.

---

## Project structure

```text
/
├── public/
│   ├── favicon.svg
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

Forge is the CMS (a separate repository). This site only displays content. Three blocks can be connected, **independently**:

| Variable | `true` | `false`, or unreachable API |
| --- | --- | --- |
| `FORGE_FAQ_ENABLED` | `GET /faqs` | `Faq` strings in `fr.json` / `en.json` |
| `FORGE_REVIEWS_ENABLED` | `GET /reviews` (model rating 1–5) | review strings in the locale files |
| `FORGE_ARTICLES_ENABLED` | `GET /articles` and `GET /articles/:slug` → `/blog` and `/blog/[slug]`. `/en/blog` only if `ENABLE_MULTILANG=true` and `en` is in `publishedLocales` | those pages are not generated |

**This site:** `FORGE_ARTICLES_ENABLED=true`. `FORGE_FAQ_ENABLED` and `FORGE_REVIEWS_ENABLED` stay `false`. FAQ and reviews come from `fr.json`. `/blog` is generated when `FORGE_API_TOKEN` can read the published articles.

`FORGE_URL` and `FORGE_API_TOKEN` are shared. Reads happen **at build time**. In production, the same names are GitHub Actions secrets (`deploy.yml`). Hero, services, approach, fees, legal pages, and booking stay in this repository.

## Languages and hreflang

The rule for one language and for several languages is **`MULTILANG.md`**. Codex, Claude, Cursor, and GitHub Copilot follow that file.

Laure Corrao publishes French only. The repository can also publish French and English. The code is the same. What changes is what the site publishes.

`src/site.config.ts` sets `publishedLocales` to `['fr']`. hreflang may list only those languages. On every page the head contains:

- `hreflang="fr"` → the French URL for that page
- `hreflang="x-default"` → the same French URL

There is no `hreflang="en"`. `og:locale:alternate` is omitted. JSON-LD `inLanguage` is `fr-FR` only.

`ENABLE_MULTILANG=false` (this site) generates no `/en/` URL and hides the language switcher. hreflang stays `fr` and `x-default`. Legal URLs use the French slug: `/mentions-legales`, `/politique-de-confidentialite`, `/conditions-generales`. The English slugs at the root (`/legal-notice`, `/privacy-policy`, `/terms-of-service`) redirect to those French URLs.

`ENABLE_MULTILANG=true` generates `/en/` (home, content, and legal pages) and shows the switcher. English legal URLs keep the English slug: `/en/legal-notice`, `/en/privacy-policy`, `/en/terms-of-service`. hreflang lists `en` only when `'en'` is also in `publishedLocales`. `/en/blog` exists only when articles are enabled and English is published.

A blog article that exists in only one published locale does not advertise the missing translation: `/blog/mon-article` does not point at `/en/blog/mon-article` when that slug was not returned for English.

Code, file names, and markdown stay in English. A public slug is an address, stored in `src/lib/paths.ts`: lowercase, hyphens, no accent, no capital letter. French pages keep French slugs. English pages keep English slugs under `/en/`. Route files stay `[...slug].astro`. Do not add `src/pages/mentions-legales.astro`.

## Multilang: how and why

One Astro project publishes either French alone or French and English. Laure Corrao publishes French. Turning English on later changes two switches. `MULTILANG.md` remains the URL rule.

### Why the English file and the English URLs are separate

`en.json` holds the English sentences. `ENABLE_MULTILANG` decides whether `/en/` pages are built. A French-only site still needs the sentences, so the day the flag becomes `true` the pages already have copy.

`getFixedT` falls back to French (`fallbackLng: 'fr'` in `src/i18n/i18n.ts`). A key that exists only in `fr.json` would show French on an English URL. Every new or changed French key is therefore written in `en.json` in the same change, including when `ENABLE_MULTILANG=false`. An empty English string is allowed only when the French string is empty.

The public site stays French until the build is asked for English. `getStaticPaths()` in `src/pages/en/[...slug].astro` returns an empty list unless `ENABLE_MULTILANG` is the string `true`. The route file stays in the repository, and no `/en/` HTML is emitted. hreflang goes through a second check, `isPublishedLocale()` in `src/lib/seo.ts`: English is announced only when `'en'` is also in `publishedLocales`. One switch alone does not publish English. On this site the head stays `fr` and `x-default`, both pointing at the French URL.

### How a page is chosen

Visible strings go through `getFixedT(locale)`. Section components take `locale`. The French home is `src/pages/index.astro` with `locale` set to `'fr'`. The English home, content pages, and English legal pages are one catch-all, `src/pages/en/[...slug].astro`, which renders the same components with `locale` set to `'en'`.

French lives at the root. There is no `/fr/` prefix. English, when it is published, lives under `/en/`. The slug follows the language of the page: `/politique-de-confidentialite/` in French, `/en/privacy-policy/` in English. Links use `legalPath()` and `contentPath()` in `src/lib/paths.ts`, which add `en/` only when the flag is on. The header can always import `LanguageSwitcher.astro`; the component renders nothing while the flag is off.

`/legal-notice`, `/privacy-policy`, and `/terms-of-service` at the root redirect 301 to the French slugs (`astro.config.mjs`). Those redirects stay after English is turned on, because English occupies `/en/`, and the root keeps the French address.

`.env` is gitignored. GitHub Pages runs `pnpm run build` from `.github/workflows/deploy.yml`. A bilingual site adds `ENABLE_MULTILANG` to that step’s environment (it is already set to `false` here) and adds `'en'` to `publishedLocales`. The local file alone does not change the production build.

### What changes when English is published

| Job | French only (this site) | French and English |
|---|---|---|
| Basic i18n | `getFixedT`, `locale` on each section, both JSON files | same |
| English sentences | `en.json` filled, no `/en/` URL | `en.json` filled |
| Publish `/en/` | `publishedLocales: ['fr']`, `ENABLE_MULTILANG=false` | `publishedLocales: ['fr', 'en']`, `ENABLE_MULTILANG=true` |

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
| `HomeResources.astro` | Reviews, articles, FAQ, contact strip |
| `BookingCTA.astro` | Booking call to action |
| `ContactForm.astro` | Contact dialog |
| `FeesPage.astro` | Fees and the calendar |
| `SiteFooter.astro` | Footer with legal links |

### Create a new component

1. Create `src/components/NewSection.astro`
2. Import it from the page that should show it (`HomePage.astro`, or `PageBody.astro` for a routed page)
3. Add the French keys and the same English keys in the same change

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
- Open Graph (type, title, description, url, locale, site_name, image)
- Twitter Cards
- JSON-LD when the page passes `jsonLd`

`og:locale:alternate` is rendered only when both French and English are published.

### 3. Static files (`public/`)

- `site.webmanifest` — PWA manifest
- `images/reference-laure.jpeg` — default OG image
- `favicon.svg` — favicon

### 4. Sitemap and robots

`@astrojs/sitemap` writes `sitemap-index.xml` from the pages generated at build time, including `/blog` when articles were fetched. `src/pages/robots.txt.ts` points at that sitemap. The 404 page is excluded.

---

## Geographic SEO

The practice is in Martigues. The street address, phone, email, and SIRET are not known yet. Do not invent them.

`src/site.config.ts` → `geo` holds public facts about the **commune**, not the practice door:

- Locality: Martigues
- Region: Bouches-du-Rhône
- Postal code: `13500` (the commune, not a street)
- Coordinates: 43.4053° N, 5.0475° E (Wikipedia, the commune of Martigues)

`src/lib/jsonld.ts` publishes that place on the home page and on the legal notice:

- `@type`: `ProfessionalService` and `LocalBusiness`
- `address`: `PostalAddress` with locality, region, postal code, and country. No `streetAddress`
- `geo`: `GeoCoordinates` for the commune
- `areaServed`: Martigues, the city named in the copy
- `email` and `telephone` are omitted while `siteConfig.contact` is empty

When the real street address, phone, or email is known, add it to `siteConfig` and the same JSON-LD will include it. Do not put the city-hall address in its place.

JSON-LD `inLanguage` follows `publishedLocales`. A French-only build says `fr-FR` only.

---

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

- **Rose**: `rose-laure` (`#a55955`) — eyebrows, links, focus
- **Rose soft**: `rose-soft` (`#ae625c`) — primary buttons
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
