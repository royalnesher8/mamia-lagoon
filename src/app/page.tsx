import { About } from "@/components/About";
import { Cuisine } from "@/components/Cuisine";
import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { PreviewBanner } from "@/components/PreviewBanner";
import { Reservation } from "@/components/Reservation";
import { StructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[70] rounded-full bg-champagne px-5 py-3 font-semibold text-lagoon-deep focus:not-sr-only focus:fixed focus:top-10 focus:left-4"
      >
        Aller au contenu
      </a>
      <StructuredData />
      <PreviewBanner />
      <Header />
      <main id="contenu">
        <Hero />
        <About />
        <Cuisine />
        <Gallery />
        <Experiences />
        <Reservation />
        <Location />
      </main>
      <Footer />
    </>
  );
}
