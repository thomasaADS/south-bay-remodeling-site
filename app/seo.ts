import type { Metadata } from "next";
import { business, businessId, siteUrl, websiteId } from "./business";

export { siteUrl };

export const defaultShareImage = "/images/og-forma.jpg";

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
    isPartOf: { "@id": websiteId },
    publisher: { "@id": businessId },
  };
}

export function faqSchema(pageUrl: string, questions: readonly { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#questions`,
    isPartOf: { "@id": `${pageUrl}#webpage` },
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

const indexable = { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1, "max-video-preview": -1 } };
const noindexFollow = { index: false, follow: true, googleBot: { index: false, follow: true } };

/** Every page gets a self-referencing canonical on the non-www https origin. */
export function pageMetadata(title: string, description: string, path: string, options: { image?: string; noindex?: boolean; type?: "website" | "article" } = {}): Metadata {
  const image = options.image ?? defaultShareImage;
  return {
    title: { absolute: title },
    robots: options.noindex ? noindexFollow : indexable,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: options.type ?? "website",
      title,
      description,
      url: `${siteUrl}${path === "/" ? "" : path}`,
      siteName: business.name,
      locale: "en_US",
      images: [{ url: image, alt: `${business.name} remodeling design inspiration` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
