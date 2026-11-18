# Icônes du site (`public/favicons/`)

Fichiers servis tels quels. Référencés dans `src/layouts/Layout.astro` et `public/site.webmanifest`.

| Fichier | Usage |
| --- | --- |
| `favicon.ico` | ICO multi-tailles (16–64 px), navigateurs classiques |
| `favicon-16x16.png`, `favicon-32x32.png` | Fallback PNG explicite |
| `apple-touch-icon.png` | Écran d’accueil iOS / iPadOS (180×180) |
| `android-chrome-192x192.png`, `android-chrome-512x512.png` | Manifest PWA |
| `icon-maskable-512x512.png` | Icône adaptative Android (zone sûre) |

Marque carrée : `src/assets/images/brand/laure_corrao_icon.png` (header et footer, redimensionnée au build). Le JSON-LD référence `public/images/laure_corrao_icon-512.png`.