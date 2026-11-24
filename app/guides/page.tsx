import Link from "next/link";
import { guides } from "../guide-content";
import { breadcrumbSchema, pageMetadata, serializeJsonLd, webPageSchema } from "../seo";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { services } from "../site-data";

const title = "San Jose Remodeling Guides | FORMA Design + Build";
const description = "Practical guides for San Jose homeowners: remodel costs, home addition permits, ADU rules and timelines, from a licensed design-build contractor.";
const path = "/guides";

export const metadata = pageMetadata(title, description, path);

export default function GuidesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(title, description, path, "CollectionPage"), mainEntity: { "@id": "https://formadpb.com/guides#guide-list" } },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path }]),
      {
        "@type": "ItemList",
        "@id": "https://formadpb.com/guides#guide-list",
        name: "FORMA remodeling guides",
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `https://formadpb.com/guides/${guide.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <Navigation />
      <main id="main-content" className="content-page planning-guide">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Guides</span></nav>
        <header>
          <p className="eyebrow">For San Jose + South Bay homeowners</p>
          <h1>Remodeling guides for San Jose homeowners</h1>
          <p>Straight answers on cost drivers, permits, ADU rules and timelines, written by a licensed design-build contractor. Start with the <Link href="/remodeling-planning-guide">home remodeling planning guide</Link> if you are at the beginning.</p>
        </header>
        {guides.map((guide) => {
          const service = services.find((item) => item.slug === guide.service)!;
          return (
            <section key={guide.slug}>
              <h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2>
              <p>{guide.summary}</p>
              <p><Link href={`/guides/${guide.slug}`}>Read the guide</Link> · Related service: <Link href={`/services/${service.slug}`}>{service.title} in San Jose</Link></p>
            </section>
          );
        })}
        <section>
          <h2>Ready to talk about your project?</h2>
          <p>A first consultation with FORMA Design + Build is free.</p>
          <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
