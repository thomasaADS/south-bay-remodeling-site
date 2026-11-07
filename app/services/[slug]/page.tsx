import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "../../seo";
import { notFound } from "next/navigation";
import { Navigation } from "../../site-interactions";
import { SeoFooter } from "../../seo-footer";
import { cities, services } from "../../site-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata(service.seoTitle, service.metaDescription, `/services/${service.slug}`, service.image);
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const pageUrl = `https://formadpb.com/services/${service.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.title,
        description: service.metaDescription,
        serviceType: service.title,
        mainEntityOfPage: pageUrl,
        url: pageUrl,
        provider: { "@type": "GeneralContractor", "@id": "https://formadpb.com/#business", name: "FORMA Design + Build", url: "https://formadpb.com/" },
        areaServed: cities.map((city) => ({ "@type": "City", name: `${city.name}, California` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://formadpb.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://formadpb.com/services" },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Navigation />
      <main id="main-content" className="content-page">
        <section className="detail-hero">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{service.title}</span>
            </nav>
            <p className="eyebrow">San Jose + South Bay</p>
            <h1>{service.title} in San Jose</h1>
            <p>{service.intro}</p>
            <Link className="button button-primary" href="/#consultation">Discuss your project</Link>
          </div>
          <figure>
            <Image src={service.image || "/images/hero-indoor-outdoor.png"} alt={`${service.title} design inspiration`} fill sizes="(max-width: 900px) 100vw, 46vw" priority />
            <figcaption>Design inspiration shown · Not a completed FORMA project</figcaption>
          </figure>
        </section>

        <section className="detail-grid">
          <div>
            <p className="eyebrow">A connected scope</p>
            <h2>What the project may include</h2>
            <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">Plan before construction</p>
            <h2>Decisions to address early</h2>
            <ul>{service.planning.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="planning-context" aria-labelledby="planning-context-title">
          <p className="eyebrow">Before you request a proposal</p>
          <h2 id="planning-context-title">Planning your {service.title.toLowerCase()} project</h2>
          <p>{service.planningNote}</p>
          <p>FORMA serves San Jose and the surrounding <Link href="/service-areas">South Bay service area</Link>. Read our <Link href="/remodeling-planning-guide">remodeling planning guide</Link> for a scope checklist, proposal questions and permit considerations.</p>
        </section>

        <section className="detail-process">
          <div>
            <p className="eyebrow">Design + build</p>
            <h2>One direction from feasibility through finish.</h2>
          </div>
          <ol>
            <li><span>01</span><strong>Understand</strong><p>Clarify the property, priorities, timing and budget direction.</p></li>
            <li><span>02</span><strong>Plan</strong><p>Coordinate layout, materials, technical requirements and the review path.</p></li>
            <li><span>03</span><strong>Build</strong><p>Carry the design intent through construction and final details.</p></li>
          </ol>
        </section>

        <section className="detail-faq">
          <div><p className="eyebrow">Useful starting points</p><h2>{service.title} questions</h2></div>
          <div>
            {service.questions.map((item) => (
              <details key={item.question}><summary>{item.question}<b aria-hidden="true">+</b></summary><p>{item.answer}</p></details>
            ))}
          </div>
        </section>

        <section className="related-services">
          <p className="eyebrow">Continue exploring</p>
          <h2>Related remodeling services</h2>
          <div>{services.filter((item) => item.slug !== service.slug).slice(0, 3).map((item) => <Link href={`/services/${item.slug}`} key={item.slug}>{item.title}</Link>)}</div>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
