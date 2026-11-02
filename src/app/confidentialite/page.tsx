import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { restaurant } from "@/config/restaurant";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <section>
        <h2>Données collectées</h2>
        <p>
          Le formulaire de réservation n’enregistre aucune donnée sur ce site : les informations saisies (nom,
          téléphone, date, heure, nombre de personnes, message) servent uniquement à préremplir un message WhatsApp que
          vous choisissez d’envoyer au restaurant.
        </p>
      </section>
      <section>
        <h2>Finalité</h2>
        <p>
          Ces informations permettent à {restaurant.name} de traiter votre demande de réservation. Elles sont ensuite
          soumises aux conditions d’utilisation et à la politique de confidentialité de WhatsApp.
        </p>
      </section>
      <section>
        <h2>Services tiers</h2>
        <p>
          La carte interactive est fournie par Google Maps et ne se charge que si vous cliquez sur « Afficher la carte
          interactive ». Google peut alors déposer des cookies.
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément à la loi ivoirienne n° 2013-450 relative à la protection des données à caractère personnel, vous
          pouvez demander l’accès, la rectification ou la suppression de vos données en contactant le restaurant au{" "}
          {restaurant.contact.phoneDisplay}. [Coordonnées complètes et éventuel correspondant à faire valider.]
        </p>
      </section>
    </LegalPage>
  );
}
