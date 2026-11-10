import type { Metadata } from "next";

export const siteUrl = "https://formadpb.com";

// Escape markup without changing the JSON values read by search engines.
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href,
    })),
  };
}

export function webPageSchema(title: string, description: string, path: string, type = "WebPage") {
  const url = new URL(path, siteUrl).href;
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#business` },
  };
}

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
