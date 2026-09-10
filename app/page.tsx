import Image from "next/image";
import { Navigation, ProjectJourney } from "./site-interactions";
import { ConsultationForm } from "./consultation-form";
import { cities, faqs, services } from "./site-data";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": "https://formadpb.com/#business",
        name: "FORMA Design + Build",
        url: "https://formadpb.com/",
        logo: "https://formadpb.com/images/forma-logo-transparent.png",
        image: "https://formadpb.com/images/hero-indoor-outdoor.png",
        email: "Office@formadpb.com",
        telephone: "+1-323-975-5574",
        address: {
          "@type": "PostalAddress",
          streetAddress: "360 S Market St, Unit 1707",
          addressLocality: "San Jose",
          addressRegion: "CA",
          postalCode: "95113",
          addressCountry: "US",
        },
        areaServed: cities.map((city) => ({
          "@type": "City",
          name: `${city.name}, California`,
        })),
        sameAs: ["https://www.instagram.com/formadpb/"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Residential remodeling and construction services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              areaServed: "South Bay, California",
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://formadpb.com/#website",
        url: "https://formadpb.com/",
        name: "FORMA Design + Build",
        publisher: { "@id": "https://formadpb.com/#business" },
        inLanguage: "en-US",
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">South Bay General Contractor</p>
            <h1 id="hero-title">
              Build your home
              <br />
              around the way
              <br />
              <span>you live.</span>
            </h1>
            <p className="hero-intro">
              Thoughtful remodeling, ADUs and additions. One connected team from
              first idea to final detail, here in the South Bay.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#consultation">
                Start your project
              </a>
              <a className="button button-secondary" href="#projects">
                Explore the possibilities
              </a>
            </div>
            <div className="trust-line" aria-label="FORMA benefits">
              <span>Design-led</span>
              <i />
              <span>One accountable team</span>
              <i />
              <span>Local South Bay focus</span>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              src="/images/hero-indoor-outdoor.png"
              alt="Design inspiration: a white oak kitchen opening to a California courtyard"
              fill
              sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
              priority
              fetchPriority="high"
            />
            <div className="hero-trust-card">
              <Image
                src="/images/forma-logo-transparent.png"
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
            "Kitchens",
            "Bathrooms",
            "ADUs",
            "Additions",
            "Roofing",
            "Landscaping",
            "Painting",
          ].map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>

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
                  <Image
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
                  />
                )}
                <div className="service-card-content">
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a href={`/services/${service.slug}`}>
                    Explore {service.shortTitle.toLowerCase()}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="project-copy">
            <p className="eyebrow">Bright California living</p>
            <h2>
              Spaces that connect everyday life with the best of the Bay Area.
            </h2>
            <p>
              Natural materials, effortless circulation and a strong
              relationship between indoors and out create homes that feel calm,
              useful and enduring.
            </p>
            <a className="text-link" href="#consultation">
              Explore a project with us
            </a>
          </div>

          <div className="project-gallery">
            <figure className="project-main">
              <Image
                src="/images/hero-indoor-outdoor.png"
                alt="Indoor-outdoor kitchen and courtyard design inspiration"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
              />
              <figcaption>
                <span>Indoor + outdoor living</span>
                <small>Kitchen · Landscape · Entertaining</small>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/kitchen-remodel.png"
                alt="White oak and stone kitchen design inspiration"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
              />
              <figcaption>
                <span>Warm modern kitchen</span>
                <small>Cabinetry · Stone · Lighting</small>
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/bathroom-remodel.png"
                alt="White oak and green tile bathroom design inspiration"
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 900px) 90vw, 55vw"
              />
              <figcaption>
                <span>Restorative bathroom</span>
                <small>Tile · Millwork · Fixtures</small>
              </figcaption>
            </figure>
          </div>
          <p className="imagery-note">
            Design inspiration shown throughout this page illustrates
            possibilities, not completed FORMA projects.
          </p>
        </section>

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
            <Image
              src="/images/kitchen-remodel.png"
              alt="Design inspiration: natural oak kitchen cabinetry"
              fill
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
                <strong>7</strong>
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
                <a href="/service-areas">Explore service areas</a>
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
              <span>ADU or addition</span>
              <span>Whole-home remodel</span>
              <span>Exterior + landscape</span>
            </div>
            <div className="direct-contact" aria-label="Direct contact options">
              <a href="tel:+13239755574">Call (323) 975-5574</a>
              <a href="mailto:Office@formadpb.com">Office@formadpb.com</a>
            </div>
          </div>
          <ConsultationForm />
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <Image
            src="/images/forma-logo-transparent.png"
            alt="FORMA Design + Build"
            width={240}
            height={60}
          />
          <p>
            Thoughtful design. Coordinated construction. Homes made for South
            Bay living.
          </p>
          <a href="#top">Back to top</a>
        </div>
        <div className="footer-links">
          <div>
            <strong>Services</strong>
            <a href="/services/kitchen-remodeling">Kitchen Remodeling</a>
            <a href="/services/bathroom-remodeling">Bathroom Remodeling</a>
            <a href="/services/adu-construction">ADUs</a>
            <a href="/services">All Services</a>
          </div>
          <div>
            <strong>Explore</strong>
            <a href="#projects">Project Vision</a>
            <a href="#about">About FORMA</a>
            <a href="/service-areas">Service Areas</a>
            <a href="#consultation">Start a Project</a>
            <a
              href="https://www.instagram.com/formadpb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FORMA on Instagram (opens in a new tab)"
            >
              Instagram
            </a>
          </div>
          <div>
            <strong>South Bay</strong>
            <span>San Jose · Fremont</span>
            <span>Santa Clara · Palo Alto</span>
            <span>Milpitas · Sunnyvale</span>
            <span>Saratoga · Los Gatos</span>
          </div>
          <div>
            <strong>Contact</strong>
            <address>
              <span>360 S Market St, Unit 1707</span>
              <span>San Jose, CA 95113</span>
            </address>
            <a href="tel:+13239755574">(323) 975-5574</a>
            <a href="mailto:Office@formadpb.com">Office@formadpb.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FORMA Design + Build</span>
          <span>San Jose · South Bay, California</span>
        </div>
      </footer>
    </>
  );
}
