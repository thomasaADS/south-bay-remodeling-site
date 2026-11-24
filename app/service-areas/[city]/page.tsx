import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business, businessId, siteUrl } from "../../business";
import { cityContent } from "../../city-content";
import { CoverImage } from "../../cover-image";
import { breadcrumbSchema, pageMetadata, serializeJsonLd, webPageSchema } from "../../seo";
import { Navigation } from "../../site-interactions";
import { SeoFooter } from "../../seo-footer";
import { cities, services } from "../../site-data";

type PageProps = { params: Promise<{ city: string }> };

// Unknown slugs get the static custom 404 page (a real 404 status with full HTML).
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

function cityTitle(name: string) {
  return `Home Remodeling Contractor in ${name}, CA | FORMA`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  const content = city && cityContent[city.slug];
  if (!city || !content) return {};
  return pageMetadata(cityTitle(city.name), content.metaDescription, `/service-areas/${city.slug}`);
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = cities.find((item) => item.slug === slug);
  const content = city && cityContent[city.slug];
  if (!city || !content) notFound();

  const path = `/service-areas/${city.slug}`;
  const pageUrl = `${siteUrl}${path}`;
  const title = cityTitle(city.name);
  const otherCities = cities.filter((item) => item.slug !== city.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(title, content.metaDescription, path), about: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "California" } }, mainEntity: { "@id": `${pageUrl}#service` } },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `Home remodeling in ${city.name}, CA`,
        serviceType: "Home remodeling",
        description: content.metaDescription,
        url: pageUrl,
        provider: { "@id": businessId },
        areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "California" } },
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Service Areas", path: "/service-areas" },
        { name: city.name, path },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <Navigation />
      <main id="main-content" className="content-page">
        <section className="content-hero area-hero">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span><Link href="/service-areas">Service Areas</Link><span>/</span><span aria-current="page">{city.name}</span>
            </nav>
            <p className="eyebrow">Licensed design-build · CSLB #{business.license}</p>
            <h1>Home Remodeling Contractor in {city.name}, CA</h1>
            <p>{content.intro[0]}</p>
            <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
          </div>
          <figure>
            <CoverImage src="/images/hero-indoor-outdoor.webp" alt="Design inspiration: a kitchen opening to a California courtyard through wide glass doors" sizes="(max-width: 900px) 100vw, 45vw" priority />
            <figcaption>Design inspiration shown · Not a completed FORMA project</figcaption>
          </figure>
        </section>

        <section className="service-planning" aria-labelledby="housing-title">
          <p className="eyebrow">Remodeling in {city.name}</p>
          <h2 id="housing-title">{content.housing.heading}</h2>
          {content.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {content.housing.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className="service-planning" id="permits" aria-labelledby="permits-title">
          <p className="eyebrow">Permit office and process</p>
          <h2 id="permits-title">{content.permits.heading}</h2>
          {content.permits.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p><strong>{content.permits.office}</strong><br />{content.permits.address}<br /><a href={content.permits.url} target="_blank" rel="noopener noreferrer">Official {city.name} website</a>. Requirements change, so confirm the current rules with the department before construction.</p>
        </section>

        <section className="service-planning" id="planning" aria-labelledby="planning-title">
          <p className="eyebrow">Before you start</p>
          <h2 id="planning-title">{content.planning.heading}</h2>
          {content.planning.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className="service-planning" id="services" aria-labelledby="projects-title">
          <p className="eyebrow">Services in {city.name}</p>
          <h2 id="projects-title">{content.projects.heading}</h2>
          <div className="service-planning-grid">
            {services.map((service) => (
              <article key={service.slug}>
                <h3><Link href={`/services/${service.slug}`}>{service.title} in {city.name}</Link></h3>
                <p>{content.projects.items[service.slug]}</p>
              </article>
            ))}
          </div>
          <p>Not sure where to begin? The <Link href="/remodeling-planning-guide">home remodeling planning guide</Link> walks through scope, proposals and permits.</p>
        </section>

        <section className="service-planning" id="neighborhoods" aria-labelledby="neighborhoods-title">
          <p className="eyebrow">Neighborhoods</p>
          <h2 id="neighborhoods-title">{city.name} neighborhoods we serve</h2>
          <p>{content.neighborhoods.text}</p>
          <ul>{content.neighborhoods.names.map((name) => <li key={name}>{name}</li>)}</ul>
        </section>

        <section className="related-services">
          <p className="eyebrow">Nearby service areas</p>
          <h2>Other South Bay cities we serve</h2>
          <div>
            {otherCities.map((item) => <Link href={`/service-areas/${item.slug}`} key={item.slug}>Remodeling in {item.name}</Link>)}
            <Link href="/service-areas">All service areas</Link>
          </div>
        </section>

        <section className="local-contact" aria-labelledby="city-cta-title">
          <p className="eyebrow">Free consultation</p>
          <h2 id="city-cta-title">Planning a remodel in {city.name}? Start with a conversation.</h2>
          <address>{business.name}<br />{business.street}<br />{business.city}, {business.region} {business.postalCode}</address>
          <div>
            <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
            <a href={`tel:${business.phoneE164}`}>{business.phoneDisplay}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </div>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
