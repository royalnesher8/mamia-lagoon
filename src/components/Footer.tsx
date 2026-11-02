"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { links, navigation, restaurant } from "@/config/restaurant";
import { Logo } from "./ui/Logo";

const noop = () => () => {};

export function Footer() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-10 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid gap-14 border-b border-ivory/10 pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size={104} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/65">{restaurant.shortDescription}</p>
            <p className="mt-6 font-serif text-xl text-sun italic">{restaurant.tagline}</p>
          </div>

          <nav aria-label="Navigation du pied de page" className="lg:col-span-2 lg:col-start-6">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.25em] text-sun uppercase">Explorer</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((n) => (
                <li key={n.href}>
                  <Link href={`/${n.href}`} className="text-ivory/75 transition-colors hover:text-ivory">{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/#reservation" className="text-ivory/75 transition-colors hover:text-ivory">Réservation</Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.25em] text-sun uppercase">Contact</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-ivory/75">
              <p>{restaurant.address.street ? `${restaurant.address.street}, ` : ""}{restaurant.address.locality}, {restaurant.address.country}</p>
              <p>
                <a href={links.tel} className="inline-flex items-center gap-2 hover:text-ivory">
                  <Phone className="size-4 text-sun" aria-hidden="true" /> {restaurant.contact.phoneDisplay}
                  <span className="text-ivory/50">· Restaurant</span>
                </a>
              </p>
              <p>
                <a href={links.telBar} className="inline-flex items-center gap-2 hover:text-ivory">
                  <Phone className="size-4 text-sun" aria-hidden="true" /> {restaurant.contact.barPhoneDisplay}
                  <span className="text-ivory/50">· Bar</span>
                </a>
              </p>
              <p>
                <a href={links.whatsapp()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-ivory">
                  <MessageCircle className="size-4 text-sun" aria-hidden="true" /> WhatsApp
                </a>
              </p>
              {restaurant.contact.email && (
                <p><a href={`mailto:${restaurant.contact.email}`} className="hover:text-ivory">{restaurant.contact.email}</a></p>
              )}
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.25em] text-sun uppercase">Horaires</h2>
            {restaurant.openingHours ? (
              <ul className="mt-5 space-y-2 text-sm text-ivory/75">
                {restaurant.openingHours.map((h) => (
                  <li key={h.days}><span className="text-ivory">{h.days}</span> · {h.hours}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-ivory/65">Horaires communiqués prochainement.</p>
            )}
            {restaurant.socials.length > 0 && (
              <>
                <h2 className="mt-10 text-[0.7rem] font-semibold tracking-[0.25em] text-sun uppercase">Suivez-nous</h2>
                <ul className="mt-5 flex flex-wrap gap-4 text-sm">
                  {restaurant.socials.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener" className="text-ivory/75 hover:text-ivory">
                        {s.label} <span className="text-ivory/50">{s.handle}</span>
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 pt-8 text-xs text-ivory/55 md:flex-row md:items-center">
          <p>© {year ?? ""} {restaurant.name}. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/mentions-legales" className="hover:text-ivory">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-ivory">Politique de confidentialité</Link>
            <a href="#accueil" className="inline-flex items-center gap-2 hover:text-ivory">
              Haut de page <ArrowUp className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
