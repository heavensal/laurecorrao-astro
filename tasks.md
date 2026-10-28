# Launch tasks

Checklist to finish SEO and local presence, then hand Laure Corrao a site she can run. Do not invent the street address, phone, email, SIRET, or legal status. Leave a field empty until she provides it.

The repository already has the French pages, canonical URLs, Open Graph, Twitter cards, `sitemap-index.xml`, `robots.txt`, hreflang `fr` and `x-default`, and city-level JSON-LD for Martigues. The items below are what is still open.

## SEO

- [ ] Merge and deploy the current site so production matches this repository. Canonical host: `https://laurecorrao.fr`.
- [x] Point the domain at GitHub Pages (A/AAAA or CNAME) and confirm HTTPS. `site` in `astro.config.mjs` stays `https://laurecorrao.fr` with `base` `/`.
- [ ] Make the logo and the favicon, then the photographs listed under [Logo, favicon, and photos](#logo-favicon-and-photos). The file in `public/images/` is a crop of a layout reference, 750×585. `public/favicon.svg` is a green “Lc” that does not match the rose palette.
- [ ] When the practice address is known, put the same street, postal code, city, and country in `site.config.ts` → `geo`, the legal notice, and `streetAddress` in `src/lib/jsonld.ts`. Until then the JSON-LD stays at commune level (Martigues, 13500, 43.4053° N, 5.0475° E) and must not use the town hall’s street.
- [ ] Add phone (`phone`, `phoneE164`) and email on `siteConfig.contact` once they exist. JSON-LD already prints `telephone` and `email` when those strings are non-empty.
- [ ] Add SIRET, legal status, and the publisher’s role on the legal notice only. Do not put a registry number in the footer or the homepage entity.
- [ ] Add `Offer` prices to the homepage JSON-LD only for the fees already published in the copy (individual 60 €, couple 80 €, 60 minutes). Do not add hours or a third price.
- [ ] Add `FAQPage` JSON-LD from the questions actually rendered on the home page.
- [ ] Add `BreadcrumbList` on inner pages (home → current page).
- [ ] Add `sameAs` only for profiles that exist (Google Business, and any public profile she uses). Leave `twitterHandle` empty if there is no account.
- [ ] Submit `https://laurecorrao.fr/sitemap-index.xml` in Google Search Console and Bing Webmaster after the domain is live. Request indexing of the home page and the booking page.
- [ ] Read Core Web Vitals on the live home page, the booking page, and one article. Fix what fails. The booking page embeds Cal.com.
- [ ] Keep `ENABLE_MULTILANG=false` and `publishedLocales: ['fr']` until English is a real decision. Do not announce `hreflang="en"` before that day.
- [ ] Remove the provisional Cal.com link (`adam-1344-vm70qf/30min` in `src/components/CalEmbed.astro`) before asking Google to index the booking page.

## Local SEO and Google Business

The public place is “cabinet à Martigues” plus video sessions. The category on Google must match the status she declares (psychopractitioner and couples therapist). Do not list a protected title she does not hold.

- [ ] Create or claim the Google Business Profile for the practice.
- [ ] Verify it (postcard, phone, or email, whichever Google offers).
- [ ] Use one name, one address, one phone, one website URL, identical to the site and the legal notice.
- [ ] Set the primary category from her real status. Add the services that are on the site: individual support, couples therapy, in-person in Martigues, video.
- [ ] Set hours only if she has published them. Do not copy the town hall’s hours.
- [ ] Add the booking URL `https://laurecorrao.fr/tarifs-et-rendez-vous/#agenda` once her calendar replaces the test one.
- [ ] Add the logo and the practice photos from [Logo, favicon, and photos](#logo-favicon-and-photos). The exterior shot waits until the street address is the real door.
- [ ] After verification, put the Google Business URL in `sameAs` and rebuild.
- [ ] When the street is known, move `geo` from the commune centroid to the practice door and add a map link. Until then, do not embed a pin on the wrong building.
- [ ] Optional: Apple Business Connect and Bing Places, with the same name, address, and phone.

## Logo, favicon, and photos

Make these before launch. No stock people, no client in session, no face other than Laure’s. Empty rooms only. Export sRGB, no text baked into the picture. Update `HomePage.portraitAlt` in `fr.json` and `en.json` when the portrait changes.

### Logo

- [ ] Draw the wordmark “Laure Corrao” for the header (serif, ink `#36332f` on cream `#fcfaf6`).
- [ ] Draw a small mark for the icon (initials or one symbol). Rose `#a55955` on cream, or ink on cream. Not the current green square.
- [ ] Put the wordmark in the header in place of the text-only name. Keep the name as text next to it if the image fails.

### Favicon

Cut the mark, not a tiny copy of the wordmark.

- [ ] `public/favicon.svg`
- [ ] `public/favicon.ico`
- [ ] `public/favicon-32x32.png` and `public/favicon-16x16.png`
- [ ] `public/apple-touch-icon.png` (180×180)
- [ ] `public/android-chrome-192x192.png` and `public/android-chrome-512x512.png`
- [ ] Point `public/site.webmanifest` and `src/layouts/Layout.astro` at those files. `theme_color` stays `#a55955`.

### Photos by theme

| Theme | Where it goes | What to shoot |
| --- | --- | --- |
| Accueil | Hero, right column. Replaces `public/images/reference-laure.jpeg`. | Portrait of Laure, landscape, about 3:2, face clear, warm interior behind her. |
| Accueil | Open Graph and Twitter. `site.config.ts` `ogImageUrl`, width, height. | Same sitting, wider frame, about 1200×630, face not cropped by the edges. |
| Accompagnement individuel | Page `/accompagnement-individuel/` and the individual card on the home page. | One empty chair in a quiet corner of the cabinet. No person. |
| Thérapie de couple | Page `/therapie-de-couple/` and the couple card on the home page. | Two empty seats facing each other, or one shared seat with two places. No couple, no hands. |
| Mon approche | Page `/mon-approche/`. | One detail of the room: light, a closed notebook, a plant. Do not stage hypnosis, DNR, or art materials as a medical setup. |
| Cabinet à Martigues | “Au cabinet” block on the home page, and Google Business. | Wide view of the practice room, then one closer detail (chair, window, table). |
| Cabinet, outside | Google Business only, after the street is known. | The real entrance in daylight. Do not photograph the town hall or another building. |
| Visioconférence | “En visioconférence” block, only if that block gets an image. | Laure at her desk, camera visible, quiet background. No screen showing another person. |
| À propos | About column on the home page, if a second picture is added. | A second portrait, different framing from the hero. |
| Blog | Cover of each article, uploaded in Forge (`cover_image_url`). | One 3:2 picture per article, related to that article. No title set in the file. The site crops it. |
| Google Business | Profile logo, cover, and gallery. | Logo, the hero portrait, the wide room, the two seats, the individual chair. Exterior only with the real door. |

## Email

- [ ] Choose the public address (for example `contact@laurecorrao.fr`) with her.
- [ ] Create the mailbox at the DNS host for `laurecorrao.fr`.
- [ ] Publish MX, SPF, DKIM, and DMARC for that domain. Send a message to an outside inbox and confirm it is not spam.
- [ ] Put that address in `siteConfig.contact.email`, the legal notice, the privacy policy, and Google Business.

## SMTP and the contact form

This site does not send mail. The dialog `POST`s to Forge `POST /api/v1/send_form`. Forge sends the message with its own SMTP.

Forge SMTP (`config/initializers/action_mailer_smtp.rb`) is on when `SMTP_ADDRESS` is set: port `SMTP_PORT` (default 465, SSL), `SMTP_USER_NAME`, `SMTP_PASSWORD`, From `MAILER_FROM` (default `noreply@1344.fr`). The message goes **to** `website.email`, with **reply-to** the visitor.

- [ ] Confirm production Forge has `SMTP_ADDRESS`, `SMTP_PORT`, `SMTP_USER_NAME`, `SMTP_PASSWORD`, and `MAILER_FROM`.
- [ ] Set the Website email in Forge to Laure’s mailbox. An empty `website.email` means the form has nowhere to deliver.
- [ ] Put the same website token in GitHub Actions as `PUBLIC_CONTACT_FORM_TOKEN`, and set `PUBLIC_CONTACT_FORM_URL` to `https://forge.1344.fr/api/v1/send_form`.
- [ ] Allow `https://laurecorrao.fr` in Forge CORS.
- [ ] Send a test from the live dialog. Confirm Laure receives it, the subject is `[Laure Corrao] …`, and Reply goes to the visitor, not to `noreply@1344.fr`.
- [ ] If the From address must be `@laurecorrao.fr`, change Forge SMTP and `MAILER_FROM`, and align SPF/DKIM for that From. Do not add an SMTP client to this Astro app.

## Forge, so she can edit the site

Writing happens in Forge, scoped to the Website `laurecorrao.fr`. This repository only fetches published JSON at build time.

- [ ] Create the Website in Forge: name, domain `laurecorrao.fr`, status Active, default locale `fr`.
- [ ] Invite her user and attach it with a website membership.
- [ ] Copy the website API token into GitHub secrets `FORGE_API_TOKEN` and `PUBLIC_CONTACT_FORM_TOKEN`. Set `FORGE_URL` to `https://forge.1344.fr/api/v1`.
- [ ] Create a fine-grained GitHub token for `heavensal/laurecorrao-astro` with Contents read and write (repository dispatch needs write).
- [ ] In Forge, set the rebuild URL to `https://api.github.com/repos/heavensal/laurecorrao-astro/dispatches` and the rebuild bearer token to that GitHub token.
- [ ] Tick **Blog articles** only. Leave FAQs and Reviews unticked while `FORGE_FAQ_ENABLED` and `FORGE_REVIEWS_ENABLED` stay `false` in `.github/workflows/deploy.yml`.
- [ ] Publish one article, confirm Forge calls the rebuild, and confirm `/blog/` and `/blog/{slug}/` appear on the live site.
- [ ] Show her how to sign in, write, and publish. Drafts and future `published_at` values stay off the site.

## What Forge provides

She can create, edit, and publish these, for this website only. The public API returns rows that are `published` and whose `published_at` is already past. Auth is `Authorization: Bearer` with the website token.

| In Forge | On the site when the flag is `true` | Fields |
| --- | --- | --- |
| Articles | `/blog` and `/blog/{slug}` (`FORGE_ARTICLES_ENABLED`) | title, slug, description, HTML body, cover image, `published_at` |
| FAQs | home FAQ block (`FORGE_FAQ_ENABLED`) | question, answer, slug, position, locale |
| Reviews | home review block (`FORGE_REVIEWS_ENABLED`) | author, content, rating 1–5, position, `published_at` |

Article HTML is limited to `p`, `br`, `strong`, `em`, `ul`, `ol`, `li`, `h2`, `h3`, `blockquote`, `a`. Reviews must be real testimonials she supplies.

Also provided, and not a content type:

- Contact delivery: `POST /api/v1/send_form` emails `website.email`.
- Rebuild: a change to a ticked content type POSTs to GitHub and the workflow rebuilds the site.
- Optional ChatGPT access (MCP), off unless enabled. She approves each change in Forge before it is saved.

Today this site turns **articles on** and **FAQs and reviews off**. FAQs and reviews on the page come from `fr.json` / `en.json`. Moving them into Forge means setting both flags to `true`, ticking them on the Website, and publishing the same questions and testimonials there.

## What stays in this repository

Forge does not store or edit:

- hero, services, approach, fees, place, header, footer
- legal notice, privacy policy, terms
- phone, street address, SIRET, booking embed
- design, SEO shell, hreflang, sitemap

Cal.com (her events, payment, video link, reminders, cancellation) stays in Cal.com. This site only embeds it.

## Close the project

- [ ] She has signed in to Forge and published or approved one article.
- [ ] A contact message arrives in her mailbox.
- [ ] Google Business shows the same name, city, and URL as the site.
- [ ] The test calendar and the missing legal facts are gone. The logo, the favicon, and the theme photos replace the green “Lc” and the reference portrait.
- [ ] Search Console shows the sitemap with no `/en/` URLs.
