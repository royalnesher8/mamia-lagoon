"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, FileText, MessageCircle, X } from "lucide-react";
import { images, type SiteImage } from "@/config/images";
import { links, restaurant } from "@/config/restaurant";
import { DemoBadge } from "./ui/DemoBadge";
import { Modal } from "./ui/Modal";
import { ImageReveal, Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const cards: { title: string; text: string; image: SiteImage; offset: string }[] = [
  {
    title: "Saveurs ivoiriennes",
    text: "Les recettes et les produits du pays, cuisinés avec respect et générosité : le goût de l’authenticité.",
    image: images.cuisineIvoirienne,
    offset: "lg:mt-0",
  },
  {
    title: "Inspirations gourmandes",
    text: "Des influences venues d’ailleurs, une présentation soignée et des produits choisis pour leur fraîcheur.",
    image: images.cuisineGourmande,
    offset: "lg:mt-24",
  },
  {
    title: "Plaisirs à partager",
    text: "Des assiettes qui circulent, des conversations qui s’attardent : la table comme lieu de rencontre.",
    image: images.cuisinePartage,
    offset: "lg:mt-12",
  },
];

/** Catégories de la carte provisoire — à remplacer par la carte officielle. */
const provisionalMenu = [
  { title: "Entrées", note: "Sélection à communiquer par le restaurant" },
  { title: "Saveurs de la lagune", note: "Poissons et fruits de mer — détails à confirmer" },
  { title: "Plats ivoiriens", note: "Spécialités de la maison à confirmer" },
  { title: "Inspirations internationales", note: "Sélection à confirmer" },
  { title: "Desserts", note: "Sélection à confirmer" },
  { title: "Boissons & cocktails", note: "Carte à confirmer" },
];

export function Cuisine() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section id="carte" aria-labelledby="carte-title" className="relative bg-ivory-deep py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="carte-title"
            eyebrow="L’expérience gastronomique"
            title="Des saveurs qui éveillent les sens"
            intro="Fraîcheur des produits, diversité des inspirations et soin du dressage : chaque assiette raconte la rencontre entre le terroir ivoirien et l’art de recevoir."
          />
          <Reveal delay={0.15} className="shrink-0">
            {restaurant.menuPdf ? (
              <a href={restaurant.menuPdf} target="_blank" rel="noopener" className="btn-lagoon">
                <FileText className="size-4" aria-hidden="true" /> Découvrir la carte
                <span className="sr-only">(PDF, nouvel onglet)</span>
              </a>
            ) : (
              <button type="button" className="btn-lagoon" onClick={() => setMenuOpen(true)} aria-haspopup="dialog">
                Découvrir la carte <ArrowUpRight className="size-4" aria-hidden="true" />
              </button>
            )}
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:mt-24 lg:grid-cols-3 lg:gap-10">
          {cards.map((card, i) => (
            <li key={card.title} className={`group ${card.offset} ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              <ImageReveal className={`aspect-[4/5] ${i === 2 ? "sm:aspect-[16/9] lg:aspect-[4/5]" : ""}`} delay={i * 0.12}>
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1800ms] ease-luxe group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lagoon-deep/60 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute top-5 left-5 font-serif text-lg text-ivory/90 italic">0{i + 1}</span>
                <DemoBadge show={card.image.demo} />
              </ImageReveal>
              <Reveal delay={0.1 + i * 0.1}>
                <h3 className="mt-7 font-serif text-[2rem] leading-tight text-lagoon">{card.title}</h3>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-charcoal/75">{card.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-20 border-t border-lagoon/15 pt-10 lg:mt-28">
          <p className="mx-auto max-w-3xl text-center font-serif text-2xl leading-snug text-lagoon/90 italic sm:text-[1.9rem]">
            Une cuisine qui met à l’honneur les produits locaux, entre traditions ivoiriennes et inspirations du
            monde.
          </p>
        </Reveal>
      </div>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} labelledBy="menu-title" className="w-full sm:w-auto">
        <div className="relative max-h-[100dvh] w-full overflow-y-auto bg-ivory p-7 text-charcoal sm:my-8 sm:max-h-[calc(100dvh-4rem)] sm:w-[640px] sm:p-12">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full text-lagoon hover:bg-lagoon/10"
            aria-label="Fermer la carte"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <p className="eyebrow text-champagne-ink">Carte provisoire</p>
          <h2 id="menu-title" className="title-display mt-4 text-4xl text-lagoon sm:text-5xl">La carte</h2>
          <p className="mt-5 rounded-sm border border-champagne/50 bg-champagne/10 p-4 text-sm leading-relaxed text-charcoal/80">
            La carte officielle de Mamia Lagoon sera bientôt disponible ici. Les rubriques ci-dessous sont indicatives :
            aucun plat ni prix n’est affiché tant qu’ils n’ont pas été confirmés par le restaurant.
          </p>
          <ul className="mt-8 divide-y divide-lagoon/10">
            {provisionalMenu.map((m) => (
              <li key={m.title} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-serif text-2xl text-lagoon">{m.title}</span>
                <span className="text-sm text-charcoal/60 italic">{m.note}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-l-2 border-champagne pl-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-champagne-ink uppercase">Piste éditoriale · à valider</p>
            <p className="mt-2 font-serif text-xl text-lagoon">La marmite du pêcheur</p>
            <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
              Évoquée dans des avis publics de clients. À confirmer par le restaurant avant toute mise en avant.
            </p>
          </div>
          <a
            href={links.whatsapp("Bonjour Mamia Lagoon, pourriez-vous me communiquer votre carte ? Merci !")}
            target="_blank"
            rel="noopener"
            className="btn-lagoon mt-10 w-full sm:w-auto"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> Demander la carte sur WhatsApp
          </a>
        </div>
      </Modal>
    </section>
  );
}
