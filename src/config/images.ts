/**
 * Bibliothèque d’images du site.
 *
 * ⚠️ Les fichiers actuels sont des ILLUSTRATIONS DE DÉMONSTRATION générées
 * pour la maquette : ce ne sont pas des photos de Mamia Lagoon.
 * Pour publier, remplacez chaque fichier de src/assets/images/ par une
 * photographie officielle et autorisée (même nom ou nouvel import),
 * mettez à jour le texte `alt`, puis passez `demo` à `false`.
 */
import type { StaticImageData } from "next/image";

import heroLagune from "@/assets/images/hero-lagune.webp";
import lagunMatin from "@/assets/images/lagune-matin.webp";
import lagunCrepuscule from "@/assets/images/lagune-crepuscule.webp";
import dejeunerBordEau from "@/assets/images/dejeuner-bord-eau.webp";
import assietteIvoirienne from "@/assets/images/assiette-ivoirienne.webp";
import assietteGourmande from "@/assets/images/assiette-gourmande.webp";
import tablePartage from "@/assets/images/table-partage.webp";
import dinerRomantique from "@/assets/images/diner-romantique.webp";
import ambianceBougies from "@/assets/images/ambiance-bougies.webp";
import entree from "@/assets/images/entree-mamia-lagoon.webp";
import enseigne from "@/assets/images/enseigne.webp";
import sallePaillote from "@/assets/images/salle-paillote.webp";
import barLounge from "@/assets/images/bar-lounge.webp";
import facadeRue from "@/assets/images/facade-rue.webp";

export type SiteImage = {
  src: StaticImageData;
  alt: string;
  /** `true` tant que l’image n’est pas une photo officielle du restaurant. */
  demo: boolean;
};

const demo = (src: StaticImageData, alt: string): SiteImage => ({
  src,
  alt: `Illustration de démonstration : ${alt}`,
  demo: true,
});

/** Photo réelle fournie par le restaurant. */
const real = (src: StaticImageData, alt: string): SiteImage => ({ src, alt, demo: false });

const photos = {
  salle: real(
    sallePaillote,
    "La salle de Mamia Lagoon sous sa charpente en bois et son toit de paille, avec ses tables dressées de nappes blanches et ses lanternes colorées",
  ),
  lounge: real(
    barLounge,
    "Le bar-lounge de Mamia Lagoon : fauteuils club orange autour de tables basses en bois, comptoir en bambou et fresque tropicale",
  ),
  facade: real(
    facadeRue,
    "La façade de Mamia Lagoon vue de la rue : l’enseigne au soleil couchant, les palmiers et les toits de paille",
  ),
  enseigne: real(enseigne, "L’enseigne de Mamia Lagoon : un soleil couchant sur la lagune, avec les numéros du bar et du restaurant"),
  entree: real(
    entree,
    "L’entrée de Mamia Lagoon à Grand-Bassam : l’enseigne au logo du soleil couchant sur la lagune, encadrée de palmiers, et les paillotes du restaurant derrière le portail",
  ),
};

export const images = {
  hero: demo(heroLagune, "la lagune au coucher du soleil, encadrée de palmiers"),
  about: photos.salle,
  aboutDetail: photos.enseigne,

  cuisineIvoirienne: demo(assietteIvoirienne, "une assiette de poisson braisé accompagné d’attiéké et d’alloco"),
  cuisineGourmande: demo(assietteGourmande, "une assiette dressée avec soin sur une vaisselle sombre"),
  cuisinePartage: demo(tablePartage, "plusieurs plats colorés disposés sur une table en bois"),

  experienceDejeuner: demo(dejeunerBordEau, "la lagune en plein jour, bordée de palmiers"),
  experienceDiner: demo(dinerRomantique, "une table pour deux éclairée à la bougie"),
  experienceFamille: photos.lounge,

  location: photos.entree,
};

export type GalleryCategory = "restaurant" | "lagune" | "assiettes" | "ambiance";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "restaurant", label: "Le restaurant" },
  { id: "lagune", label: "La lagune" },
  { id: "assiettes", label: "Nos assiettes" },
  { id: "ambiance", label: "L’ambiance" },
];

/** 8 visuels — l’ordre définit la composition asymétrique de la grille. */
export const gallery: (SiteImage & { category: GalleryCategory })[] = [
  { ...photos.lounge, category: "ambiance" },
  { ...photos.facade, category: "restaurant" },
  { ...photos.salle, category: "restaurant" },
  { ...demo(ambianceBougies, "deux verres et une bougie sur une nappe ivoire"), category: "ambiance" },
  { ...demo(lagunMatin, "la lagune dans la lumière douce du matin"), category: "lagune" },
  { ...demo(assietteIvoirienne, "une assiette de poisson braisé et d’attiéké"), category: "assiettes" },
  { ...demo(lagunCrepuscule, "la lagune au crépuscule"), category: "lagune" },
  { ...demo(assietteGourmande, "une assiette gastronomique dressée"), category: "assiettes" },
];
