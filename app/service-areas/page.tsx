import Link from "next/link";
import { pageMetadata, serializeJsonLd, webPageSchema, breadcrumbSchema } from "../seo";
import Image from "next/image";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { cities, services } from "../site-data";

export const metadata = pageMetadata("South Bay Remodeling Service Areas | FORMA Design + Build", "Find FORMA remodeling services in San Jose, Santa Clara, Sunnyvale and the South Bay. Explore service areas and discuss your home project.", "/service-areas");

export default function ServiceAreasPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...webPageSchema("South Bay Remodeling Service Areas | FORMA Design + Build", "FORMA serves homeowners in San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos.", "/service-areas", "CollectionPage"),
        about: cities.map((city) => ({ "@type": "City", name: `${city.name}, California` })),
      },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <Navigation />
      <main id="main-content" className="content-page">
        <section className="content-hero area-hero">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Service Areas</span></nav>
            <p className="eyebrow">Local by design</p>
            <h1>Remodeling and construction across the South Bay.</h1>
            <p>FORMA Design + Build is based in San Jose and works with homeowners throughout the South Bay. Project planning is shaped around the property, scope and requirements of the city where the work will take place.</p>
            <Link className="button button-primary" href="/#consultation">Plan a South Bay project</Link>
          </div>
          <figure>
            <Image src="/images/hero-indoor-outdoor.png" alt="California indoor-outdoor living design inspiration" fill sizes="(max-width: 900px) 100vw, 45vw" priority />
            <figcaption>Based in San Jose · Serving the South Bay</figcaption>
          </figure>
        </section>

        <section className="area-directory">
          <div className="content-heading">
            <p className="eyebrow">Core service area</p>
            <h2>Where FORMA works.</h2>
            <p>Service availability depends on project type, property conditions and schedule. Share the address and scope so the first conversation can begin with the right context.</p>
          </div>
          <div className="area-list">
            {cities.map((city, index) => (
              <article key={city.slug} id={city.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h2>{city.name}</h2><p>{city.description}</p></div>
                <Link href={`/#consultation`} aria-label={`Discuss a project in ${city.name}`}>Discuss your project</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="area-services">
          <div><p className="eyebrow">Project types</p><h2>One team across the scope.</h2></div>
          <div>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}</div>
        </section>

        <section className="local-contact">
          <p className="eyebrow">San Jose office</p>
          <h2>Start with the property and the work you are considering.</h2>
          <address>360 S Market St, Unit 1707<br />San Jose, CA 95113</address>
          <div><a href="tel:+14082347914">(408) 234-7914</a><a href="mailto:Office@formadpb.com">Office@formadpb.com</a></div>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
