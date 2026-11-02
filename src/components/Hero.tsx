"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { images } from "@/config/images";
import { DemoBadge } from "./ui/DemoBadge";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const img = images.hero;
  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-lagoon-deep lg:min-h-svh">
      <div className="absolute inset-0 -z-10 animate-slow-zoom">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
      </div>
      {/* Dégradés : lisibilité du texte et du header transparent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-lagoon-deep/70 via-lagoon-deep/10 to-lagoon-deep/90" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lagoon-deep/60 to-transparent" aria-hidden="true" />
      <DemoBadge show={img.demo} className="top-28 right-4 sm:right-8 lg:top-32 lg:right-12" />

      <div className="mx-auto w-full max-w-[1440px] px-5 pt-40 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <motion.p
          className="eyebrow text-champagne"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          Grand-Bassam · Côte d’Ivoire
        </motion.p>

        <h1 id="hero-title" className="mt-6 text-ivory">
          <span className="sr-only">Mamia Lagoon, restaurant à Grand-Bassam — </span>
          <motion.span
            aria-hidden="true"
            className="block font-serif text-[clamp(3.4rem,13vw,10.5rem)] leading-[0.88] font-medium tracking-[0.04em]"
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.35, ease }}
          >
            MAMIA
            <span className="block text-[0.5em] tracking-[0.42em] text-champagne-light sm:inline sm:pl-[0.3em] sm:text-[0.42em]">LAGOON</span>
          </motion.span>
          <motion.span
            className="mt-6 block font-serif text-[clamp(1.6rem,4.2vw,3rem)] leading-tight font-normal italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.75, ease }}
          >
            « L’élégance au fil de l’eau »
          </motion.span>
        </h1>

        <motion.div
          className="mt-8 flex max-w-xl flex-col gap-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease }}
        >
          <p className="text-base leading-relaxed text-ivory/85 sm:text-lg">
            À Grand-Bassam, découvrez une parenthèse gourmande où les saveurs rencontrent la sérénité de la lagune.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#reservation" className="btn-gold">Réserver une table</a>
            <a href="#univers" className="btn-ghost-light">Découvrir notre univers</a>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <a
        href="#univers"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] font-semibold tracking-[0.3em] text-ivory/70 uppercase transition-colors hover:text-ivory md:flex"
        aria-label="Faire défiler vers Notre univers"
      >
        Défiler
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-0 animate-scroll-cue bg-champagne" />
        </span>
      </a>
    </section>
  );
}
