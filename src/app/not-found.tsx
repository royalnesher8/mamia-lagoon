import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-lagoon-deep px-6 text-center text-ivory">
      <p className="eyebrow text-champagne">Erreur 404</p>
      <h1 className="title-display mt-6 text-5xl sm:text-6xl">Cette page s’est perdue au fil de l’eau</h1>
      <Link href="/" className="btn-gold mt-10">Revenir à l’accueil</Link>
    </main>
  );
}
