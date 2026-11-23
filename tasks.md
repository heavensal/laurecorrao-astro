# Créer, améliorer et livrer une landing page

Checklist générale de recette, en français. Une case ouverte signifie « à vérifier pour cette livraison », pas nécessairement « absent du site ». Cocher avec date et preuve ; indiquer « non applicable » avec justification pour les fonctionnalités non demandées. Les problèmes précis et leur historique restent dans [todo.md](todo.md), sans dupliquer les tâches SGA/EXT.

Responsabilités : **Dépôt** = code/documentation ; **Externe** = compte, DNS, service ou hébergement ; **Propriétaire** = décision, information ou validation. Un item mixte doit être scindé en tâches dépendantes lors de sa réalisation. Cette checklist n'autorise aucune action externe à elle seule.

## 1. Cadrage et contenu

- [ ] **Propriétaire** — Valider objectif, public, offre, action principale attendue et critères de réussite.
- [ ] **Propriétaire** — Fournir identité, coordonnées, adresse publique, horaires, tarifs, qualifications et zones réellement desservies ; ne rien inventer.
- [ ] **Propriétaire** — Choisir langues et fonctionnalités : blog, FAQ, avis, contact, réservation, carte, suivi statistique.
- [ ] **Dépôt** — Définir arborescence, sections, parcours, URLs localisées et liens internes ; appliquer MULTILANG.md et conserver le fonctionnement existant hors migration demandée.
- [ ] **Propriétaire** — Valider textes, logo, portraits, photographies et droits d'utilisation. Aucun témoignage fictif en production.
- [ ] **Dépôt** — Prévoir accueil, prestations, présentation, contact et pages complémentaires réellement utiles ; une page distincte n'est pas obligatoire pour chaque section.

## 2. Domaine et hébergement

- [ ] **Externe / Propriétaire** — Acheter ou confirmer la propriété du domaine ; vérifier titulaire, accès, renouvellement et récupération du compte.
- [ ] **Externe** — Identifier qui gère le DNS et qui héberge réellement le site ; le registrar n'est pas nécessairement l'hébergeur.
- [ ] **Externe** — Configurer le dépôt GitHub et Pages avec le workflow Actions adapté, les accès et l'environnement de publication.
- [ ] **Externe** — Vérifier le domaine dans GitHub si applicable, configurer le domaine personnalisé puis les enregistrements DNS selon la documentation actuelle ; préserver MX et TXT existants.
- [ ] **Dépôt** — Aligner domaine canonique, base path, génération d'URLs et configuration Astro avec l'hébergement retenu.
- [ ] **Externe** — Vérifier HTTPS, certificat, domaine racine et www, absence de contenu mixte, résolution DNS et comportement des anciennes URLs.
- [ ] **Propriétaire** — Valider les limites de l'hébergement retenu : redirections HTTP, en-têtes, formulaires et fonctions serveur. GitHub Pages sert le build statique ; ne pas supposer un backend disponible.

## 3. Construction dans le dépôt

- [ ] **Dépôt** — Centraliser configuration métier et URLs ; partager layouts/composants sans dupliquer les pages par langue inutilement.
- [ ] **Dépôt** — Réaliser design responsive, navigation, pied de page, CTA, états interactifs et page 404.
- [ ] **Dépôt** — Optimiser images, tailles, formats, polices et chargements tiers ; intégrer favicon et partage social adaptés.
- [ ] **Dépôt** — Appliquer SEO_GEO_ACCESSIBILITY.md pendant chaque développement : structure des titres, HTML sémantique, alternatives, labels, clavier et focus.
- [ ] **Dépôt** — Respecter les langues publiées et leur contenu ; ne pas ajouter d'i18n à un nouveau site monolingue.
- [ ] **Dépôt** — Documenter installation, configuration et commandes réelles ; garder .env.example sans secrets, exclure .env du suivi et distinguer variables publiques/privées.

## 4. Forge et ressources optionnelles

- [ ] **Externe / Propriétaire** — Créer ou vérifier le Website Forge, le domaine, les langues préconfigurées et les accès du propriétaire.
- [ ] **Dépôt** — Réutiliser une seule connexion Forge, vérifier le contrat API réel et importer les ressources au build selon leurs flags.
- [ ] **Externe** — Configurer les secrets nécessaires dans l'environnement de build sans les exposer dans le navigateur, les logs ou la documentation. Vérifier séparément le contrat et les permissions de tout jeton de formulaire public.
- [ ] **Dépôt** — Blog demandé : index, articles, URLs et traductions fournies par Forge, relations de traduction, brouillons exclus, politique d'erreur explicite ; sinon aucun ajout de blog.
- [ ] **Dépôt** — FAQ demandée : questions/réponses locales contextualisées, import activé par défaut et remplacement complet par langue dès que Forge fournit du contenu ; sinon aucune FAQ ajoutée.
- [ ] **Dépôt** — Avis demandés : même principe de remplacement, avis authentiques seulement et masquage public sans source authentique ; sinon aucune section ajoutée.
- [ ] **Externe** — Configurer le rebuild Forge vers le bon dépôt et événement GitHub, avec les permissions minimales nécessaires et seulement les ressources utilisées.
- [ ] **Mixte** — Vérifier une publication autorisée de bout en bout : Forge → rebuild → build → page publique. Une proposition Forge non approuvée ou un webhook envoyé ne prouve pas la livraison.

## 5. Contact, messagerie et réservation

- [ ] **Externe / Propriétaire** — Choisir et créer la boîte professionnelle ; configurer MX, SPF, DKIM et DMARC avec le fournisseur, puis vérifier la réception.
- [ ] **Externe** — Configurer destinataire, service d'envoi Forge et origines autorisées ; distinguer les secrets serveur des paramètres publics.
- [ ] **Dépôt** — Vérifier labels, validations, erreurs, succès, anti-abus adapté et absence d'exposition de données sensibles dans les logs.
- [ ] **Externe / Propriétaire** — Configurer le vrai calendrier, prestations, disponibilités, notifications et éventuels paiements ; remplacer les liens de test.
- [ ] **Dépôt** — Tester intégration et lien de secours de réservation, affichage mobile, clavier et chargement des services tiers.
- [ ] **Mixte** — Effectuer un envoi et une réservation de test autorisés ; confirmer réception, réponse et nettoyage des données de test.

## 6. Informations légales et données personnelles

- [ ] **Propriétaire** — Confirmer identité légale, statut, informations professionnelles et conditions commerciales applicables ; utiliser les tâches détaillées existantes de todo.md.
- [ ] **Mixte** — Faire vérifier les mentions, confidentialité et conditions nécessaires à l'activité, puis intégrer les informations validées dans chaque langue publiée.
- [ ] **Dépôt** — Inventorier les services réellement chargés, données collectées, cookies, durées et destinataires ; ne pas copier une politique générique déconnectée du fonctionnement.
- [ ] **Mixte** — Déterminer les besoins de consentement selon les services et exigences applicables, puis vérifier le comportement avant/après choix. Faire valider les questions juridiques incertaines par une personne compétente.
- [ ] **Dépôt** — Vérifier que le nom de l'hébergeur correspond au service réellement utilisé, pas simplement au vendeur du domaine.

## 7. SEO, GEO et accessibilité

- [ ] **Dépôt** — Exécuter `/seo-geo-accessibility-audit` et consulter les deux checklists de todo.md.
- [ ] **Dépôt** — Corriger avec `/seo-geo-accessibility-fix`, respecter les dépendances et conserver les preuves avant de cocher.
- [ ] **Dépôt** — Vérifier titres, descriptions, canonical, hreflang, sitemap, robots, liens, données structurées et statuts réels ; pas de noindex accidentel en production.
- [ ] **Dépôt** — Vérifier manuellement clavier, focus, formulaires, modales, contrastes, zoom/reflow, langues et parcours tiers ; compléter par les outils disponibles et signaler les limites.
- [ ] **Dépôt** — Vérifier clarté des offres, faits et sources, cohérence des identités, contenu HTML et éventuel llms.txt ; aucune promesse de citation IA.
- [ ] **Propriétaire** — Confirmer la politique des robots recherche/entraînement si une modification est demandée.

## 8. Présence et outils externes

- [ ] **Externe** — Vérifier la propriété dans Google Search Console (TXT DNS ou méthode proposée), conserver le justificatif nécessaire et soumettre le sitemap réel.
- [ ] **Externe** — Examiner indexation, erreurs et pages importantes ; une soumission ne garantit pas l'indexation.
- [ ] **Externe / Propriétaire** — Vérifier l'éligibilité Google Business Profile ; rechercher une fiche existante avant création/revendication, puis suivre la méthode de validation proposée.
- [ ] **Externe / Propriétaire** — Aligner nom, adresse, téléphone, catégorie réelle, horaires, site, réservation et photos ; reporter uniquement les profils vérifiés dans les liens du site.
- [ ] **Externe** — Selon le besoin : Bing Webmaster Tools, Bing Places et Apple Business Connect, sans créer de doublons.
- [ ] **Mixte** — Si demandé, définir et configurer mesure des conversions et trafic avec les choix de confidentialité appropriés ; vérifier les événements sans envoyer de données personnelles superflues.

## 9. Recette, publication et suivi

- [ ] **Dépôt** — Exécuter les contrôles disponibles et le build ; vérifier toutes les routes générées et les parcours représentatifs sur mobile/desktop.
- [ ] **Propriétaire** — Valider contenu, identité, médias et parcours avant publication selon le périmètre convenu.
- [ ] **Externe** — Déployer lorsque autorisé et vérifier la version effectivement servie, HTTPS, liens, formulaires, réservation, sitemap et robots en production.
- [ ] **Mixte** — Mesurer performances et accessibilité sur le site livré ; distinguer laboratoire, terrain et contrôles manuels. Enregistrer les problèmes dans todo.md.
- [ ] **Propriétaire** — Recevoir les accès nécessaires et une démonstration de Forge, publication, contact et réservation ; documenter qui maintient quoi.
- [ ] **Mixte** — Documenter restauration/retour arrière, renouvellements, rotation des accès, mises à jour, contrôle des liens et suivi des contenus ; planifier selon le besoin convenu.

## Repères pour ce dépôt

La configuration consultée active les imports articles et FAQ et désactive les avis ; ne pas réappliquer les anciennes consignes « FAQ off ». todo.md contient déjà des confirmations de fiche Google Business, adresse et horaires : les conserver et ne pas les présenter comme manquantes. Ces repères ne remplacent pas une vérification de production.

L'ancienne checklist détaillée (identité visuelle, photographies, configuration historique) est conservée dans [l'archive](docs/archive/launch-tasks-legacy.md), explicitement non prescriptive. Vérifier ses informations avant réutilisation.

Références externes : [domaine GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [création ou revendication Google Business](https://support.google.com/business/answer/2911778?hl=fr). Consulter les procédures actuelles au moment de l'action.
