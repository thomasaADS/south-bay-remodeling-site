import type { Metadata } from "next";

export const siteUrl = "https://formadpb.com";

export function pageMetadata(title: string, description: string, path: string, image = "/images/hero-indoor-outdoor.png"): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: "FORMA Design + Build",
      locale: "en_US",
      images: [{ url: image, alt: "FORMA Design + Build remodeling design inspiration" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
