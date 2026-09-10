import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://formadpb.com/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
