"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Info, MessageCircle, Phone } from "lucide-react";
import { links, restaurant } from "@/config/restaurant";
import {
  buildWhatsAppMessage,
  todayISO,
  validateReservation,
  type ReservationData,
  type ReservationErrors,
} from "@/lib/reservation";
import { Reveal } from "./ui/Reveal";

const empty: ReservationData = { name: "", phone: "", date: "", time: "", guests: "2", message: "" };
const noop = () => () => {};

export function Reservation() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<ReservationData>(empty);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  // Date minimale calculée côté navigateur (fuseau du visiteur).
  const minDate = useSyncExternalStore(noop, () => todayISO(), () => undefined);

  const set = (k: keyof ReservationData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((err) => ({ ...err, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateReservation(data);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const url = links.whatsapp(buildWhatsAppMessage(data));
    window.open(url, "_blank", "noopener");
    setSentUrl(url);
  };

  const field = (k: keyof ReservationData) => ({
    id: `${uid}-${k}`,
    name: k,
    value: data[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  const err = (k: keyof ReservationData) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-sm text-[#F2C1A8]" role="alert">
        {errors[k]}
      </p>
    ) : null;

  const label = "block text-[0.7rem] font-semibold tracking-[0.2em] text-champagne uppercase";

  return (
    <section id="reservation" aria-labelledby="reservation-title" className="relative overflow-hidden bg-lagoon-deep py-24 text-ivory sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-champagne">Réservation</p>
          <h2 id="reservation-title" className="title-display mt-6 text-5xl text-balance sm:text-6xl lg:text-[4.5rem]">
            Votre table vous attend
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/75">
            Offrez-vous un moment gourmand dans le cadre enchanteur de Mamia Lagoon.
          </p>

          <div className="mt-10 flex gap-4 border border-champagne/30 bg-ivory/5 p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-champagne" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-ivory/80">
              Votre demande est transmise au restaurant via WhatsApp.{" "}
              <strong className="font-semibold text-ivory">
                La réservation n’est confirmée qu’après la réponse de l’établissement.
              </strong>
            </p>
          </div>

          <div className="mt-10">
            <p className="text-sm text-ivory/60">Vous préférez nous parler ?</p>
            <a href={links.tel} className="group mt-2 inline-flex items-center gap-3 font-serif text-3xl text-ivory transition-colors hover:text-champagne-light">
              <Phone className="size-5 text-champagne" aria-hidden="true" />
              {restaurant.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <AnimatePresence mode="wait" initial={false}>
            {sentUrl ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border border-champagne/40 bg-ivory/5 p-8 sm:p-12"
                role="status"
              >
                <CheckCircle2 className="size-10 text-champagne" strokeWidth={1.25} aria-hidden="true" />
                <h3 className="mt-6 font-serif text-4xl">Votre demande est prête</h3>
                <p className="mt-4 leading-relaxed text-ivory/80">
                  WhatsApp s’est ouvert avec votre message prérempli : il ne vous reste qu’à l’envoyer. Votre table sera
                  réservée <strong className="text-ivory">uniquement après confirmation</strong> de l’équipe de Mamia
                  Lagoon.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={sentUrl} target="_blank" rel="noopener" className="btn-gold">
                    <MessageCircle className="size-4" aria-hidden="true" /> Rouvrir WhatsApp
                  </a>
                  <button type="button" className="btn-ghost-light" onClick={() => setSentUrl(null)}>
                    Modifier ma demande
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
                aria-describedby={`${uid}-legend`}
              >
                <p id={`${uid}-legend`} className="text-sm text-ivory/60 sm:col-span-2">
                  Tous les champs sont obligatoires, sauf le message.
                </p>
                <div>
                  <label htmlFor={`${uid}-name`} className={label}>Nom</label>
                  <input {...field("name")} type="text" autoComplete="name" required className="field" placeholder="Votre nom" />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor={`${uid}-phone`} className={label}>Téléphone</label>
                  <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" required className="field" placeholder="+225 07 00 00 00 00" />
                  {err("phone")}
                </div>
                <div>
                  <label htmlFor={`${uid}-date`} className={label}>Date</label>
                  <input {...field("date")} type="date" min={minDate} required className="field [color-scheme:dark]" />
                  {err("date")}
                </div>
                <div>
                  <label htmlFor={`${uid}-time`} className={label}>Heure souhaitée</label>
                  <select {...field("time")} required className="field [color-scheme:dark] [&>option]:bg-lagoon-deep">
                    <option value="">Choisir un horaire</option>
                    {restaurant.reservation.timeSlots.map((t) => (
                      <option key={t} value={t}>{t.replace(":", "h")}</option>
                    ))}
                  </select>
                  {err("time")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-guests`} className={label}>Nombre de personnes</label>
                  <select {...field("guests")} required className="field [color-scheme:dark] [&>option]:bg-lagoon-deep">
                    {Array.from({ length: restaurant.reservation.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n > 1 ? "personnes" : "personne"}
                      </option>
                    ))}
                    <option value="plus">Plus de {restaurant.reservation.maxGuests} personnes</option>
                  </select>
                  {err("guests")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-message`} className={label}>
                    Message <span className="font-normal tracking-normal normal-case text-ivory/50">(facultatif)</span>
                  </label>
                  <textarea {...field("message")} rows={3} maxLength={500} className="field resize-none" placeholder="Une occasion particulière, une demande spécifique…" />
                  {err("message")}
                </div>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                  <button type="submit" className="btn-gold flex-1">
                    <MessageCircle className="size-4" aria-hidden="true" /> Demander une réservation
                  </button>
                  <a href={links.tel} className="btn-ghost-light">
                    <Phone className="size-4" aria-hidden="true" /> Appeler
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
