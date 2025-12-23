/**
 * Composant JsonLd - Injecte des données structurées LocalBusiness
 * Permet à Google d'identifier le salon comme une entreprise locale
 * et d'afficher les informations dans les résultats de recherche
 */
export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Purple Nails Studio",
    image: "https://purple-nails-studio.vercel.app/opengraph-image.png",
    description:
      "Studio de manucure russe et nail art. Soins des ongles haut de gamme à Sochaux.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3 avenue du Général Leclerc",
      addressLocality: "Sochaux",
      postalCode: "25600",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.5083, // Coordonnées approximatives de Sochaux
      longitude: 6.8314,
    },
    url: "https://purple-nails-studio.vercel.app",
    telephone: "+33783389817",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

