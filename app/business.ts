// Single source of truth for FORMA's public business details (NAP, license, schema).
// Change a value here and it updates the visible pages and the structured data together.

export const siteUrl = "https://formadpb.com";

export const business = {
  name: "FORMA Design + Build",
  // Owner-confirmed public number for display, structured data, calls and text messages.
  phoneDisplay: "(408) 234-7914",
  phoneE164: "+14082347914",
  phoneSchema: "+1-408-234-7914",
  email: "Office@formadpb.com",
  street: "360 S Market St, Unit 1707",
  city: "San Jose",
  region: "CA",
  postalCode: "95113",
  country: "US",
  license: "1162108",
  licenseClass: "B - General Building",
  licenseUrl: "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1162108",
  instagram: "https://www.instagram.com/formadpb/",
  // TODO(owner): paste the Google Business Profile URL (the g.page / maps.app.goo.gl share link).
  // While this is null it is left out of schema `sameAs`.
  googleBusinessProfileUrl: null as string | null,
  // TODO(owner): confirm the map pin. These coordinates are the approximate location of
  // 360 S Market St, San Jose, CA 95113 and should be matched to the Google Business Profile pin.
  geo: { latitude: 37.3301, longitude: -121.8881 },
  // TODO(owner): provide business hours, e.g.
  // [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }]
  // While this is empty, openingHoursSpecification is left out of the schema.
  hours: [] as { days: string[]; opens: string; closes: string }[],
  // Official Google Place ID of the verified listing "FORMA Design+Build", 360 S Market St
  // Unit 1707. Matched by the Maps feature ID 0x60f81f6d5280bd25:0x98da3bb12c71762b, the pin
  // and the address.
  googlePlaceId: "ChIJJb2AUm0f-GARK3ZxLLE72pg",
  // Keep null. Google reviews are shown live by Google's own widget (app/google-reviews.tsx),
  // so the site stores no rating or count and publishes no AggregateRating for FORMA.
  aggregateRating: null as { ratingValue: number; reviewCount: number } | null,
} as const;

export const serviceAreaNames = ["San Jose", "Fremont", "Santa Clara", "Palo Alto", "Milpitas", "Sunnyvale", "Saratoga", "Los Gatos"] as const;

export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;

export const areaServedSchema = serviceAreaNames.map((name) => ({
  "@type": "City",
  name,
  containedInPlace: { "@type": "State", name: "California" },
}));

/** Sitewide GeneralContractor + WebSite graph, rendered once in the root layout <head>. */
export function businessGraph() {
  const sameAs = [business.instagram, business.googleBusinessProfileUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": businessId,
        name: business.name,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/images/forma-logo-transparent.webp`,
        image: `${siteUrl}/images/og-forma.jpg`,
        telephone: business.phoneSchema,
        email: business.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.street,
          addressLocality: business.city,
          addressRegion: business.region,
          postalCode: business.postalCode,
          addressCountry: business.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: business.geo.latitude, longitude: business.geo.longitude },
        ...(business.hours.length
          ? {
              openingHoursSpecification: business.hours.map((item) => ({
                "@type": "OpeningHoursSpecification",
                dayOfWeek: item.days,
                opens: item.opens,
                closes: item.closes,
              })),
            }
          : {}),
        areaServed: areaServedSchema,
        sameAs,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: `California Contractor License #${business.license} (${business.licenseClass})`,
          credentialCategory: "Contractor license",
          identifier: business.license,
          url: business.licenseUrl,
          recognizedBy: {
            "@type": "GovernmentOrganization",
            name: "Contractors State License Board",
            url: "https://www.cslb.ca.gov/",
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteUrl}/`,
        name: business.name,
        publisher: { "@id": businessId },
        inLanguage: "en-US",
      },
    ],
  };
}

/**
 * AggregateRating is only published on pages that visibly show real reviews.
 * Pass the Review nodes for the reviews rendered on that page; returns null when there are
 * none or when no real rating has been supplied.
 */
export function businessRatingNode(reviewNodes: unknown[]) {
  if (!business.aggregateRating || !reviewNodes.length) return null;
  return {
    "@type": "GeneralContractor",
    "@id": businessId,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.aggregateRating.ratingValue,
      reviewCount: business.aggregateRating.reviewCount,
      bestRating: 5,
    },
    review: reviewNodes,
  };
}
