import type { Metadata } from "next";
import Image from "next/image";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { services } from "../site-data";

export const metadata: Metadata = {
  title: "Home Remodeling Services in San Jose",
  description: "Explore FORMA Design + Build services for kitchens, bathrooms, ADUs, additions, roofing, landscaping and painting in San Jose and the South Bay.",
  alternates: { canonical: "/services" },
};

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
      <main className="content-page">
        <section className="content-hero">
          <div>
            <p className="eyebrow">South Bay remodeling services</p>
            <h1>One coordinated path for the work that changes your home.</h1>
            <p>Explore the planning and construction considerations behind each FORMA service. Every project begins with the property, the people who live there and a clear understanding of the scope.</p>
            <a className="button button-primary" href="/#consultation">Start your project</a>
          </div>
          <figure>
            <Image src="/images/hero-indoor-outdoor.png" alt="Indoor-outdoor remodeling design inspiration" fill sizes="(max-width: 900px) 100vw, 45vw" priority />
            <figcaption>Design inspiration · South Bay living</figcaption>
          </figure>
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
                <a href={`/services/${service.slug}`}>Explore {service.shortTitle.toLowerCase()}</a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
