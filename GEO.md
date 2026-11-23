# GEO — visibilité dans les moteurs génératifs

GEO signifie ici Generative Engine Optimization, pas référencement géographique. Appliquer aux demandes de visibilité/citation dans les réponses IA et aux modifications de llms.txt ou de politiques de robots IA. Lire [SEO.md](SEO.md) ; les règles SEO et de langue restent communes. Aucun fichier, balisage ou accès robot ne garantit une citation.

## Contenu et architecture

- Identifier les questions réelles du public, les langues et les pages pertinentes. Rendre explicites activité, public, prestations, limites et coordonnées à partir des faits disponibles. Ne pas inventer expertise, résultats, témoignages, sources ou distinctions.
- Rédiger des réponses autonomes et précises dans les pages existantes, avec titres et listes/tableaux lorsque cela facilite la lecture. Ajouter source, auteur et date quand ils sont pertinents et vérifiables. Ne pas transformer systématiquement tout le site en FAQ.
- Conserver le contenu principal dans le HTML accessible aux visiteurs. Éviter contenu alternatif trompeur pour robots, instructions cachées aux modèles et multiplication de pages destinées uniquement aux moteurs.
- Utiliser les mêmes données métier, traductions Forge et URLs publiées que le reste du site. Ne jamais traduire des articles Forge ou inventer des relations entre traductions pour le GEO.

## Crawl et fichiers

Google indique que ses fonctions IA ne nécessitent aucun fichier IA ni schéma spécifique supplémentaire. Pour les autres fournisseurs, vérifier leur documentation avant de présenter une technique comme prise en charge.

Distinguer recherche, entraînement et accès déclenché par un utilisateur. Chez OpenAI, OAI-SearchBot concerne la recherche, GPTBot l'entraînement et ChatGPT-User certains accès utilisateur ; les politiques ne sont pas interchangeables. Préserver les préférences du propriétaire. Une demande de visibilité ne vaut pas autorisation d'ouvrir l'entraînement. Vérifier aussi les blocages CDN/hébergement ; robots.txt ne protège pas des données privées.

llms.txt est facultatif : maintenir celui du projet s'il est concerné, sans le présenter comme une exigence moteur. Le générer depuis les contenus publics et URLs canoniques, avec base path et langues corrects ; exclure secrets, brouillons, traductions absentes et affirmations supplémentaires. Ne pas ajouter llms-full.txt ou une autre copie complète sans besoin explicite et stratégie de mise à jour.

## Audit et mesure

Séparer : faits vérifiés dans le code/HTML, recommandations documentées par un fournisseur, hypothèses à tester. Pour mesurer une présence, enregistrer moteur, date, langue, requête, URL réellement citée et conditions disponibles. Une mention de marque n'est pas une citation ; une réponse unique n'est pas une mesure stable. Ne pas attribuer une évolution à un changement sans preuve. Si aucun accès aux moteurs ou données analytiques n'est disponible, produire un audit technique et éditorial, sans inventer de score GEO.

## Références

Consultées le 19 novembre 2026 ; revérifier avant tout changement de politique :
- [Google — fonctions IA](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI — robots et usages distincts](https://developers.openai.com/api/docs/bots)
