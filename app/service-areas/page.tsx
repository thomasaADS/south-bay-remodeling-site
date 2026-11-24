import Link from "next/link";
import { business } from "../business";
import { CoverImage } from "../cover-image";
import { pageMetadata, serializeJsonLd, webPageSchema, breadcrumbSchema } from "../seo";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { cities, services } from "../site-data";

const title = "South Bay Remodeling Service Areas | FORMA Design + Build";
const description = "FORMA serves San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos. See local permit notes for each city.";

export const metadata = pageMetadata(title, description, "/service-areas");

export default function ServiceAreasPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...webPageSchema(title, description, "/service-areas", "CollectionPage"),
        about: cities.map((city) => ({ "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: "California" } })),
        mainEntity: { "@id": "https://formadpb.com/service-areas#city-list" },
      },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }]),
      {
        "@type": "ItemList",
        "@id": "https://formadpb.com/service-areas#city-list",
        name: "Cities served by FORMA Design + Build",
        itemListElement: cities.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: city.name,
          url: `https://formadpb.com/service-areas/${city.slug}`,
        })),
      },
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
            <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
          </div>
          <figure>
            <CoverImage src="/images/hero-indoor-outdoor.webp" alt="Design inspiration: a kitchen opening to a California courtyard through wide glass doors" sizes="(max-width: 900px) 100vw, 45vw" priority />
            <figcaption>Based in San Jose · Serving the South Bay</figcaption>
          </figure>
        </section>

        <section className="area-directory">
          <div className="content-heading">
            <p className="eyebrow">Core service area</p>
            <h2>Where FORMA works.</h2>
            <p>Each city has its own housing stock, building department and review process. Choose a city for local permit notes and the projects that suit its homes.</p>
          </div>
          <div className="area-list">
            {cities.map((city, index) => (
              <article key={city.slug} id={city.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{city.name}</h3><p>{city.description}</p></div>
                <Link href={`/service-areas/${city.slug}`}>Remodeling in {city.name}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="area-services">
          <div>
            <p className="eyebrow">Project types</p>
            <h2>What are you remodeling?</h2>
            <p>For a kitchen, start with the <Link href="/services/kitchen-remodeling#planning-options">layout and appliance planning checklist</Link>. For a bathroom, use the <Link href="/services/bathroom-remodeling#planning-options">shower, ventilation and fixture checklist</Link>. Both can help you describe the work before you request a proposal.</p>
          </div>
          <div>{services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}</div>
        </section>

        <section className="local-contact">
          <p className="eyebrow">San Jose office</p>
          <h2>Start with the property and the work you are considering.</h2>
          <address>{business.street}<br />{business.city}, {business.region} {business.postalCode}</address>
          <div><a href={`tel:${business.phoneE164}`}>{business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
        </section>
      </main>
      <SeoFooter />
    </>
  );
}
