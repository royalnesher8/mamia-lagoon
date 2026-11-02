"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { gallery, galleryCategories, images, type GalleryCategory } from "@/config/images";
import { restaurant } from "@/config/restaurant";
import { TikTokEmbed } from "./TikTokEmbed";
import { DemoBadge } from "./ui/DemoBadge";
import { Modal } from "./ui/Modal";
import { SectionHeading } from "./ui/SectionHeading";

/** Composition magazine : chaque position de la grille a son propre format. */
const layout = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1 lg:col-span-1",
  "col-span-1 row-span-1 lg:row-span-2",
  "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2",
  "col-span-2 row-span-1 lg:col-span-1",
];

const videos = restaurant.tiktokVideos.filter((v) => v.published);

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index !== null ? items[index] : null;

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading id="galerie-title" eyebrow="Galerie" title="Chaque instant mérite son décor" />

          <div role="group" aria-label="Filtrer la galerie" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ id: "all" as const, label: "Tout voir" }, ...galleryCategories].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className="min-h-11 shrink-0 rounded-full border border-lagoon/20 px-5 text-sm font-medium whitespace-nowrap text-lagoon transition-colors hover:border-lagoon aria-pressed:border-lagoon aria-pressed:bg-lagoon aria-pressed:text-ivory"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          layout
          className="mt-14 grid grid-flow-row-dense auto-rows-[38vw] grid-cols-2 gap-3 sm:auto-rows-[30vw] sm:gap-4 lg:mt-20 lg:auto-rows-[15vw] lg:grid-cols-4 2xl:auto-rows-[240px]"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.li
                layout
                key={item.alt}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={filter === "all" ? layout[i % layout.length] : "col-span-1 row-span-2"}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group relative block size-full overflow-hidden bg-lagoon/10"
                  aria-label={`Agrandir : ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 40vw, 60vw"
                    className="object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-lagoon-deep/0 transition-colors duration-500 group-hover:bg-lagoon-deep/25" aria-hidden="true" />
                  <span className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-ivory/90 text-lagoon opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
                    <Expand className="size-4" />
                  </span>
                  <DemoBadge show={item.demo} className="bottom-3 left-3 hidden sm:block" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="mt-6 text-xs text-charcoal/60 sm:hidden">
          Les visuels marqués « démonstration » seront remplacés par des photographies officielles.
        </p>

        {videos.length > 0 && (
          <div className="mt-20 grid items-center gap-10 border-t border-lagoon/15 pt-16 md:grid-cols-2 lg:mt-28 lg:pt-20">
            <div className="max-w-md">
              <p className="eyebrow text-champagne-ink">En vidéo</p>
              <h3 className="title-display mt-5 text-4xl text-lagoon sm:text-5xl">Mamia Lagoon en mouvement</h3>
              <p className="mt-5 leading-relaxed text-charcoal/75">
                L’ambiance du lieu, partagée par l’équipe sur notre compte TikTok officiel.
              </p>
              {restaurant.socials
                .filter((s) => s.href.includes("tiktok.com"))
                .map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener" className="btn-outline-dark mt-8">
                    Suivre {s.handle} sur TikTok
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:justify-end">
              {videos.map((v) => (
                <TikTokEmbed key={v.id} id={v.id} author={v.author} title={v.title} poster={images.about.src} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal open={current !== null} onClose={() => setIndex(null)} labelledBy="lightbox-caption" className="size-full">
        {current && index !== null && (
          <div className="relative flex size-full flex-col items-center justify-center p-4 sm:p-10">
            <button
              type="button"
              onClick={() => setIndex(null)}
              className="absolute top-4 right-4 z-20 inline-flex size-12 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
              aria-label="Fermer la galerie"
            >
              <X className="size-6" aria-hidden="true" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="relative h-[70dvh] w-full max-w-6xl touch-pan-y"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
              >
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="pointer-events-none object-contain select-none" />
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex w-full max-w-6xl items-center justify-between gap-4 text-ivory">
              <button type="button" onClick={() => go(-1)} className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 hover:bg-ivory/10" aria-label="Image précédente">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <p id="lightbox-caption" className="text-center text-sm text-ivory/80" aria-live="polite">
                <span className="mr-3 font-serif text-lg text-champagne">
                  {index + 1} / {items.length}
                </span>
                {current.alt}
              </p>
              <button type="button" onClick={() => go(1)} className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 hover:bg-ivory/10" aria-label="Image suivante">
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
