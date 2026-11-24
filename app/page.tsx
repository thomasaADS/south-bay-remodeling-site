import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { business, businessId, businessRatingNode } from "./business";
import { CoverImage } from "./cover-image";
import { Navigation, ProjectJourney } from "./site-interactions";
import { ConsultationForm } from "./consultation-form";
import { ReviewsSection, reviewSchema, videoSchema } from "./proof-sections";
import { GoogleReviews } from "./google-reviews";
import { SeoFooter } from "./seo-footer";
import { cities, faqs, services } from "./site-data";
import { defaultShareImage, siteUrl, serializeJsonLd, webPageSchema } from "./seo";

const title = "Home Remodeling Contractor in San Jose | FORMA";
// Keep at 150 characters or fewer.
const description =
  "Licensed home remodeling contractor in San Jose (CSLB #1162108). Kitchens, bathrooms, home additions and more. Book a free consultation.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | FORMA Design + Build",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "FORMA Design + Build",
    locale: "en_US",
    images: [
      {
        url: defaultShareImage,
        width: 1200,
        height: 630,
        alt: "FORMA Design + Build remodeling inspiration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [defaultShareImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Real photos from the completed San Jose full-house remodel (see app/proof.ts).
const homeProjectPhotos = [
  { src: "/images/projects/san-jose-kitchen-remodel-island.webp", label: "Kitchen remodel", alt: "Kitchen remodel in San Jose with wood-tone shaker cabinets and a large island with a backlit stone countertop" },
  { src: "/images/projects/san-jose-bathroom-remodel-green-vanity.webp", label: "Bathroom remodel", alt: "Bathroom remodel in San Jose with a green vanity, an oval backlit mirror and a tiled shower" },
  { src: "/images/projects/san-jose-bathroom-remodel-floating-vanity.webp", label: "Second bathroom", alt: "Bathroom remodel in San Jose with a floating wood vanity, a backlit mirror and pendant lights" },
];

export default function Home() {
  // Only published when real reviews are shown on this page (see app/proof.ts).
  const ratingNode = businessRatingNode(reviewSchema());
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema(title, description, "/"),
      // The GeneralContractor and WebSite nodes are published sitewide from app/layout.tsx.
      {
        "@type": "OfferCatalog",
        "@id": "https://formadpb.com/#services",
        name: "Residential remodeling and construction services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `https://formadpb.com/services/${service.slug}#service`,
            name: service.title,
            url: `https://formadpb.com/services/${service.slug}`,
            provider: { "@id": businessId },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": "https://formadpb.com/#faq",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      ...videoSchema("https://formadpb.com/"),
      ...(ratingNode ? [ratingNode] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />
      <Navigation />
      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">South Bay General Contractor</p>
            <h1 id="hero-title">
              Home remodeling
              <br />
              in San Jose,
              <br />
              <span>built around you.</span>
            </h1>
            <p className="hero-intro">
              Kitchen, bathroom and whole-home remodeling in San Jose. One connected
              team from first idea to final detail, here in the South Bay.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#consultation">
                Start your project
              </a>
              <Link className="button button-secondary" href="/projects">
                See our work
              </Link>
            </div>
            <div className="trust-line" aria-label="FORMA credentials">
              <span>CSLB #1162108</span>
              <i />
              <span>B General Building</span>
              <i />
              <span>Bonded + insured</span>
            </div>
          </div>

          <div className="hero-visual">
            <CoverImage
              src="/images/hero-indoor-outdoor.webp"
              alt="Design inspiration: a white oak kitchen opening to a California courtyard"
              sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
              priority
            />
            <div className="hero-trust-card">
              <Image
                src="/images/forma-logo-transparent.webp"
                alt=""
                aria-hidden="true"
                width={240}
                height={60}
              />
              <span />
              <p>A more connected path from first idea to finished home.</p>
            </div>
          </div>
        </section>

        <div className="service-ribbon" aria-label="Core services">
          {[
            ["Kitchens", "/services/kitchen-remodeling"],
            ["Bathrooms", "/services/bathroom-remodeling"],
            ["Home additions", "/services/home-additions"],
            ["Whole-home remodeling", "/projects"],
            ["Landscaping", "/services/landscaping"],
            ["Painting", "/services/interior-exterior-painting"],
          ].map(([label, href]) => (
            <span key={label}><Link href={href}>{label}</Link></span>
          ))}
        </div>

        <section
          className="credential-section"
          aria-labelledby="credentials-title"
        >
          <div className="credential-intro">
            <p className="eyebrow">Licensed. Bonded. Insured.</p>
            <h2 id="credentials-title">
              Verified credentials for work in California.
            </h2>
            <p>
              FORMA Design + Build is a current and active California
              general building contractor with contractor&apos;s bond, general
              liability and workers&apos; compensation coverage.
            </p>
          </div>
          <div className="credential-grid">
            <article>
              <span>California license</span>
              <strong>#1162108</strong>
              <p>Current and active · B General Building</p>
              <a
                href="https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1162108"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify with CSLB
              </a>
            </article>
            <article>
              <span>Contractor&apos;s bond</span>
              <strong>$25,000</strong>
              <p>Bond on file with the California Contractors State License Board.</p>
            </article>
            <article>
              <span>Insurance coverage</span>
              <strong>$1M / $2M</strong>
              <p>
                General liability per occurrence / aggregate, plus
                workers&apos; compensation coverage.
              </p>
            </article>
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="section-kicker">
            <span>Built as one idea</span>
            <strong>01</strong>
          </div>
          <div className="intro-grid">
            <h2>One team. Every detail. A home that feels completely yours.</h2>
            <div>
              <p>
                A successful remodel is more than a collection of trades. It is
                one clear vision carried through planning, material choices,
                permitting, construction and finish work.
              </p>
              <p>
                FORMA brings the moving pieces together so homeowners have a
                simpler path, clearer decisions and a finished result that feels
                considered from every angle.
              </p>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Full-service capabilities</p>
              <h2>One partner for the projects that shape your home.</h2>
            </div>
            <p>
              From a single room to a property-wide transformation, every scope
              is approached with the same attention to function, flow and
              finish.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article
                className={`service-card ${service.image ? "service-card-image" : ""}`}
                key={service.title}
              >
                {service.image && (
                  <CoverImage
                    src={service.image}
                    alt=""
                    decorative
                    sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
                  />
                )}
                <div className="service-card-content">
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <Link href={`/services/${service.slug}`} aria-label={`${service.title} in San Jose`}>
                    Explore {service.shortTitle.toLowerCase()}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="project-copy">
            <p className="eyebrow">Completed by FORMA</p>
            <h2>
              Spaces that connect everyday life with the best of the Bay Area.
            </h2>
            <p>
              A full-house remodel in San Jose: a new kitchen with a large
              island, two remodeled bathrooms and updated living areas. Every
              photo here is from the finished home.
            </p>
            <Link className="text-link" href="/projects">
              See the full project and client video
            </Link>
          </div>

          <div className="project-gallery">
            {homeProjectPhotos.map((photo, index) => (
              <figure className={index === 0 ? "project-main" : undefined} key={photo.src}>
                <CoverImage
                  src={photo.src}
                  alt={photo.alt}
                  sizes={index === 0 ? "(max-width: 620px) 100vw, (max-width: 900px) 90vw, 45vw" : "(max-width: 620px) 100vw, (max-width: 900px) 45vw, 25vw"}
                />
                <figcaption>
                  <span>{photo.label}</span>
                  <small>San Jose, CA · Completed project</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Real FORMA projects and client testimonials (data in app/proof.ts). */}
        <ReviewsSection heading="What San Jose homeowners say about working with us" withVideo moreLink />

        <section
          className="process-section"
          id="approach"
          aria-labelledby="process-title"
        >
          <div className="process-intro">
            <p className="eyebrow">A clearer way to build</p>
            <h2 id="process-title">From first conversation to final detail.</h2>
            <p>
              Every phase informs the next. That continuity helps protect the
              design intent, make decisions earlier and keep everyone moving in
              the same direction.
            </p>
          </div>
          <ProjectJourney />
        </section>

        <section className="difference-section">
          <div className="difference-visual">
            <CoverImage
              src="/images/kitchen-remodel.webp"
              alt="Design inspiration: natural oak kitchen cabinetry"
              sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
            />
            <div className="difference-badge">
              <strong>FORMA</strong>
              <span>Design + Build</span>
            </div>
          </div>
          <div className="difference-copy">
            <p className="eyebrow">Why design + build</p>
            <h2>Fewer handoffs. Better alignment. More confidence.</h2>
            <ul>
              <li>
                <span>01</span>
                <div>
                  <h3>One coordinated direction</h3>
                  <p>
                    Design decisions are considered alongside construction,
                    budget and site realities from the beginning.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Clearer ownership</h3>
                  <p>
                    You have one central team helping connect the consultants,
                    trades, selections and milestones.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Details that stay connected</h3>
                  <p>
                    The original intent remains visible through documentation,
                    construction and final finish work.
                  </p>
                </div>
              </li>
            </ul>
            <div className="metric-row">
              <div>
                <strong>8</strong>
                <span>South Bay cities</span>
              </div>
              <div>
                <strong>{services.length}</strong>
                <span>Core service categories</span>
              </div>
              <div>
                <strong>1</strong>
                <span>Connected project team</span>
              </div>
            </div>
          </div>
        </section>

        <section className="areas-section" id="areas">
          <div className="areas-heading">
            <p className="eyebrow">Local by design</p>
            <h2>Serving homeowners across the South Bay.</h2>
            <p>
              Based at 360 S Market St in San Jose, FORMA serves homeowners
              across the South Bay. Every city has its own housing stock, review
              path and neighborhood character, and the project plan should
              reflect those local conditions from day one.
            </p>
          </div>
          <div className="city-grid">
            {cities.map((city, index) => (
              <article key={city.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{city.name}</h3>
                <p>{city.description}</p>
                <Link href={`/service-areas/${city.slug}`}>Remodeling in {city.name}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div>
            <p className="eyebrow">Good questions, clear answers</p>
            <h2>Before the first sketch.</h2>
            <p>
              The right starting questions make every decision that follows more
              useful.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.question}
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Live Google reviews of the business. Separate from the project video testimonial above. */}
        <GoogleReviews />

        <section className="consultation-section" id="consultation">
          <div className="consultation-copy">
            <p className="eyebrow">Start with what you know</p>
            <h2>Tell us what you want your home to become.</h2>
            <p>
              Share the project type, property details and finish direction. It
              gives the first conversation a more useful starting point.
            </p>
            <div className="project-types">
              <span>Kitchen or bath</span>
              <span>Whole-home remodel</span>
              <span>Exterior + landscape</span>
              <span>Interior + exterior painting</span>
            </div>
            <div className="direct-contact" aria-label="Direct contact options">
              <a href={`tel:${business.phoneE164}`}>Call {business.phoneDisplay}</a>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>
          <ConsultationForm />
        </section>
      </main>
      <SeoFooter home />
    </>
  );
}
