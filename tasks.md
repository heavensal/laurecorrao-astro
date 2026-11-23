## 1. Nom et arborescence

- [ ] Nom de domaine
- [ ] Langue principale
- [ ] Langues supplémentaires
- [ ] CMS Forge
  - [ ] Blog
  - [ ] FAQ
  - [ ] Avis

## 2. Design

- [ ] Thème / références visuelles
- [ ] Couleurs
- [ ] Typographies
- [ ] Logo
- [ ] Icônes du site
  - [ ] Favicon
  - [ ] Apple Touch Icon — iPhone / iPad
  - [ ] Icônes Android
- [ ] Photos / illustrations
- [ ] Image de partage — réseaux sociaux

## 3. Déploiement

- [ ] GitHub Pages

  Dépôt → **Settings → Pages → Source : GitHub Actions**. Réutiliser le workflow de déploiement existant ; sinon demander à l’IA de le créer pour Astro.

- [ ] Domaine personnalisé dans GitHub

  **Settings → Pages → Custom domain** → saisir le domaine sans `https://` → **Save**, avant de modifier le DNS.

- [ ] DNS chez le registrar

  Ouvrir la **zone DNS** chez le fournisseur qui gère les serveurs de noms actifs. Conserver les serveurs de noms actuels ; modifier les enregistrements suivants :

  | Type | Nom | Valeur |
  | --- | --- | --- |
  | A | `@` | `185.199.108.153` |
  | A | `@` | `185.199.109.153` |
  | A | `@` | `185.199.110.153` |
  | A | `@` | `185.199.111.153` |
  | CNAME | `www` | `COMPTE.github.io` |

  Remplacer `COMPTE` par le compte ou l’organisation GitHub, sans nom de dépôt. Remplacer les anciens enregistrements web incompatibles ; conserver les MX et TXT existants.

- [ ] Publication

  Vérifier avec l’IA le domaine dans Astro et les variables nécessaires au build. Pousser la version prête sur `main` → onglet **Actions** → vérifier build et déploiement réussis.

- [ ] HTTPS et vérification

  Attendre la validation DNS et le certificat → **Settings → Pages → Enforce HTTPS**. Tester le domaine avec et sans `www`, puis une page interne.

- [ ] GitHub Action — déploiement automatique après merge sur `main`

  Vérifier `.github/workflows/deploy.yml` : déclencheur `push` sur `main` (le merge d’une pull request le déclenche). Après merge → **Actions** → vérifier build, déploiement et site mis à jour. Ce déclencheur publie aussi les pushs directs sur `main`.

[Référence GitHub — domaine et DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## 4. Formulaire de contact

- [ ] Affichage — modale / page dédiée / section landing page
- [ ] Liste des champs
- [ ] Obligatoires / facultatifs


## 5. Connecter la Forge

Dashboard Forge → ouvrir le Website concerné ou le créer.

- [ ] Créer le Website — si absent
- [ ] Confirmer les importations CMS
  - [ ] Blog
  - [ ] Reviews / avis
  - [ ] FAQ
- [ ] Renseigner l’email professionnel
- [ ] Ajouter le token Forge au `.env` — si au moins une importation

  `FORGE_API_TOKEN` + `FORGE_URL` ; activer les flags des ressources retenues. Reporter les secrets dans **GitHub → Settings → Secrets and variables → Actions** pour le build distant. Ne pas committer le `.env`.

- [ ] Rebuild automatique après création / modification / suppression d’un élément importé

  1. GitHub → **Settings du compte → Developer settings → Personal access tokens → Fine-grained tokens** : créer un token limité au dépôt, permission **Contents: read and write**.
  2. Forge → paramètres de rebuild du Website : URL `https://api.github.com/repos/COMPTE/REPO/dispatches` + token GitHub comme bearer. Ce token est distinct du token API Forge.
  3. Vérifier l’événement envoyé : `event_type: forge-rebuild`, et son écoute via `repository_dispatch` dans le workflow présent sur la branche par défaut. Sélectionner uniquement les ressources importées.
  4. Tester une modification autorisée (ex. nouvel article publié) → **GitHub Actions** → build et déploiement → changement visible sur le site. Vérifier aussi modification et suppression ; une simple lecture ne nécessite pas de rebuild.

  [Référence GitHub — repository dispatch](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event).

## 6. Contenu client

- [ ] Textes
- [ ] Sections
- [ ] Offres / tarifs
- [ ] Informations client — téléphone / email / adresse / horaires
- [ ] Marketing — arguments / appels à l’action
- [ ] Pages légales
  - [ ] Politique de confidentialité
  - [ ] Conditions générales
  - [ ] Mentions légales
- [ ] Informations manquantes → `todo.md`

  Placeholder explicite pendant la préparation + tâche indiquant l’information attendue et son emplacement. Exemple : « Téléphone à fournir — footer et page contact ». Remplacer le placeholder après confirmation ; aucun placeholder publié.
- [ ] Validation client

## 7. SEO, accessibilité, GEO

- [ ] Sitemap — URLs publiées / langues actives
- [ ] `robots.txt` — règles de crawl / lien du sitemap
- [ ] `llms.txt` — contenus publics / liens à jour (facultatif, aucune garantie de citation IA)
- [ ] Métadonnées — titres / descriptions / canonical
- [ ] Multilingue — hreflang / liens entre traductions, si applicable
- [ ] Partage social — Open Graph / image de partage
- [ ] Données structurées — identité / adresse / horaires / contenus visibles
- [ ] Google Search Console
  - [ ] Propriété du domaine — validation DNS
  - [ ] Sitemap — soumission
  - [ ] Indexation — contrôle des pages principales
- [ ] Google Business Profile — si activité éligible
  - [ ] Fiche existante / création / revendication
  - [ ] Vérification propriétaire
  - [ ] Nom / catégorie / prestations
  - [ ] Adresse / téléphone / horaires
  - [ ] Site / réservation / logo / photos
  - [ ] Cohérence fiche ↔ site

- [ ] Audit complet — `/build-seo-geo-accessibility-audit`
- [ ] Validation des changements / informations à afficher — décisions dans `todo.md`
- [ ] Corrections retenues — `/build-seo-geo-accessibility-fix` : uniquement les tâches acceptées
- [ ] Tests PageSpeed Insights — mobile / ordinateur
- [ ] Corrections et nouveaux tests — jusqu’à validation

## 8. Vérifications

- [ ] Terminer `todo.md` — tâches réalisées et vérifiées ; refus / non-applicables documentés
- [ ] Aucun placeholder — informations réelles intégrées
- [ ] Build automatique Forge — création / modification / suppression d’un contenu importé
- [ ] Formulaire de contact
  - [ ] SweetAlert — succès / erreur
  - [ ] Réception de l’email
- [ ] HTTPS / domaine avec et sans `www`
- [ ] Navigation — liens / boutons / page 404 / langues publiées
- [ ] Affichage — mobile / tablette / ordinateur
- [ ] Accessibilité — clavier / focus / contrastes / labels
- [ ] Logo / favicons / icônes téléphone / aperçu de partage
- [ ] Sitemap / `robots.txt` / `llms.txt` — accès public et contenu correct
- [ ] Indexation — aucun `noindex` ou blocage involontaire en production
- [ ] Réservation / carte — si présentes

## 9. Livraison client

- [ ] Accès à l’email professionnel
- [ ] Transfert des messages du formulaire — email pro → email choisi par le client
  - [ ] Adresse de destination
  - [ ] Transfert configuré / réception testée
- [ ] Accès à Google Business
- [ ] Factures transmises
  - [ ] Nom de domaine
  - [ ] Hébergement
  - [ ] Prestations de services
- [ ] Dates des prochains renouvellements
  - [ ] Nom de domaine
  - [ ] Hébergement
  - [ ] Messagerie / autres abonnements — si applicables
- [ ] Notes client — besoins / préférences / engagements / suivi, dans un espace privé
