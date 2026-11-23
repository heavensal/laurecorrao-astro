# SEO — règle commune

Source de vérité pour les assistants. Appliquer à la création et aux modifications de routes, métadonnées, contenu indexable et données structurées. Lire aussi [MULTILANG.md](MULTILANG.md) et les règles des fonctionnalités concernées. Enregistrer cette règle ne migre pas le site existant.

## Décisions avant implémentation

Identifier domaine public, éventuel base path, environnement, langues publiées, pages demandées et données métier disponibles. Réutiliser les sources existantes. Ne pas créer de blog, FAQ, avis ou pages locales uniquement pour le SEO. Ne pas inventer adresse, qualifications, prix, avis ou zones desservies.

## Implémentation

- Centraliser les métadonnées dans le layout et les données des pages, sans recopier les balises dans chaque composant. Fournir titre et description pertinents dans la langue de la page, canonical absolue, partage social et image adaptée si disponible.
- Construire les URLs avec le même utilitaire tenant compte du domaine et du base path. Préserver les conventions de slash du projet. Les pages traduites ont leur propre canonical ; les hreflang réciproques ne ciblent que les traductions publiées et disponibles.
- Pour les articles, utiliser les relations et URLs de traduction Forge selon [BLOG.md](BLOG.md), jamais une égalité de slugs.
- Partager le jeu de pages publiées entre routes, liens, sitemap et alternates. Exclure du sitemap redirections, erreurs, brouillons et pages noindex. Ne renseigner lastmod que depuis une modification réelle du contenu, pas depuis la date du build.
- Prévoir vrais statuts HTTP et redirections permanentes lorsque l'hébergement le permet. Vérifier leur comportement déployé ; une redirection HTML ne prouve pas un HTTP 301. Éviter chaînes, boucles, liens morts et soft 404.
- Protéger les previews de l'indexation avec les moyens de l'hébergement. Ne pas propager leur noindex en production. robots.txt n'est ni un contrôle d'accès ni un moyen fiable de désindexer une page déjà connue ; permettre le crawl nécessaire à la lecture d'un noindex.
- Rendre le contenu principal et les liens navigables dans le HTML Astro généré. Utiliser titres structurés, ancres descriptives et liens internes utiles. Éviter pages satellites, répétitions de mots-clés et contenu caché pour les moteurs.
- Générer le JSON-LD depuis les mêmes faits que le contenu visible. Choisir un type pertinent, des identifiants stables et une sérialisation sûre. Respecter [FAQ.md](FAQ.md) et [REVIEWS.md](REVIEWS.md) ; vérifier l'éligibilité actuelle de chaque résultat enrichi avant de le promettre.
- Dimensionner les médias, fournir des tailles responsives et limiter le JavaScript. Ne pas lazy-loader l'image principale visible immédiatement. Mesurer les performances avant d'annoncer une amélioration ; distinguer données de laboratoire et données terrain.

## Vérification

Inspecter le HTML généré d'au moins une page par gabarit et langue touchés : métadonnées, canonical, alternates, liens, JSON-LD et absence de secrets. Vérifier sitemap/robots, URLs et statuts sur l'environnement disponible. Exécuter les contrôles existants pertinents sans ajouter une dépendance uniquement pour cette règle. Les outils de validation du balisage ne garantissent ni affichage enrichi ni classement. Indiquer précisément les vérifications non réalisées.

## Références

Consulter les sources actuelles avant de modifier une politique moteur. Références consultées le 19 novembre 2026 :
- [Google — données structurées](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google — fonctions IA et SEO](https://developers.google.com/search/docs/appearance/ai-features)
- [Astro — routage](https://docs.astro.build/en/guides/routing/)
