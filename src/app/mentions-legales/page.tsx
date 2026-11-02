import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          {restaurant.name} — [raison sociale et forme juridique]<br />
          [Adresse complète], {restaurant.address.locality}, {restaurant.address.country}<br />
          RCCM : [numéro] · Compte contribuable : [numéro]<br />
          Téléphone : {restaurant.contact.phoneDisplay}
        </p>
        <p>Directeur ou directrice de la publication : [nom].</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>[Nom et adresse de l’hébergeur — par exemple Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.]</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus de ce site (textes, logotype, photographies) est la propriété de {restaurant.name} ou
          utilisé avec autorisation. Toute reproduction sans accord préalable est interdite.
        </p>
      </section>
      <section>
        <h2>Crédits photographiques</h2>
        <p>[À compléter lorsque les photographies officielles seront intégrées.]</p>
      </section>
    </LegalPage>
  );
}
