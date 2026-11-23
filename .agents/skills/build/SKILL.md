---
name: build
description: "Afficher le catalogue des commandes build du dépôt ou orienter une demande vers le workflow explicitement choisi."
---

# build

Lire [fast_commands.md](../../../fast_commands.md).

- Si la demande est seulement `/build`, `$build` ou une demande de menu, afficher en français les commandes `/build-*` disponibles avec une courte description et un exemple. Ne modifier aucun fichier et ne lancer ni build, ni audit, ni agent.
- Si un workflow est explicitement choisi, lire son skill cible et appliquer la demande et ses limites. Si le choix est ambigu, présenter les options pertinentes et demander laquelle utiliser.
- Les commandes de terminal restent distinctes ; ce menu n'autorise pas leur exécution automatique.
- Ne pas promettre un sous-menu natif : la découverte et le filtrage des skills dépendent du client. Le menu textuel s'affiche après envoi de la commande.
