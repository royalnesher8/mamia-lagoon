import { restaurant } from "@/config/restaurant";

/** Bandeau visible uniquement en mode prévisualisation (restaurant.previewMode). */
export function PreviewBanner() {
  if (!restaurant.previewMode) return null;
  return (
    <div
      role="note"
      className="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center bg-sun px-4 text-center font-sans text-[0.68rem] leading-tight font-semibold text-lagoon-deep sm:h-7 sm:text-xs"
    >
      Version de prévisualisation · visuels de démonstration et informations à valider par le restaurant
    </div>
  );
}
