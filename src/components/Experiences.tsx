import Image from "next/image";
import { images, type SiteImage } from "@/config/images";
import { DemoBadge } from "./ui/DemoBadge";
import { ImageReveal, Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const moments: { title: string; text: string; image: SiteImage; when: string }[] = [
  {
    when: "Le jour",
    title: "Déjeuner au bord de l’eau",
    text: "Une pause lumineuse face à la lagune, à l’ombre de la végétation, pour savourer le rythme apaisé de Grand-Bassam.",
    image: images.experienceDejeuner,
  },
  {
    when: "Le soir",
    title: "Dîner romantique",
    text: "Quand le jour décline et que les lumières s’allument, la terrasse se prête aux confidences et aux grandes occasions à deux.",
    image: images.experienceDiner,
  },
  {
    when: "Ensemble",
    title: "En famille ou entre amis",
    text: "De grandes tablées, des plats que l’on partage et des rires qui se prolongent : le plaisir simple d’être réunis.",
    image: images.experienceFamille,
  },
];

export function Experiences() {
  return (
    <section aria-labelledby="moments-title" className="relative overflow-hidden bg-lagoon py-24 text-ivory sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full border border-champagne/15" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-[36rem] rounded-full border border-champagne/10" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          id="moments-title"
          tone="light"
          eyebrow="Moments à partager"
          title="Une table pour chaque occasion"
          intro="Quelques idées pour profiter du lieu — à chacun d’inventer son propre moment."
        />

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          {moments.map((m, i) => {
            const reverse = i % 2 === 1;
            return (
              <article key={m.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
                <ImageReveal className={`aspect-[4/5] md:col-span-6 lg:col-span-5 ${reverse ? "md:order-2 md:col-start-7 lg:col-start-8" : "lg:col-start-1"}`}>
                  <Image
                    src={m.image.src}
                    alt={m.image.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[2000ms] ease-luxe hover:scale-105"
                  />
                  <DemoBadge show={m.image.demo} />
                </ImageReveal>
                <Reveal className={`md:col-span-6 lg:col-span-5 ${reverse ? "md:order-1 lg:col-start-2" : "lg:col-start-7"}`}>
                  <p className="flex items-center gap-4 font-serif text-xl text-champagne italic">
                    <span className="font-sans text-xs font-semibold tracking-[0.3em] not-italic">0{i + 1}</span>
                    {m.when}
                  </p>
                  <h3 className="title-display mt-4 text-4xl text-balance sm:text-5xl">{m.title}</h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/75 sm:text-lg">{m.text}</p>
                  <a href="#reservation" className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-champagne">
                    <span className="h-px w-10 bg-champagne transition-all duration-500 ease-luxe group-hover:w-16" aria-hidden="true" />
                    Réserver ce moment
                  </a>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
