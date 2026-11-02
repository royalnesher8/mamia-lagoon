import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./ui/Logo";

/** Gabarit sobre pour les pages légales. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-ivory">
      <header className="bg-lagoon-deep py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Retour à l’accueil"><Logo size={44} /></Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ivory/80 hover:text-ivory">
            <ArrowLeft className="size-4" aria-hidden="true" /> Accueil
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="title-display text-5xl text-lagoon sm:text-6xl">{title}</h1>
        <p className="mt-6 border-l-2 border-champagne bg-champagne/10 p-4 text-sm text-charcoal/80">
          Contenu provisoire : les éléments entre crochets doivent être complétés et validés par l’établissement avant
          publication.
        </p>
        <div className="mt-12 space-y-10 leading-relaxed text-charcoal/80 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-lagoon [&_p]:mt-3">
          {children}
        </div>
      </main>
    </div>
  );
}
