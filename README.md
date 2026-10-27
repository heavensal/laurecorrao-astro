# laurecorrao.fr

Site statique Astro 7.2.9, pnpm, sans backend Rails. Copie de travail du dépôt local `/Users/adam/code/heavensal/landingPages/laurecorrao`, incluant ses modifications non commitées initiales. Branche `feat/site-vitrine`. Aucun remote Git n’était configuré.

## Développement

- `pnpm install --frozen-lockfile`
- `pnpm dev --background`
- `pnpm astro dev status` / `pnpm astro dev stop`
- `pnpm build` génère `dist/`.

Aucun script lint ou test n’était fourni dans le dépôt. Les textes utilisateur de la conversation sont conservés dans `src/content.json`; les pages reprennent les contenus fournis, avec remplacement de l’ancien retraitement émotionnel par le DNR exact.

## Avant publication

- Compléter l’adresse du cabinet, accès, téléphone, e-mail, statut, SIRET, éditeur et hébergeur.
- Finaliser mentions légales, confidentialité et conditions avec les informations réelles. Les pages actuelles indiquent explicitement les données manquantes.
- Remplacer le calendrier de démonstration `adam-1344-vm70qf/30min` dans `src/components/CalEmbed.astro` par celui de Laure.
- Dans Cal.com : configurer les événements individuel (60 €, 60 min) et couple (80 €, 60 min), cabinet/visio, disponibilités, nom/prénom/e-mail/téléphone, acceptation de la politique d’annulation, confirmations, rappels et liens de modification/annulation.
- Configurer le paiement sécurisé et le lien visio dans Cal.com. Le site ne simule pas ces fonctionnalités et ne collecte aucune donnée patient lui-même.
- Vérifier une réservation de bout en bout sur le compte de Laure, y compris paiement, e-mails et annulation. Aucun rendez-vous réel n’a été créé pendant les vérifications.
- Déployer uniquement après remplacement des informations provisoires. Le domaine canonique est `https://laurecorrao.fr`.
