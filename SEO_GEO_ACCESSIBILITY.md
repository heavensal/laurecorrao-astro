# SEO, GEO et accessibilité — construire, auditer, corriger

Nom du workflow : `seo-geo-accessibility`. Ce document relie les règles [SEO](SEO.md), [accessibilité](ACCESSIBILITY.md) et [GEO](GEO.md), qui restent les références détaillées.

## 1. Pendant le développement

Appliquer les exigences pertinentes sans attendre une demande d'audit : HTML natif et sémantique, un titre principal clair par page selon la convention du projet, titres de sections hiérarchisés sans choisir leur niveau pour leur taille visuelle, landmarks, liens et boutons appropriés, alternatives d'images, labels, clavier, focus et contrastes. Prévoir contenu lisible dans le HTML, langue correcte, métadonnées et URLs cohérentes, faits vérifiables et données structurées conformes au contenu visible. Lire les règles détaillées concernées et les règles de fonctionnalités avant de coder. Ne pas confondre GEO et SEO géographique.

Ces règles s'appliquent aux changements demandés ; elles n'autorisent pas à migrer tout le site ni à ajouter une fonctionnalité absente. Elles ne garantissent pas conformité, classement ou citations IA.

## 2. Audit du site actuel

Skill : `seo-geo-accessibility-audit`. Agent : `seo-geo-accessibility-auditor`.

Inventorier toutes les routes publiées et langues, puis contrôler chaque gabarit, les pages particulières et les parcours interactifs. Distinguer vérifications exhaustives et échantillonnage. Examiner code, HTML généré et production si accessible ; annoncer les limites. Consigner date, révision/contexte, URLs, outils, états testés et contrôles non réalisables. Pas de score inventé ni de conclusion « complet » si des contrôles nécessaires restent indisponibles.

L'auditeur peut modifier les deux sections dédiées de [todo.md](todo.md), mais pas le code du site. Préserver les autres tâches et leur historique. Ne pas transformer une absence d'accès en preuve d'absence d'une fiche Google ou d'une configuration.

### Format des tâches

Deux checklists : « SEO / GEO / Accessibilité — Corrections dans le dépôt » et « SEO / GEO / Accessibilité — Intervention du propriétaire ».

Chaque tâche comporte : identifiant stable `SGA-001` ou `EXT-001`, priorité P0 (blocage critique), P1 (impact important), P2 (amélioration), domaine(s), état, preuve et emplacement, action, responsable, dépendances et critère d'acceptation vérifiable. L'état reste explicite : à faire, en cours, bloqué, à vérifier, terminé ou non applicable (motif requis). La case n'est cochée que pour une tâche terminée et vérifiée ; une tâche non applicable reste identifiée séparément.

Une nouvelle passe recherche les équivalents dans tout todo.md avant d'ajouter une tâche. Réutiliser l'identifiant, conserver les preuves de clôture, rouvrir une régression en l'expliquant et ne jamais écraser les décisions du propriétaire. Référencer les tâches métier existantes plutôt que les dupliquer. Séparer une information externe manquante de son intégration dans le dépôt et relier leurs identifiants.

## 3. Corrections et vérification

Skill : `seo-geo-accessibility-fix`. Agent : `seo-geo-accessibility-fixer`.

Exécuter les tâches autorisées du dépôt, par priorité et dépendances. Vérifier d'abord que le problème existe toujours. Cocher uniquement après satisfaction des critères ; ajouter fichiers modifiés, contrôle effectué, résultat et date. Une modification locale ne prouve ni déploiement ni résolution en production. Les tâches dont le critère exige la production restent à vérifier jusqu'au contrôle réel.

Continuer les tâches indépendantes lorsqu'une information manque. Documenter les blocages précis ; ne pas inventer horaires, identité, témoignages, accès ou secrets. Une demande de correction du dépôt n'autorise ni achat, ni publication, ni modification de comptes externes. Respecter les autorisations déjà données sans les redemander.

Une nouvelle passe d'audit peut vérifier les corrections sans les modifier. Ne pas lancer automatiquement des agents supplémentaires : utiliser le rôle demandé ou le skill dans la session courante selon les capacités du client.

## Documents de suivi

- [tasks.md](tasks.md) : parcours général de création, amélioration et livraison ; les cases décrivent une recette à vérifier, pas un audit déjà réalisé.
- [todo.md](todo.md) : problèmes et actions concrets du site, preuves et suivi.
- [fast_commands.md](fast_commands.md) : invocations et exemples en français.
