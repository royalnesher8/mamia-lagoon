"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { images } from "@/config/images";
import { links, restaurant } from "@/config/restaurant";
import { DemoBadge } from "./ui/DemoBadge";
import { Reveal } from "./ui/Reveal";

export function Location() {
  // La carte Google n'est chargée qu'à la demande : performance et respect de la vie privée.
  const [showMap, setShowMap] = useState(false);
  const { address, contact, openingHours } = restaurant;

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-champagne-ink">Localisation</p>
          <h2 id="contact-title" className="title-display mt-6 text-[2.6rem] text-balance text-lagoon sm:text-5xl lg:text-[4rem]">
            Retrouvez-nous à Grand-Bassam
          </h2>

          <dl className="mt-12 space-y-8">
            <div className="flex gap-5">
              <dt><MapPin className="mt-1 size-5 text-champagne-ink" aria-hidden="true" /><span className="sr-only">Adresse</span></dt>
              <dd>
                <p className="font-serif text-2xl text-lagoon">{restaurant.name}</p>
                <p className="mt-1 text-charcoal/75">
                  {address.street ? <>{address.street}<br /></> : null}
                  {address.locality}, {address.country}
                </p>
                {!address.street && <p className="mt-1 text-xs text-charcoal/55 italic">Adresse détaillée à confirmer</p>}
              </dd>
            </div>
            <div className="flex gap-5">
              <dt><Phone className="mt-1 size-5 text-champagne-ink" aria-hidden="true" /><span className="sr-only">Téléphone</span></dt>
              <dd>
                <a href={links.tel} className="font-serif text-2xl text-lagoon underline-offset-4 hover:underline">{contact.phoneDisplay}</a>
                <p className="mt-1 text-sm text-charcoal/65">Appel ou WhatsApp</p>
              </dd>
            </div>
            <div className="flex gap-5">
              <dt><Clock className="mt-1 size-5 text-champagne-ink" aria-hidden="true" /><span className="sr-only">Horaires</span></dt>
              <dd>
                {openingHours ? (
                  <ul className="space-y-1">
                    {openingHours.map((h) => (
                      <li key={h.days} className="flex gap-4 text-charcoal/80">
                        <span className="min-w-36 font-medium text-lagoon">{h.days}</span>
                        {h.hours}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <p className="font-serif text-2xl text-lagoon">Horaires</p>
                    <p className="mt-1 text-charcoal/70">Communiqués prochainement — contactez-nous pour vérifier l’ouverture.</p>
                  </>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a href={links.directions} target="_blank" rel="noopener" className="btn-lagoon">
              <Navigation className="size-4" aria-hidden="true" /> Obtenir l’itinéraire
              <span className="sr-only">(Google Maps, nouvel onglet)</span>
            </a>
            <a href={links.tel} className="btn-outline-dark">
              <Phone className="size-4" aria-hidden="true" /> Nous appeler
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-lagoon sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
            {showMap ? (
              <iframe
                src={links.mapsEmbed}
                title="Carte Google Maps : Mamia Lagoon à Grand-Bassam"
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <>
                <Image src={images.location.src} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-lagoon-deep/55" aria-hidden="true" />
                <DemoBadge show={images.location.demo} className="top-4 right-4" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-ivory">
                  <span className="inline-flex size-16 items-center justify-center rounded-full border border-champagne/60">
                    <MapPin className="size-7 text-champagne" strokeWidth={1.25} aria-hidden="true" />
                  </span>
                  <p className="font-serif text-3xl">Mamia Lagoon · Grand-Bassam</p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={() => setShowMap(true)} className="btn-gold">
                      Afficher la carte interactive
                    </button>
                    <a href={links.mapsPlace} target="_blank" rel="noopener" className="btn-ghost-light">
                      Ouvrir dans Google Maps
                    </a>
                  </div>
                  <p className="max-w-sm text-xs text-ivory/65">
                    La carte est fournie par Google ; son affichage peut déposer des cookies tiers.
                  </p>
                </div>
              </>
            )}
          </div>
          {showMap && (
            <p className="mt-3 text-sm text-charcoal/65">
              La carte ne s’affiche pas ?{" "}
              <a href={links.mapsPlace} target="_blank" rel="noopener" className="font-semibold text-lagoon underline underline-offset-4">
                Ouvrir Mamia Lagoon dans Google Maps
              </a>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
