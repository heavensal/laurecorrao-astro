# Legal notice completion

- [ ] Obtain a current registration extract. Confirm the publisher’s full registered identity, legal status, registered address, trade name (omit if none), SIREN, practice SIRET, RNE entry and any other applicable registration. If an individual entrepreneur, add the EI designation. If a company, add its registered name, legal form, capital and registered office.
- [ ] Confirm the VAT regime and add the VAT identification number if applicable.
- [ ] Obtain the professional email address for the publisher and confirm the contact address for privacy requests. Add them to the legal notice and privacy policy.
- [ ] Confirm the publication director’s name and role against the legal structure.
- [ ] Check the hosting contract for the exact Hostinger entity, full postal address, telephone number and official website. Add the contract-specific details to the notice and verify the corresponding hosting disclosures in the privacy policy.
- [ ] Confirm the exact professional title, qualifications and any profession-specific disclosures that apply.
- [ ] Inventory the texts, photographs, illustrations, logo and other third-party assets. Confirm authorship, licences and required credits before adding credits to the notice.
- [ ] Obtain proof of effective enrolment with a consumer mediator, its name, postal address and website. Add these details to the notice and the referral procedure to the terms of sale.
- [ ] Have the publisher verify the completed French notice and corresponding English copy, then update the revision date.

Reference: [Service Public Entreprendre — mandatory website disclosures](https://entreprendre.service-public.gouv.fr/vosdroits/F37351).

## Terms and conditions of sale

- [ ] Add the verified legal identity, status, SIREN, SIRET and professional email from the legal notice checklist to the terms. Add the email to complaints, cancellations and the withdrawal form.
- [ ] Confirm the scope of support and qualifications, how the free exchange takes place (telephone or another channel), and the production Cal.com event for the free 10-minute exchange.
- [ ] Decide how clients expressly accept the quote and terms (signature or explicit email), the validity period of quotes and how long a provisional slot is held.
- [ ] Confirm the listed prices are the final consumer prices, verify the VAT regime and add the applicable VAT wording or breakdown to quotes and terms.
- [ ] Name the online payment provider, confirm any other accepted in-office methods and specify the terms and deadline for remote-session payment.
- [ ] Decide how late arrivals, cancellations with less than 48 hours’ notice and no-shows are handled. Specify any amount, exceptions and handling of prepaid sums before applying a charge.
- [ ] Confirm arrangements and parental authorisations for minors. Specify the video platform, technical prerequisites and procedure for interrupted remote sessions.
- [ ] Confirm professional liability insurance details and add the insurer, coverage and contact details if applicable.
- [ ] Add the enrolled mediator’s contact details and referral procedure after confirmation.
- [ ] Verify the paid contract acceptance channel. If the contract can be concluded through an online interface, implement and link the applicable withdrawal function. The Cal.com link only books the introductory exchange. Prepare the withdrawal form and separate express early-performance statements for the quote email.
- [ ] Review and date the final terms before sending them with quotes, and retain the version each client accepted.

## Privacy policy completion

- [ ] Confirm the controller’s registered identity, status and professional privacy email. Confirm that the stated contact channels work and that no DPO has been appointed.
- [ ] Determine whether session notes or other sensitive data are recorded. Document minimum contents, storage, permitted access, retention, Article 6 basis and applicable Article 9 condition before collection. If relying on explicit consent, obtain it separately, document withdrawal and explain the consequences.
- [ ] Verify Hostinger’s contractual entity, service, locations, logs and retention. Verify Cal.com’s contractual entity, actual event fields, integrations, deletion settings and subprocessors. Confirm Forge’s access and retention. Identify real email, payment, video, accounting and maintenance providers, access roles and policy links.
- [ ] Check processing locations and transfers outside the EEA for each provider and its subprocessors. Document any countries, safeguards and how to obtain a copy, or confirm no transfers after verification.
- [ ] Verify the existing one-year contact retention rule, its starting point and deletion or anonymisation process. Establish actual periods for calendar entries, customer details, quotes, contractual evidence, notes, security logs, cookies and records of consent. Document restricted archiving and deletion.
- [ ] Inventory the security measures actually used, including access controls, authentication, backups, updates, transmission and storage protections. Check whether any automated decisions or profiling produce significant effects.
- [ ] Audit the production site and embedded calendar before and after interaction for cookies, storage and external requests. Record providers, purposes, durations and legal basis. Where prior consent is required, block the relevant service until consent, provide equally accessible refusal and withdrawal, and link the working preference controls.
- [ ] Have the controller confirm the actual processing, update both language versions and date the final policy.

# SEO, accessibility and GEO

Follow-up to the November 2026 audit. Quick fixes, images, booking links, deferred Cal.com and map loading, JSON-LD, `llms.txt`, sitemap `lastmod` and the accessibility fixes (new-tab icon and text on Maps links, contact form required fields and errors, reduced-motion dialogs, footer headings) are done.

## Content and identity

- [ ] Write the “Qui suis-je” page, then complete the `Person` JSON-LD (`hasCredential`, `alumniOf`, `memberOf`, a dedicated portrait) and link it from the home page and the article author.
- [x] Professional title is psychothérapeute (English: psychotherapist), including the layout, the home H1, `Person.jobTitle`, the legal copy, and the README.
- [x] Google Business Profile verified: Laure Corrao, category Psychothérapeute, website laurecorrao.fr, phone 06 69 31 64 50. Canonical place URL is in `siteConfig.sameAs`. No public Doctolib, Resalib, or LinkedIn profile for this practice.
- [x] Address aligned on the Google Business form `9 Imp. "Le Maroni", 13110 Port-de-Bouc`. Saint-Jean is not part of that address. The building name Les Jardins de Louis stays on the legal notice.
- [x] Opening hours confirmed with Laure Corrao and on the Google Business Profile: Monday to Friday, 09:00 to 18:00. Saturday and Sunday closed. `siteConfig.openingHours` matches `Footer.hoursSchedule`.
- [ ] The service catalog has four services. ADHD support has no dedicated session price, so its JSON-LD offer has no price. Add one if a specific rate exists, or confirm a fifth service to add.
- [ ] Add internal links from the home page to the ADHD and parenting pages, which only the navigation reaches.
- [ ] Add a short FAQ to each service page (with `FAQPage` JSON-LD) and link `Adhd.sources` to the HAS and ameli pages.
- [ ] Optionally mention neighbouring towns (Martigues, Fos-sur-Mer, Istres, Saint-Mitre-les-Remparts) in visible copy. Today the Bouches-du-Rhône and France service area is only in the JSON-LD and `llms.txt`.

## Forge article (edit in Forge)

- [ ] Add H2 and H3 subheadings, fix the image that cuts a word, write descriptive `alt` text, and request resized Cloudinary images (`w_`, `f_auto`, `q_auto`).
- [ ] If Forge exposes an update date, use it for the article `lastmod` and `article:modified_time` (only `published_at` is available today).

## Hosting, legal and crawlers

- [ ] The legal notice and privacy policy name Hostinger, but the site is deployed on GitHub Pages. Confirm the host and update both texts.
- [ ] List Google Maps (loaded only after “Afficher la carte”) and Cal.com (loaded on first interaction) in the privacy policy, with their cookies and transfers.
- [ ] GitHub Pages cannot send HTTP 301 redirects, so the old URLs use meta refresh pages. Move to a host with real redirects and long cache headers for `/_astro/` (Cloudflare Pages, Netlify), or accept the limitation.
- [ ] Decide the AI crawler policy in `robots.txt` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Everything is allowed today.

## After deployment

- [ ] Test the booking flow on mobile and desktop: dialog, Cal.com loading, confirmation, and the link fallback without JavaScript.
- [ ] Validate the home, service, fees and article pages in the Rich Results Test and the Schema.org validator.
- [ ] Submit `sitemap-index.xml` in Google Search Console and Bing Webmaster Tools, then check `https://laurecorrao.fr/llms.txt`.
- [ ] Run Lighthouse on the home and fees pages and compare with the audit.


## SEO / GEO / Accessibilité — Corrections dans le dépôt

Aucun nouvel audit exécuté lors de l'installation de ce workflow. Les tâches des sections précédentes et leurs validations restent conservées ; les rapprocher avant d'ajouter des constats ici.

<!-- Format : - [ ] SGA-001 — P1 — SEO / GEO / Accessibilité — Action
État : à faire. Responsable : IA. Preuve : fichier:ligne ou URL + observation.
Dépendances : aucune ou EXT-001. Acceptation : résultat vérifiable.
Validation de clôture : date, contrôle, résultat et fichiers concernés. -->

## SEO / GEO / Accessibilité — Intervention du propriétaire

Ne pas redemander les informations déjà confirmées plus haut (notamment fiche Google Business et horaires), sauf contradiction démontrée. Un accès indisponible doit être signalé comme non vérifié, pas comme inexistant.

<!-- Format : - [ ] EXT-001 — P1 — Information ou action précise
État : bloqué. Responsable : propriétaire. Motif/preuve : ...
Débloque : SGA-001. Acceptation : confirmation ou résultat observable.
Ne jamais écrire de mot de passe ou de jeton ici. -->
