/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURATION CENTRALE — MAMIA LAGOON
 * ─────────────────────────────────────────────────────────────
 *  Toutes les informations modifiables du site sont ici.
 *  Règle d'or : ne publier que des informations confirmées
 *  par le restaurant. Tant qu'un champ vaut `null`, le site
 *  affiche une mention « à confirmer » au lieu d'inventer.
 */

export type OpeningHours = {
  /** Libellé affiché, ex. « Mardi – Dimanche » */
  days: string;
  /** Libellé affiché, ex. « 12h00 – 23h00 » */
  hours: string;
  /** Pour les données structurées schema.org (optionnel) */
  schema?: { dayOfWeek: string[]; opens: string; closes: string };
};

export const restaurant = {
  name: "Mamia Lagoon",
  tagline: "L’élégance au fil de l’eau",
  shortDescription:
    "Restaurant au bord de la lagune à Grand-Bassam : une cuisine qui met à l’honneur les produits locaux, entre inspirations ivoiriennes et internationales, dans un cadre verdoyant et apaisant.",

  /** URL de production (sans slash final). Utilisée pour le SEO, le sitemap et l’Open Graph. */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  /**
   * Mode prévisualisation : affiche un bandeau rappelant que les visuels
   * et certaines informations sont provisoires. Passer à `false` avant publication.
   */
  previewMode: true,

  contact: {
    /** Numéro public trouvé en ligne — À VÉRIFIER avec le restaurant avant publication. */
    phoneDisplay: "+225 07 15 44 15 84",
    phoneE164: "+2250715441584",
    /** Numéro WhatsApp au format international, chiffres uniquement. */
    whatsapp: "2250715441584",
    /** Passer à `true` une fois le numéro confirmé par le restaurant.
     *  (Le même numéro figure sur l’enseigne « Restaurant » photographiée à l’entrée.) */
    phoneVerified: false,
    /** Numéro du bar, affiché sur l’enseigne à l’entrée. */
    barPhoneDisplay: "+225 05 64 32 38 38",
    barPhoneE164: "+2250564323838",
    email: null as string | null,
  },

  address: {
    /** Adresse précise à confirmer (rue, quartier). */
    street: null as string | null,
    locality: "Grand-Bassam",
    country: "Côte d’Ivoire",
    countryCode: "CI",
    /** Coordonnées GPS à renseigner si disponibles (améliore le SEO local). */
    geo: null as { latitude: number; longitude: number } | null,
  },

  maps: {
    placeId: "ChIJNUjZ2rADwg8Re3yl2wOH8S4",
    query: "Mamia Lagoon, Grand-Bassam, Côte d'Ivoire",
  },

  /** Horaires : laisser `null` tant qu’ils ne sont pas validés. */
  openingHours: null as OpeningHours[] | null,

  /** Chemin d’un menu PDF officiel placé dans /public (ex. "/menu-mamia-lagoon.pdf"). */
  menuPdf: null as string | null,

  /** Réseaux sociaux officiels — n’ajouter que des comptes confirmés. */
  socials: [
    { label: "TikTok", handle: "@mamia.lagoon", href: "https://www.tiktok.com/@mamia.lagoon" },
  ] as { label: string; handle: string; href: string }[],

  reservation: {
    /** Créneaux proposés dans le formulaire (à ajuster selon les horaires réels). */
    timeSlots: [
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
    ],
    maxGuests: 12,
  },

  servesCuisine: ["Ivoirienne", "Internationale"],
} as const;

export const navigation = [
  { href: "#accueil", label: "Accueil" },
  { href: "#univers", label: "Notre univers" },
  { href: "#carte", label: "La carte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#contact", label: "Contact" },
] as const;

/* ───────────── Liens dérivés (ne pas modifier) ───────────── */

const q = encodeURIComponent(restaurant.maps.query);

export const links = {
  tel: `tel:${restaurant.contact.phoneE164}`,
  telBar: `tel:${restaurant.contact.barPhoneE164}`,
  whatsapp: (text?: string) =>
    `https://wa.me/${restaurant.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
  mapsPlace: `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=${restaurant.maps.placeId}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}&destination_place_id=${restaurant.maps.placeId}`,
  mapsEmbed: `https://maps.google.com/maps?q=${q}&z=15&output=embed&hl=fr`,
};
