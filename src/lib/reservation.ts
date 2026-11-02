import { restaurant } from "@/config/restaurant";

export type ReservationData = {
  name: string;
  phone: string;
  date: string; // AAAA-MM-JJ
  time: string; // HH:MM
  guests: string;
  message: string;
};

export type ReservationErrors = Partial<Record<keyof ReservationData, string>>;

/** Date locale du jour au format AAAA-MM-JJ (pas d'UTC : évite les décalages). */
export function todayISO(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function validateReservation(d: ReservationData, now = new Date()): ReservationErrors {
  const e: ReservationErrors = {};
  if (d.name.trim().length < 2) e.name = "Merci d’indiquer votre nom.";

  const digits = d.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Merci d’indiquer un numéro de téléphone.";
  else if (!/^\+?[\d\s().-]+$/.test(d.phone.trim()) || digits.length < 8 || digits.length > 15)
    e.phone = "Ce numéro ne semble pas valide (8 à 15 chiffres).";

  const today = todayISO(now);
  if (!d.date) e.date = "Merci de choisir une date.";
  else if (d.date < today) e.date = "Merci de choisir une date à venir.";

  if (!d.time) e.time = "Merci de choisir un horaire.";
  else if (d.date === today) {
    const [h, m] = d.time.split(":").map(Number);
    if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) e.time = "Cet horaire est déjà passé aujourd’hui.";
  }

  if (!d.guests) e.guests = "Merci d’indiquer le nombre de personnes.";
  if (d.message.length > 500) e.message = "500 caractères maximum.";
  return e;
}

export function formatDateFr(iso: string) {
  const [y, m, day] = iso.split("-").map(Number);
  return new Date(y, m - 1, day).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildWhatsAppMessage(d: ReservationData) {
  const guests = d.guests === "plus" ? `plus de ${restaurant.reservation.maxGuests}` : d.guests;
  const lines = [
    `Bonjour ${restaurant.name},`,
    "",
    "Je souhaite faire une demande de réservation :",
    `• Nom : ${d.name.trim()}`,
    `• Téléphone : ${d.phone.trim()}`,
    `• Date : ${formatDateFr(d.date)}`,
    `• Heure souhaitée : ${d.time.replace(":", "h")}`,
    `• Nombre de personnes : ${guests}`,
  ];
  if (d.message.trim()) lines.push(`• Message : ${d.message.trim()}`);
  lines.push("", "Merci de me confirmer la disponibilité.");
  return lines.join("\n");
}
