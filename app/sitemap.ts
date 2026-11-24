import type { MetadataRoute } from "next";
import { guides } from "./guide-content";
import { cities, services } from "./site-data";

const origin = "https://formadpb.com";

// Indexable pages only. /privacy-policy and /terms-of-use are noindex and are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${origin}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${origin}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((service) => ({
      url: `${origin}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${origin}/service-areas`, changeFrequency: "monthly", priority: 0.8 },
    ...cities.map((city) => ({
      url: `${origin}/service-areas/${city.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${origin}/remodeling-planning-guide`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${origin}/guides`, changeFrequency: "monthly", priority: 0.6 },
    ...guides.map((guide) => ({
      url: `${origin}/guides/${guide.slug}`,
      lastModified: guide.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
