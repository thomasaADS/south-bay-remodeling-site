import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business, businessId, siteUrl } from "../../business";
import { guides } from "../../guide-content";
import { RichText } from "../../rich-text";
import { breadcrumbSchema, pageMetadata, serializeJsonLd, webPageSchema } from "../../seo";
import { Navigation } from "../../site-interactions";
import { SeoFooter } from "../../seo-footer";
import { services } from "../../site-data";

type PageProps = { params: Promise<{ slug: string }> };

// Unknown slugs get the static custom 404 page (a real 404 status with full HTML).
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  return pageMetadata(guide.seoTitle, guide.metaDescription, `/guides/${guide.slug}`, { type: "article" });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const pageUrl = `${siteUrl}${path}`;
  const service = services.find((item) => item.slug === guide.service)!;
  const others = guides.filter((item) => item.slug !== guide.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema(guide.seoTitle, guide.metaDescription, path),
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: guide.title,
        description: guide.metaDescription,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: "en-US",
        image: `${siteUrl}/images/og-forma.jpg`,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        author: { "@id": businessId },
        publisher: { "@id": businessId },
        about: { "@id": `${siteUrl}/services/${service.slug}#service` },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: guide.title, path },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <Navigation />
      <main id="main-content" className="content-page planning-guide">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span aria-current="page">{guide.title}</span>
        </nav>
        <header>
          <p className="eyebrow">FORMA remodeling guides</p>
          <h1>{guide.title}</h1>
          {guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {/* TODO(owner): set `priceRange` for this article in app/guide-content.ts to show a real range here. */}
          {guide.priceRange && <p><strong>Typical range:</strong> {guide.priceRange}</p>}
          <p>Looking for a contractor? See FORMA&apos;s <Link href={`/services/${service.slug}`}>{guide.serviceAnchor}</Link>.</p>
        </header>
        <nav className="guide-contents" aria-label="In this guide">
          <strong>In this guide</strong>
          {guide.sections.map((section) => <Link href={`#${section.id}`} key={section.id}>{section.heading}</Link>)}
        </nav>
        {guide.sections.map((section) => (
          <section id={section.id} key={section.id}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}><RichText text={paragraph} /></p>)}
            {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
        <section>
          <h2>Talk to a licensed San Jose contractor</h2>
          <p>{business.name} holds California contractor license #{business.license} ({business.licenseClass}) and serves San Jose and the South Bay. A first consultation is free.</p>
          <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
        </section>
        <section>
          <h2>More remodeling guides</h2>
          <ul>
            {others.map((item) => <li key={item.slug}><Link href={`/guides/${item.slug}`}>{item.title}</Link></li>)}
            <li><Link href="/remodeling-planning-guide">How to plan a home remodel in San Jose</Link></li>
          </ul>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
