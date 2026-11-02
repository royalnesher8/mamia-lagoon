/** Pastille signalant un visuel de démonstration (à remplacer par une photo officielle). */
export function DemoBadge({ show = true, className = "" }: { show?: boolean; className?: string }) {
  if (!show) return null;
  return (
    <span
      className={`pointer-events-none absolute z-10 rounded-full bg-charcoal/70 px-2.5 py-1 font-sans text-[0.625rem] font-semibold tracking-[0.14em] text-ivory uppercase backdrop-blur-sm ${className || "right-3 bottom-3"}`}
    >
      Visuel de démonstration
    </span>
  );
}
