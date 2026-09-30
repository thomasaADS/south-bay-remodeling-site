import type { MetadataRoute } from "next";
import { services } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: "https://formadpb.com/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://formadpb.com/services",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://formadpb.com/service-areas",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://formadpb.com/privacy-policy",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://formadpb.com/terms-of-use",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [
    ...corePages,
    ...services.map((service) => ({
      url: `https://formadpb.com/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
