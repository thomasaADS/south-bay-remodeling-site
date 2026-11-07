import Link from "next/link";
import { pageMetadata } from "../seo";
import Image from "next/image";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { services } from "../site-data";

export const metadata = pageMetadata("San Jose Remodeling Services | FORMA Design + Build", "Explore kitchen and bathroom remodeling, landscaping and painting in San Jose. Compare project scopes and plan your South Bay home with FORMA.", "/services");

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FORMA Design + Build services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `https://formadpb.com/services/${service.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navigation />
      <main id="main-content" className="content-page">
        <section className="content-hero">
          <div>
            <p className="eyebrow">South Bay remodeling services</p>
            <h1>Home remodeling services in San Jose</h1>
            <p>Explore the planning and construction considerations behind each FORMA service. Every project begins with the property, the people who live there and a clear understanding of the scope.</p>
            <Link className="button button-primary" href="/#consultation">Start your project</Link>
          </div>
          <figure>
            <Image src="/images/hero-indoor-outdoor.png" alt="Indoor-outdoor remodeling design inspiration" fill sizes="(max-width: 900px) 100vw, 45vw" priority />
            <figcaption>Design inspiration · South Bay living</figcaption>
          </figure>
        </section>

        <section className="planning-context">
          <h2>Choose the scope before the finishes</h2>
          <p>Start with the rooms or outdoor areas you want to improve, then identify the layout, utility and preparation work involved. Our <Link href="/remodeling-planning-guide">home remodeling planning guide</Link> explains how to compare proposals and prepare for a consultation. See our <Link href="/service-areas">South Bay service areas</Link> for the cities we serve.</p>
        </section>

        <section className="content-index" aria-labelledby="service-index-title">
          <div className="content-heading">
            <p className="eyebrow">Full-service capabilities</p>
            <h2 id="service-index-title">Choose a project type.</h2>
          </div>
          <div className="content-card-grid">
            {services.map((service) => (
              <article key={service.slug}>
                <span>{service.number}</span>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <Link href={`/services/${service.slug}`}>Explore {service.shortTitle.toLowerCase()}</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
