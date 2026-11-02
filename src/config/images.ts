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
import terrasseSoir from "@/assets/images/terrasse-soir.webp";
import terrasseLarge from "@/assets/images/terrasse-large.webp";
import jardin from "@/assets/images/jardin-verdoyant.webp";
import assietteIvoirienne from "@/assets/images/assiette-ivoirienne.webp";
import assietteGourmande from "@/assets/images/assiette-gourmande.webp";
import tablePartage from "@/assets/images/table-partage.webp";
import tablePartageLarge from "@/assets/images/table-partage-large.webp";
import dinerRomantique from "@/assets/images/diner-romantique.webp";
import ambianceBougies from "@/assets/images/ambiance-bougies.webp";

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

export const images = {
  hero: demo(heroLagune, "la lagune au coucher du soleil, encadrée de palmiers"),
  about: demo(terrasseSoir, "une terrasse éclairée de guirlandes lumineuses à la tombée de la nuit"),
  aboutDetail: demo(jardin, "un feuillage tropical dense et verdoyant"),

  cuisineIvoirienne: demo(assietteIvoirienne, "une assiette de poisson braisé accompagné d’attiéké et d’alloco"),
  cuisineGourmande: demo(assietteGourmande, "une assiette dressée avec soin sur une vaisselle sombre"),
  cuisinePartage: demo(tablePartage, "plusieurs plats colorés disposés sur une table en bois"),

  experienceDejeuner: demo(dejeunerBordEau, "la lagune en plein jour, bordée de palmiers"),
  experienceDiner: demo(dinerRomantique, "une table pour deux éclairée à la bougie"),
  experienceFamille: demo(tablePartageLarge, "une table garnie de plats à partager"),

  location: demo(lagunCrepuscule, "la lagune au crépuscule"),
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
  { ...demo(terrasseLarge, "une terrasse dressée face à la nature"), category: "restaurant" },
  { ...demo(lagunMatin, "la lagune dans la lumière douce du matin"), category: "lagune" },
  { ...demo(assietteIvoirienne, "une assiette de poisson braisé et d’attiéké"), category: "assiettes" },
  { ...demo(ambianceBougies, "deux verres et une bougie sur une nappe ivoire"), category: "ambiance" },
  { ...demo(jardin, "un jardin tropical verdoyant"), category: "restaurant" },
  { ...demo(assietteGourmande, "une assiette gastronomique dressée"), category: "assiettes" },
  { ...demo(lagunCrepuscule, "la lagune au crépuscule"), category: "lagune" },
  { ...demo(terrasseSoir, "la terrasse illuminée le soir"), category: "ambiance" },
];
