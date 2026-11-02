# Mamia Lagoon — site vitrine

Landing page du restaurant **Mamia Lagoon** (Grand-Bassam, Côte d’Ivoire) : « L’élégance au fil de l’eau ».

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide React.

## Lancer le site en local

```bash
npm install
npm run dev        # http://localhost:3000
```

Contrôles :

```bash
npx tsc --noEmit   # TypeScript
npm run lint       # ESLint
npm run build      # build de production
npm start          # sert le build
```

## Où modifier quoi

| Élément | Fichier |
| --- | --- |
| Nom, téléphone, WhatsApp, adresse, horaires, réseaux, menu PDF, créneaux de réservation | `src/config/restaurant.ts` |
| Images (hero, sections, galerie) et textes `alt` | `src/config/images.ts` + `src/assets/images/` |
| Image de partage (Open Graph) | `src/app/opengraph-image.jpg` (1200×630) |
| Couleurs, polices, boutons | `src/app/globals.css` |
| Sections de la page | `src/components/*.tsx` |
| Mentions légales / confidentialité | `src/app/mentions-legales`, `src/app/confidentialite` |

## Avant publication : checklist

- [ ] **Téléphone** : confirmer `+225 07 15 44 15 84` avec le restaurant, puis `contact.phoneVerified: true` (il apparaîtra alors aussi dans les données structurées Google).
- [ ] **Photos** : les visuels actuels sont des **illustrations de démonstration** générées pour la maquette. Remplacer chaque fichier de `src/assets/images/` par une photo officielle et autorisée (WebP ou JPEG, ~2000 px de large suffit ; Next.js sert automatiquement de l’AVIF/WebP), mettre à jour l’`alt` et passer `demo: false` dans `src/config/images.ts`.
- [ ] **Horaires** : renseigner `openingHours` (le champ `schema` alimente Google).
- [ ] **Adresse précise** et coordonnées GPS (`address.street`, `address.geo`).
- [ ] **Carte** : déposer le PDF dans `public/` et renseigner `menuPdf` (sinon la carte provisoire s’affiche). La « marmite du pêcheur » n’est citée que comme piste à valider.
- [ ] **Créneaux** de réservation selon les horaires réels (`reservation.timeSlots`).
- [x] **Réseaux sociaux** : TikTok @mamia.lagoon ajouté (`socials`) — ajouter Instagram/Facebook s'ils existent.
- [ ] **Logo** officiel (le logotype actuel est typographique : `src/components/ui/Logo.tsx`).
- [ ] **Mentions légales** : compléter les champs entre crochets.
- [ ] Passer `previewMode: false` pour retirer le bandeau de prévisualisation.

## Réservation

Le formulaire valide les champs (date à venir, horaire non passé, téléphone plausible) puis ouvre WhatsApp avec un message prérempli vers le numéro de `restaurant.ts`. Aucune donnée n’est stockée ; le site indique clairement que la réservation n’est confirmée qu’après réponse du restaurant.

## Déployer sur Vercel

1. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt GitHub `mamia-lagoon` (framework détecté : Next.js, aucun réglage requis).
2. Dans *Settings → Environment Variables*, ajouter `NEXT_PUBLIC_SITE_URL` = l’URL finale (ex. `https://www.votre-domaine.ci`). Sans elle, l’URL de production Vercel est utilisée pour le sitemap, le canonical et l’Open Graph.
3. *Settings → Domains* pour brancher le nom de domaine.

Chaque push sur `main` redéploie automatiquement ; chaque pull request obtient une URL de prévisualisation.
