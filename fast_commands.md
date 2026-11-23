# Commandes rapides — SEO, GEO et accessibilité

Les `/` ci-dessous invoquent les skills, qui appliquent le workflow des agents correspondants. Ce sont des instructions pour l'assistant, pas des commandes terminal. Cursor documente l'invocation `/nom-du-skill` depuis les skills partagés. L'autocomplétion et la syntaxe des autres clients dépendent de leur version : si le raccourci n'est pas reconnu, copier le prompt explicite ci-dessous. Ce fichier seul n'enregistre pas une commande native dans chaque outil.

| Commande | Agent associé | Résultat |
| --- | --- | --- |
| `/seo-geo-accessibility-audit` | `seo-geo-accessibility-auditor` | Audit du site et deux checklists actualisées dans todo.md : corrections du dépôt et interventions du propriétaire. |
| `/seo-geo-accessibility-fix` | `seo-geo-accessibility-fixer` | Corrections des tâches réalisables, validation et cases cochées avec preuves. |

## Auditer le site

```text
/seo-geo-accessibility-audit Audite le site actuel dans toutes ses langues publiées. Examine le code, le rendu et la production si accessible. Actualise les deux checklists de todo.md sans modifier le code. Indique les contrôles non réalisés.
```

Prompt indépendant de la syntaxe du client : « Utilise l'agent seo-geo-accessibility-auditor, ou lis .agents/skills/seo-geo-accessibility-audit/SKILL.md et exécute ce workflow dans cette session. »

## Réaliser les corrections

```text
/seo-geo-accessibility-fix Réalise toutes les tâches SGA exécutables de todo.md. Vérifie chaque critère avant de cocher. Continue les tâches indépendantes si une information manque. Ne déploie pas.
```

Prompt indépendant : « Utilise l'agent seo-geo-accessibility-fixer, ou lis .agents/skills/seo-geo-accessibility-fix/SKILL.md et exécute ce workflow. »

Pour cibler : « Traite uniquement SGA-003 et SGA-005. » Pour reprendre : « J'ai confirmé EXT-002 ; réalise les tâches dépendantes. » La confirmation doit contenir les informations nécessaires, pas seulement un numéro.

## Vérifier après correction

```text
/seo-geo-accessibility-audit Vérifie les tâches SGA terminées et les régressions liées. Conserve leurs identifiants et preuves ; rouvre celles dont le critère échoue. Ne duplique pas les tâches.
```

## Construire une page

Les règles s'appliquent déjà via AGENTS.md, sans commande spéciale :

```text
Construis la homepage selon le brief et les règles SEO_GEO_ACCESSIBILITY.md. Respecte sémantique, hiérarchie des titres, clavier, focus, langues et métadonnées. Ne crée que les fonctionnalités demandées.
```

## Préparer la livraison

```text
Parcours tasks.md, rapproche-le des preuves du dépôt et de todo.md. Indique ce qui est prêt, ce qui reste à vérifier et les actions externes qui me reviennent. Ne déploie pas et ne modifie aucun compte externe.
```

Les anciens reviewers spécialisés restent disponibles pour une revue ciblée en lecture seule ; ils ne remplacent pas l'auditeur qui écrit dans todo.md.

Référence de syntaxe : [skills Cursor](https://cursor.com/help/customization/skills). Les profils sont enregistrés dans .codex/agents, .cursor/agents et .github/agents ; Antigravity peut utiliser les workflows des skills partagés.
