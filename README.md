# laurecorrao.fr

Static Astro site for Laure Corrao, psychopractitioner and couples therapist in Martigues. pnpm. No Rails backend in this repository.

## Development

- `pnpm install --frozen-lockfile`
- `pnpm dev`
- `pnpm build` writes `dist/`

Visible copy is in `src/i18n/locales/fr.json` and `en.json`. `ENABLE_MULTILANG` defaults to `false`: the site publishes French only, and English copy stays in `en.json` without a `/en/` URL. See `MULTILANG.md` and `.cursor/skills/language/SKILL.md`.

## Before publication

- Add the practice address, access notes, phone, email, status, and SIRET. Do not invent them. The host is GitHub, Inc. The technical provider is #1344 Solutions (`https://1344.fr`).
- Set `FORGE_API_TOKEN` in `.env` to the Forge token for `laurecorrao.fr`. Without it, `/blog` is not generated. The same token goes in `PUBLIC_CONTACT_FORM_TOKEN` for the contact form (it is exposed to the browser).
- The test calendar `adam-1344-vm70qf/30min` in `src/components/CalEmbed.astro` stays until Laure’s calendar replaces it. The public Cal.com embed uses no secret.
- In Cal.com, configure the individual event (€60, 60 min) and the couples event (€80, 60 min), practice or video, availability, name, email, phone, cancellation policy, confirmations, reminders, and reschedule or cancel links.
- Configure secure payment and the video link in Cal.com. This site does not collect patient data itself.
- Check a booking end to end on Laure’s account, including payment, email, and cancellation.
- Deploy only after the provisional details are replaced. The canonical domain is `https://laurecorrao.fr`.
