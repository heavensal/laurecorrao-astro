# Accessibilité — règle commune

Appliquer lors de la création ou modification d'interface, navigation, formulaire, média et contenu interactif. Cible d'ingénierie : WCAG 2.2 niveau AA ; ne pas annoncer une conformité complète à partir d'un contrôle partiel. Cette règle ne constitue pas un audit du site actuel.

## Construction

- Privilégier HTML natif, landmarks, titres hiérarchisés, liens pour naviguer et boutons pour agir. Donner un nom accessible aux contrôles, y compris aux icônes seules. Prévoir un accès direct au contenu principal.
- Rendre tous les parcours utilisables au clavier, avec ordre logique et focus visible non masqué. Tester les menus, accordéons, sélecteurs de langue et fenêtres modales ; gérer entrée, sortie et retour du focus. Aucun piège clavier hors du comportement temporaire approprié d'une modale ouverte.
- Associer labels, aides et erreurs aux champs. Préserver les saisies après erreur, annoncer les états asynchrones pertinents et proposer une correction compréhensible. Ne pas utiliser uniquement couleur ou placeholder pour transmettre une information.
- Donner aux images informatives une alternative contextualisée, aux décorations une alternative vide ; prévoir les alternatives nécessaires aux médias audio/vidéo. Déclarer la langue de la page et les changements de langue significatifs.
- Vérifier contraste, zoom, reflow, espacement du texte et taille des cibles selon les critères et exceptions WCAG applicables. Tester notamment texte à 200 % et largeur de 320 CSS px ; ne pas masquer un débordement pour dissimuler une perte de contenu.
- Respecter la préférence de mouvement réduit, éviter les animations gênantes et fournir les commandes nécessaires pour les contenus animés. Éviter les interactions accessibles seulement au survol ou au glisser-déposer.
- Examiner les widgets tiers de réservation, captcha et consentement dans le parcours réel. Si un obstacle ne peut être corrigé dans le composant tiers, proposer une alternative fonctionnelle et décrire la limite.

## Validation

Combiner analyse automatisée disponible, parcours clavier et vérifications manuelles visuelles. Pour un audit, inclure une vérification au lecteur d'écran des parcours critiques lorsque l'environnement le permet ; sinon la déclarer non réalisée. Couvrir les états fermé/ouvert, erreur/succès, mobile/desktop et les langues publiées touchées.

Chaque problème doit donner la page ou le composant, les étapes, l'impact utilisateur, une preuve, le critère WCAG pertinent et la correction proposée. Ne pas inventer un numéro de critère : vérifier la référence. Un score Lighthouse/axe ne vaut pas déclaration de conformité. La liste ci-dessus est un socle de développement, pas l'ensemble des critères A et AA ; un audit de conformité doit couvrir tous ceux applicables au périmètre annoncé.

## Références

Consultées le 19 novembre 2026 : [WCAG 2.2](https://www.w3.org/TR/WCAG22/) et [guide de vérification W3C](https://www.w3.org/WAI/WCAG22/quickref/). Les exigences normatives et leurs exceptions priment sur les raccourcis de cette règle.
