import { links, restaurant } from "@/config/restaurant";

/**
 * Données structurées schema.org (Restaurant).
 * Seules les informations confirmées sont publiées : le téléphone n'apparaît
 * qu'une fois `contact.phoneVerified` à true, les horaires une fois renseignés.
 */
export function StructuredData() {
  const { address, contact, openingHours } = restaurant;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.shortDescription,
    url: restaurant.siteUrl,
    image: `${restaurant.siteUrl}/opengraph-image.jpg`,
    servesCuisine: restaurant.servesCuisine,
    hasMap: links.mapsPlace,
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      ...(address.street ? { streetAddress: address.street } : {}),
      addressLocality: address.locality,
      addressCountry: address.countryCode,
    },
  };
  if (address.geo) data.geo = { "@type": "GeoCoordinates", ...address.geo };
  if (contact.phoneVerified) data.telephone = contact.phoneE164;
  if (contact.email) data.email = contact.email;
  const specs = openingHours?.filter((h) => h.schema);
  if (specs?.length)
    data.openingHoursSpecification = specs.map((h) => ({ "@type": "OpeningHoursSpecification", ...h.schema }));
  if (restaurant.socials.length) data.sameAs = restaurant.socials.map((s) => s.href);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
