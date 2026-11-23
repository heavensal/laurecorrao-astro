# Commandes rapides — tous les workflows du dépôt

Les `/` ci-dessous invoquent les skills, qui appliquent le workflow des agents correspondants. Ce sont des instructions pour l'assistant, pas des commandes terminal. Cursor documente l'invocation `/nom-du-skill` depuis les skills partagés. L'autocomplétion et la syntaxe des autres clients dépendent de leur version : si le raccourci n'est pas reconnu, copier le prompt explicite ci-dessous. Les skills correspondants sont enregistrés dans `.agents/skills/build*/SKILL.md` ; ce guide ne configure pas les interfaces des clients.

Ce catalogue couvre tous les skills et agents propres au dépôt, sans répéter les copies d'un même skill entre outils. Les commandes intégrées aux applications et les plugins personnels ne sont pas des commandes du projet. Lors de l'ajout ou du renommage d'un skill ou agent du dépôt, actualiser ce catalogue.

## Ouvrir le catalogue

Tape `/build` pour rechercher les entrées préfixées `build-` dans le sélecteur de skills du client. Envoie `/build` seul pour demander à l'assistant d'afficher le catalogue en français, sans exécuter de tâche.

Les entrées `/build-*` sont de vrais skills du dépôt qui renvoient aux workflows existants. Ce n'est pas un sous-menu `/build commande`. L'apparition des suggestions dépend du client et de son rechargement des skills ; elle n'a pas été vérifiée dans chaque application. Si nécessaire, ouvre une nouvelle conversation ou utilise une mention de skill prise en charge par ton client.

Exemples : `/build-language`, `/build-forge-ressources`, `/build-seo-geo-accessibility-audit`.

## Langues, blog, FAQ et avis

| Commande | Description | Exemple de prompt |
| --- | --- | --- |
| `/build-language` | Configurer les langues, les contenus et les URLs selon MULTILANG.md. | `/build-language Crée ce nouveau site en français uniquement, sans i18n ni sélecteur de langue.` |
| `/build-forge-ressources` | Intégrer ou modifier les imports Forge du blog, de la FAQ et des avis. | `/build-forge-ressources Ajoute un blog français et anglais avec les traductions, URLs et relations d'articles fournies par Forge.` |
| `/build-faq-forge-local` | Créer une FAQ optionnelle avec de vraies questions/réponses locales adaptées au contexte et remplacement par Forge. | `/build-faq-forge-local Ajoute une FAQ sur les prestations du site avec des réponses contextualisées et un fallback local par langue.` |

Autres exemples :

```text
/build-language Ajoute l'anglais au site existant. Applique MULTILANG.md aux dictionnaires, URLs et au sélecteur de langue, en préservant les pages françaises.

/build-forge-ressources Ajoute une section avis avec import Forge activé et fallback sur les avis locaux authentiques. Masque la section si aucune source authentique n'est disponible.

/build-forge-ressources Vérifie la connexion Forge existante et la configuration des imports au build. Réutilise cette connexion pour la FAQ et le blog, sans afficher de secrets.
```

Il n'existe pas de commande dédiée `/blog` ou `/reviews` dans ce dépôt : utiliser `/build-forge-ressources`, avec BLOG.md ou REVIEWS.md selon la demande. La connexion à une API existante ne signifie pas que le compte Forge, les accès et le webhook ont été provisionnés.

## SEO, GEO et accessibilité ciblés

| Commande | Description | Exemple de prompt |
| --- | --- | --- |
| `/build-technical-seo` | Implémenter ou auditer métadonnées, URLs, indexation et données structurées. | `/build-technical-seo Vérifie les canonical et le sitemap des pages publiées, puis corrige les incohérences dans le dépôt.` |
| `/build-accessibility` | Implémenter ou auditer sémantique, clavier, focus et interfaces accessibles. | `/build-accessibility Corrige le formulaire de contact et vérifie labels, erreurs et parcours clavier.` |
| `/build-geo` | Examiner ou améliorer le contenu citable, llms.txt et les politiques de robots IA. | `/build-geo Audite en lecture seule le contenu et llms.txt. Sépare problèmes démontrés et hypothèses, sans modifier la politique des robots.` |

Pour invoquer un agent spécialisé en lecture seule, utiliser un prompt explicite. Les noms d'agents ne sont pas automatiquement des commandes `/` :

| Agent | Description | Exemple de prompt |
| --- | --- | --- |
| `seo-reviewer` | Audit SEO ciblé sans modification. | « Utilise seo-reviewer pour auditer les métadonnées des pages services. » |
| `accessibility-reviewer` | Audit accessibilité ciblé sans modification. | « Utilise accessibility-reviewer pour examiner le menu et le formulaire, avec preuves et limites de vérification. » |
| `geo-reviewer` | Audit GEO ciblé sans modification. | « Utilise geo-reviewer pour examiner le contenu français et les accès robots IA. » |

## Audit et corrections réunis

| Commande | Agent associé | Résultat |
| --- | --- | --- |
| `/build-seo-geo-accessibility-audit` | `seo-geo-accessibility-auditor` | Audit du site et deux checklists actualisées dans todo.md : corrections du dépôt et interventions du propriétaire. |
| `/build-seo-geo-accessibility-fix` | `seo-geo-accessibility-fixer` | Corrections des tâches réalisables, validation et cases cochées avec preuves. |

## Auditer le site

```text
/build-seo-geo-accessibility-audit Audite le site actuel dans toutes ses langues publiées. Examine le code, le rendu et la production si accessible. Actualise les deux checklists de todo.md sans modifier le code. Indique les contrôles non réalisés.
```

Prompt indépendant de la syntaxe du client : « Utilise l'agent seo-geo-accessibility-auditor, ou lis .agents/skills/build-seo-geo-accessibility-audit/SKILL.md et exécute ce workflow dans cette session. »

## Réaliser les corrections

```text
/build-seo-geo-accessibility-fix Réalise toutes les tâches SGA exécutables de todo.md. Vérifie chaque critère avant de cocher. Continue les tâches indépendantes si une information manque. Ne déploie pas.
```

Prompt indépendant : « Utilise l'agent seo-geo-accessibility-fixer, ou lis .agents/skills/build-seo-geo-accessibility-fix/SKILL.md et exécute ce workflow. »

Pour cibler : « Traite uniquement SGA-003 et SGA-005. » Pour reprendre : « J'ai confirmé EXT-002 ; réalise les tâches dépendantes. » La confirmation doit contenir les informations nécessaires, pas seulement un numéro.

## Vérifier après correction

```text
/build-seo-geo-accessibility-audit Vérifie les tâches SGA terminées et les régressions liées. Conserve leurs identifiants et preuves ; rouvre celles dont le critère échoue. Ne duplique pas les tâches.
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

## Si une commande n'est pas reconnue

Utiliser : « Lis `.agents/skills/<nom>/SKILL.md` et applique ce workflow à la demande suivante : … ». Remplacer `<nom>` par le nom de la commande sans `/`. Pour un agent indisponible, appliquer le mode correspondant du skill dans la session courante ; ne pas prétendre avoir lancé un agent.

## Commandes de développement — terminal

Ces commandes techniques sont distinctes des invocations `/` de l'assistant. Les lancer depuis la racine du dépôt.

| Commande | Description | Exemple de demande à l'IA |
| --- | --- | --- |
| `pnpm install` | Installer les dépendances du projet. | « Installe les dépendances pour travailler sur le site. » |
| `pnpm exec astro dev --background` | Démarrer le serveur de développement en arrière-plan selon AGENTS.md. | « Démarre le site en arrière-plan et donne-moi son URL. » |
| `pnpm exec astro dev status` | Consulter l'état du serveur. | « Vérifie si le serveur de développement tourne. » |
| `pnpm exec astro dev logs` | Lire ses journaux. | « Examine les erreurs du serveur sans afficher de secrets. » |
| `pnpm exec astro dev stop` | Arrêter le serveur en arrière-plan. | « Arrête le serveur de développement. » |
| `pnpm build` | Générer le site ; peut appeler Forge selon les flags et accès configurés. | « Vérifie que le build passe et explique les erreurs éventuelles. » |
| `pnpm preview` | Prévisualiser un build déjà généré. | « Prévisualise le dernier build pour vérifier le rendu de production localement. » |

La publication dépend du workflow GitHub Actions ; aucune commande `/deploy` propre au projet n'est définie ici.
