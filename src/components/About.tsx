import Image from "next/image";
import { HandHeart, Trees, UtensilsCrossed } from "lucide-react";
import { images } from "@/config/images";
import { DemoBadge } from "./ui/DemoBadge";
import { ImageReveal, Reveal } from "./ui/Reveal";

const values = [
  {
    icon: Trees,
    title: "Cadre lagunaire",
    text: "Une terrasse au bord de l’eau, dans un écrin de verdure propice au calme et à la contemplation.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cuisine inspirée",
    text: "Des produits locaux mis en valeur, entre inspirations ivoiriennes et influences internationales.",
  },
  {
    icon: HandHeart,
    title: "Accueil attentionné",
    text: "L’hospitalité ivoirienne dans ce qu’elle a de plus chaleureux, du premier regard au dernier café.",
  },
];

export function About() {
  return (
    <section id="univers" aria-labelledby="univers-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Visuels */}
        <div className="relative pb-10 lg:col-span-6">
          <ImageReveal className="aspect-[4/5] w-[86%] sm:w-[78%]">
            <Image
              src={images.about.src}
              alt={images.about.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 34vw, 86vw"
              className="object-cover object-top transition-transform duration-[2500ms] ease-luxe hover:scale-105"
            />
            <DemoBadge show={images.about.demo} className="top-3 left-3" />
          </ImageReveal>
          <ImageReveal className="absolute -bottom-10 right-0 aspect-square w-[46%] border-[6px] border-ivory sm:w-[40%]" delay={0.25}>
            <Image
              src={images.aboutDetail.src}
              alt={images.aboutDetail.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 20vw, 46vw"
              className="object-cover"
            />
            <DemoBadge show={images.aboutDetail.demo} className="bottom-2 left-2 hidden sm:block" />
          </ImageReveal>
          <span aria-hidden="true" className="absolute -top-10 right-[4%] hidden font-serif text-[9rem] leading-none text-champagne/25 select-none sm:block">01</span>
        </div>

        {/* Texte */}
        <div className="pt-8 lg:col-span-5 lg:col-start-8 lg:pt-0">
          <Reveal>
            <p className="eyebrow text-champagne-ink">Bienvenue chez Mamia Lagoon</p>
            <h2 id="univers-title" className="title-display mt-6 text-[2.6rem] text-balance text-lagoon sm:text-5xl lg:text-[3.8rem]">
              Un lieu d’exception, une expérience à savourer
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 space-y-5 text-base leading-[1.8] text-charcoal/80 sm:text-[1.05rem]">
            <p>
              Au bord de la lagune de Grand-Bassam, Mamia Lagoon cultive l’art de prendre son temps. Ici, la
              lumière danse sur l’eau, la végétation enveloppe les tables et le tumulte du monde semble
              soudain très loin.
            </p>
            <p>
              Notre cuisine célèbre les produits locaux et les marie à des inspirations venues d’ailleurs, pour des
              assiettes généreuses, colorées et soignées. Le tout servi avec cette chaleur qui fait la réputation de
              l’hospitalité ivoirienne.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
          <ul className="mt-12 grid gap-8 border-t border-lagoon/15 pt-10 sm:grid-cols-3 sm:gap-6">
            {values.map((v) => (
                <li key={v.title}>
                  <v.icon className="size-7 text-champagne-ink" strokeWidth={1.25} aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-2xl text-lagoon">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{v.text}</p>
                </li>
            ))}
          </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
