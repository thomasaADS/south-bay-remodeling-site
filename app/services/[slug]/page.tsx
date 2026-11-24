import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business, businessId, businessRatingNode, areaServedSchema, siteUrl } from "../../business";
import { CoverImage } from "../../cover-image";
import { guides } from "../../guide-content";
import { ProjectGallerySection, ReviewsSection, reviewSchema } from "../../proof-sections";
import { RichText } from "../../rich-text";
import { breadcrumbSchema, faqSchema, pageMetadata, serializeJsonLd, webPageSchema } from "../../seo";
import { serviceContent } from "../../service-content";
import { servicePlanning } from "../../service-planning";
import { Navigation } from "../../site-interactions";
import { SeoFooter } from "../../seo-footer";
import { services } from "../../site-data";

type PageProps = { params: Promise<{ slug: string }> };

const fallbackImage = "/images/hero-indoor-outdoor.webp";
const fallbackAlt = "Design inspiration: a kitchen opening to a California courtyard through wide glass doors";

// Unknown slugs get the static custom 404 page (a real 404 status with full HTML).
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata(service.seoTitle, service.metaDescription, `/services/${service.slug}`);
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const content = service && serviceContent[service.slug];
  if (!service || !content) notFound();

  const planning = servicePlanning[service.slug];
  const lower = service.title.toLowerCase().replace("interior + exterior painting", "interior and exterior painting");
  const path = `/services/${service.slug}`;
  const pageUrl = `${siteUrl}${path}`;
  const related = content.related.map((relatedSlug) => services.find((item) => item.slug === relatedSlug)!);
  const guide = guides.find((item) => item.slug === content.guide);
  const ratingNode = businessRatingNode(reviewSchema(service.slug));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(service.seoTitle, service.metaDescription, path), mainEntity: { "@id": `${pageUrl}#service` } },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${service.title} in San Jose, CA`,
        description: service.metaDescription,
        serviceType: service.title,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        url: pageUrl,
        provider: { "@id": businessId },
        areaServed: areaServedSchema,
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path },
      ]),
      faqSchema(pageUrl, service.questions),
      ...(ratingNode ? [ratingNode] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <Navigation />
      <main id="main-content" className="content-page">
        <section className="detail-hero">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span aria-current="page">{service.title}</span>
            </nav>
            <p className="eyebrow">Licensed design-build · CSLB #{business.license}</p>
            <h1>{service.h1}</h1>
            <p>{service.intro}</p>
            <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
          </div>
          <figure>
            <CoverImage src={service.image || fallbackImage} alt={service.imageAlt || fallbackAlt} sizes="(max-width: 900px) 100vw, 46vw" priority />
            <figcaption>Design inspiration shown · Not a completed FORMA project</figcaption>
          </figure>
        </section>

        <nav className="service-contents" aria-label="On this service page">
          <Link href="#scope">What is included</Link>
          {planning && <Link href="#planning-options">Planning options</Link>}
          <Link href="#process">Our process</Link>
          <Link href="#timeline">Timeline</Link>
          <Link href="#permits">San Jose permits</Link>
          <Link href="#cost">Cost factors</Link>
          <Link href="#materials">Materials</Link>
          <Link href="#why-forma">Why FORMA</Link>
          <Link href="#service-questions">Common questions</Link>
        </nav>

        <section className="service-planning" aria-labelledby="overview-title">
          <p className="eyebrow">San Jose + South Bay</p>
          <h2 id="overview-title">{service.title} by a licensed San Jose design-build contractor</h2>
          {content.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <section className="detail-grid" id="scope">
          <div>
            <p className="eyebrow">A connected scope</p>
            <h2>What is included</h2>
            <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">Plan before construction</p>
            <h2>Decisions to address early</h2>
            <ul>{service.planning.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="service-planning" aria-labelledby="included-title">
          <p className="eyebrow">Scope in detail</p>
          <h2 id="included-title">What each part of the work covers</h2>
          <div className="service-planning-grid">
            {content.included.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        {planning && <section className="service-planning" id="planning-options" aria-labelledby="planning-options-title">
          <p className="eyebrow">Decisions that shape the work</p>
          <h2 id="planning-options-title">{planning.title}</h2>
          <div className="service-planning-grid">
            {planning.sections.map((section) => <article key={section.title}><h3>{section.title}</h3><p>{section.text}</p></article>)}
          </div>
          <h3>Bring these details to your consultation</h3>
          <ul>{planning.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>}

        <section className="detail-process" id="process">
          <div>
            <p className="eyebrow">Design + build</p>
            <h2>Our {lower} process, step by step.</h2>
          </div>
          <ol>
            {content.process.map((step, index) => (
              <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong><p>{step.text}</p></li>
            ))}
          </ol>
        </section>

        <section className="service-planning" id="timeline" aria-labelledby="timeline-title">
          <p className="eyebrow">Typical timeline</p>
          <h2 id="timeline-title">How long {lower} takes</h2>
          <p>{content.timeline.intro}</p>
          <div className="service-planning-grid">
            {content.timeline.phases.map((item) => <article key={item.phase}><h3>{item.phase}</h3><p><strong>{item.duration}</strong></p><p>{item.note}</p></article>)}
          </div>
          <p>{content.timeline.outro}</p>
        </section>

        <section className="service-planning" id="permits" aria-labelledby="permits-title">
          <p className="eyebrow">Permits and code</p>
          <h2 id="permits-title">San Jose permit requirements for {lower}</h2>
          {content.permits.map((paragraph) => <p key={paragraph}><RichText text={paragraph} /></p>)}
          <p>For a property outside San Jose, the permit path is set by that city. See the <Link href="/service-areas">South Bay cities we serve</Link> for the building department in each one.</p>
        </section>

        <section className="service-planning" id="cost" aria-labelledby="cost-title">
          <p className="eyebrow">Cost factors</p>
          <h2 id="cost-title">What affects {lower} cost in San Jose</h2>
          <div className="service-planning-grid">
            {content.costFactors.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
          {/* TODO(owner): set `priceRange` for this service in app/service-content.ts to show a real range here. */}
          {content.priceRange && <p><strong>Typical price range:</strong> {content.priceRange}</p>}
          <p>FORMA prices every project from a written scope after a site visit, with allowances and exclusions stated.{guide && <> For more detail, read <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>.</>}</p>
        </section>

        <section className="service-planning" id="materials" aria-labelledby="materials-title">
          <p className="eyebrow">Materials and options</p>
          <h2 id="materials-title">{service.title} materials and options</h2>
          <div className="service-planning-grid">
            {content.materials.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        <section className="service-planning" aria-labelledby="planning-context-title">
          <p className="eyebrow">Before you request a proposal</p>
          <h2 id="planning-context-title">Planning your {lower} project</h2>
          <p>{service.planningNote}</p>
          <p>Read our <Link href="/remodeling-planning-guide">home remodeling planning guide</Link> for a scope checklist, proposal questions and permit considerations.</p>
        </section>

        <section className="service-planning" id="why-forma" aria-labelledby="why-forma-title">
          <p className="eyebrow">Licensed. Bonded. Insured.</p>
          <h2 id="why-forma-title">Why San Jose homeowners choose FORMA for {lower}</h2>
          <p>{business.name} is a design-build general contractor based at {business.street}, {business.city}, {business.region} {business.postalCode}. One team is responsible for the design, the permits and the construction, so there is no gap between what was drawn and what gets built.</p>
          <div className="service-planning-grid">
            <article><h3>Licensed</h3><p>California contractor license #{business.license}, {business.licenseClass}. <a href={business.licenseUrl} target="_blank" rel="noopener noreferrer">Verify the license with the CSLB</a>.</p></article>
            <article><h3>Bonded</h3><p>A $25,000 contractor&apos;s bond is on file with the California Contractors State License Board.</p></article>
            <article><h3>Insured</h3><p>General liability coverage of $1M per occurrence and $2M aggregate, plus workers&apos; compensation coverage.</p></article>
          </div>
        </section>

        {/* Real projects and testimonials for this service; hidden when there are none (app/proof.ts). */}
        <ProjectGallerySection service={service.slug} heading={`${service.title} projects by FORMA`} />
        <ReviewsSection service={service.slug} heading="What our clients say" />

        <section className="detail-faq" id="service-questions">
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
          <div>
            {related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}>{item.title} in San Jose</Link>)}
            <Link href="/service-areas">South Bay service areas</Link>
            <Link href="/remodeling-planning-guide">Home remodeling planning guide</Link>
          </div>
        </section>

        <section className="local-contact" aria-labelledby="service-cta-title">
          <p className="eyebrow">Free consultation</p>
          <h2 id="service-cta-title">Talk to a licensed San Jose contractor about your {lower} project.</h2>
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
