import Link from "next/link";
import { business } from "../business";
import { CoverImage } from "../cover-image";
import { ProjectGallerySection, ReviewsSection, videoSchema } from "../proof-sections";
import { breadcrumbSchema, pageMetadata, serializeJsonLd, webPageSchema } from "../seo";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { services } from "../site-data";

const title = "Remodeling Projects & Client Reviews in San Jose | FORMA";
const description = "See completed FORMA remodeling projects in San Jose and hear from the homeowners: kitchen, bathroom and whole-home photos plus a client video.";
const path = "/projects";

export const metadata = pageMetadata(title, description, path);

export default function ProjectsPage() {
  const pageUrl = `https://formadpb.com${path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema(title, description, path, "CollectionPage"),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path }]),
      ...videoSchema(pageUrl),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <Navigation />
      <main id="main-content" className="content-page">
        <section className="content-hero">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Projects</span></nav>
            <p className="eyebrow">Our work · Client reviews</p>
            <h1>Remodeling projects and client reviews in San Jose</h1>
            <p>Real homes remodeled by FORMA Design + Build, and what the homeowners say about the experience. Every photo on this page is from a completed project.</p>
            <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
          </div>
          <figure>
            <CoverImage src="/images/projects/san-jose-kitchen-remodel-island.webp" alt="Kitchen remodel in San Jose with wood-tone shaker cabinets and a large island with a backlit stone countertop" sizes="(max-width: 900px) 100vw, 45vw" priority />
            <figcaption>Completed FORMA project · San Jose, CA</figcaption>
          </figure>
        </section>

        <ReviewsSection all withVideo heading="Hear it from the homeowners" />
        <ProjectGallerySection all heading="Completed remodeling projects" />

        <section className="related-services">
          <p className="eyebrow">Plan your own project</p>
          <h2>Remodeling services in San Jose</h2>
          <div>
            {services.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title} in San Jose</Link>)}
            <Link href="/service-areas">South Bay service areas</Link>
          </div>
        </section>

        <section className="local-contact" aria-labelledby="projects-cta-title">
          <p className="eyebrow">Free consultation</p>
          <h2 id="projects-cta-title">Ready to talk about your home?</h2>
          <address>{business.street}<br />{business.city}, {business.region} {business.postalCode}</address>
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
