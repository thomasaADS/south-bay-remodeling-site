const services = [
  {
    number: "01",
    title: "Kitchen Remodeling",
    text: "Thoughtful layouts, custom cabinetry, lighting, surfaces and finish details designed around how your household actually lives.",
    image: "/images/kitchen-remodel.png",
  },
  {
    number: "02",
    title: "Bathroom Remodeling",
    text: "Calm, highly functional bathrooms—from efficient guest baths to complete primary-suite transformations.",
    image: "/images/bathroom-remodel.png",
  },
  {
    number: "03",
    title: "ADU Construction",
    text: "Detached ADUs, attached units and garage conversions planned to make the most of your property and long-term goals.",
  },
  {
    number: "04",
    title: "Home Additions",
    text: "Seamless room additions and expanded living areas that feel intentional, balanced and connected to the original home.",
  },
  {
    number: "05",
    title: "Roofing",
    text: "Roof replacement, repairs, weatherproofing and related exterior work coordinated as part of one clear project plan.",
  },
  {
    number: "06",
    title: "Landscaping",
    text: "Outdoor rooms, hardscape, planting, decks and gathering spaces designed for the South Bay’s indoor-outdoor lifestyle.",
  },
  {
    number: "07",
    title: "Interior + Exterior Painting",
    text: "Meticulous preparation and a refined finish that brings the architecture, materials and color story together.",
  },
];

const cities = [
  ["San Jose", "Whole-home remodels, ADUs and additions"],
  ["Fremont", "Renovations and indoor-outdoor upgrades"],
  ["Santa Clara", "Kitchens, baths and home expansions"],
  ["Palo Alto", "Design-led remodels and additions"],
  ["Milpitas", "ADUs, interiors and exterior improvements"],
  ["Sunnyvale", "Mid-century and modern home remodels"],
  ["Saratoga", "High-touch renovations and outdoor living"],
  ["Los Gatos", "Custom remodeling and property upgrades"],
];

const process = [
  {
    step: "01",
    title: "Discover",
    text: "We start with your goals, property, priorities and the way you want the finished space to feel.",
  },
  {
    step: "02",
    title: "Plan + Design",
    text: "Scope, selections, feasibility and budget direction come together before construction begins.",
  },
  {
    step: "03",
    title: "Prepare",
    text: "Plans, engineering, trade coordination and permit requirements are organized into one roadmap.",
  },
  {
    step: "04",
    title: "Build",
    text: "Your project moves forward with structured communication, attentive oversight and respect for your home.",
  },
  {
    step: "05",
    title: "Complete",
    text: "Final details are reviewed carefully so the space feels resolved, cohesive and ready to live in.",
  },
];

const faqs = [
  {
    question: "What types of projects does FORMA take on?",
    answer:
      "FORMA supports kitchen and bathroom remodels, ADUs, additions, roofing, landscaping, painting and coordinated whole-home improvements throughout the South Bay.",
  },
  {
    question: "Can you help with design and permits?",
    answer:
      "Yes. The design-build approach is intended to connect early planning, design decisions, documentation, city requirements and construction into a more coordinated path. Exact requirements vary by city and project scope.",
  },
  {
    question: "How early should we contact you?",
    answer:
      "The earlier the better—especially for an ADU, structural remodel or addition. Early feasibility work helps reveal site, budget and permit considerations before decisions become expensive to change.",
  },
  {
    question: "Do you work throughout the South Bay?",
    answer:
      "The core service area includes San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos.",
  },
  {
    question: "How do we begin?",
    answer:
      "Start with a focused consultation. Share the project type, property details, priorities and finish direction so the first conversation can begin with useful context.",
  },
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="FORMA Design + Build home">
          <img
            src="/images/forma-logo-transparent.png"
            alt="FORMA Design + Build"
          />
        </a>

        <nav className="desktop-nav" aria-label="Main menu">
          <a href="#top">Home</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#areas">Service Areas</a>
        </nav>

        <a
          className="header-cta"
          href="#consultation"
          aria-label="Go to project consultation section"
        >
          Get a Free Consultation
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile menu">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#areas">Service Areas</a>
            <a href="#consultation">Start a Project</a>
          </nav>
        </details>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">South Bay General Contractor</p>
          <h1 id="hero-title">
            Build Your South Bay Home Around the Way You Live.
          </h1>
          <p className="hero-intro">
            Full-service remodeling, additions and outdoor construction across
            San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale,
            Saratoga and Los Gatos.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#consultation">
              Get a Free Project Consultation
            </a>
            <a className="button button-secondary" href="#projects">
              View Our Work
            </a>
          </div>
          <div className="trust-line" aria-label="FORMA benefits">
            <span className="trust-mark" aria-hidden="true">
              ✓
            </span>
            <span>Design-led</span>
            <i />
            <span>One accountable team</span>
            <i />
            <span>Local South Bay focus</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/images/hero-indoor-outdoor.png"
            alt="Bright white oak kitchen opening to a landscaped California courtyard"
          />
          <div className="hero-trust-card">
            <img
              src="/images/forma-logo-transparent.png"
              alt=""
              aria-hidden="true"
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
            is approached with the same attention to function, flow and finish.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article
              className={`service-card ${service.image ? "service-card-image" : ""}`}
              key={service.title}
            >
              {service.image && (
                <img src={service.image} alt="" aria-hidden="true" />
              )}
              <div className="service-card-content">
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#consultation" aria-label={`Discuss ${service.title}`}>
                  Discuss your project <b aria-hidden="true">↗</b>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="project-copy">
          <p className="eyebrow">Bright California living</p>
          <h2>Spaces that connect everyday life with the best of the Bay Area.</h2>
          <p>
            Natural materials, effortless circulation and a strong relationship
            between indoors and out create homes that feel calm, useful and
            enduring.
          </p>
          <a className="text-link" href="#consultation">
            Explore a project with us <span>↗</span>
          </a>
        </div>

        <div className="project-gallery">
          <figure className="project-main">
            <img
              src="/images/hero-indoor-outdoor.png"
              alt="Indoor-outdoor kitchen and courtyard design inspiration"
            />
            <figcaption>
              <span>Indoor + outdoor living</span>
              <small>Kitchen · Landscape · Entertaining</small>
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/kitchen-remodel.png"
              alt="White oak and stone kitchen design inspiration"
            />
            <figcaption>
              <span>Warm modern kitchen</span>
              <small>Cabinetry · Stone · Lighting</small>
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/bathroom-remodel.png"
              alt="White oak and green tile bathroom design inspiration"
            />
            <figcaption>
              <span>Restorative bathroom</span>
              <small>Tile · Millwork · Fixtures</small>
            </figcaption>
          </figure>
        </div>
        <p className="imagery-note">
          Representative design imagery used to communicate FORMA&apos;s visual
          direction.
        </p>
      </section>

      <section className="process-section">
        <div className="process-intro">
          <p className="eyebrow">A clearer way to build</p>
          <h2>From first conversation to final detail.</h2>
          <p>
            Every phase informs the next. That continuity helps protect the
            design intent, make decisions earlier and keep everyone moving in
            the same direction.
          </p>
        </div>
        <ol className="process-list">
          {process.map((item) => (
            <li key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="difference-section">
        <div className="difference-visual">
          <img
            src="/images/kitchen-remodel.png"
            alt="Detailed natural oak kitchen cabinetry"
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
            Every city has its own housing stock, review path and neighborhood
            character. The project plan should reflect those local conditions
            from day one.
          </p>
        </div>
        <div className="city-grid">
          {cities.map(([city, description], index) => (
            <article key={city}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{city}</h3>
              <p>{description}</p>
              <a href="#consultation" aria-label={`Plan a project in ${city}`}>
                Plan a project <b>↗</b>
              </a>
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
        </div>
        <div className="consultation-card">
          <span className="consultation-number">01 / INITIAL CONSULTATION</span>
          <h3>A thoughtful project starts with a clear conversation.</h3>
          <p>
            Bring the project type, property details and the way you want the
            finished home to feel. FORMA will help organize the next questions.
          </p>
          <span
            className="button button-gold button-disabled"
            aria-disabled="true"
          >
            Consultation Contact <span>→</span>
          </span>
          <small>
            The verified phone, WhatsApp or email will be connected here before
            campaign launch.
          </small>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <img
            src="/images/forma-logo-transparent.png"
            alt="FORMA Design + Build"
          />
          <p>
            Thoughtful design. Coordinated construction. Homes made for South
            Bay living.
          </p>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-links">
          <div>
            <strong>Services</strong>
            <a href="#services">Kitchen + Bathroom</a>
            <a href="#services">ADUs + Additions</a>
            <a href="#services">Roofing + Painting</a>
            <a href="#services">Landscaping</a>
          </div>
          <div>
            <strong>Explore</strong>
            <a href="#projects">Project Vision</a>
            <a href="#about">About FORMA</a>
            <a href="#areas">Service Areas</a>
            <a href="#consultation">Start a Project</a>
          </div>
          <div>
            <strong>South Bay</strong>
            <span>San Jose · Fremont</span>
            <span>Santa Clara · Palo Alto</span>
            <span>Milpitas · Sunnyvale</span>
            <span>Saratoga · Los Gatos</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FORMA Design + Build</span>
          <span>South Bay, California</span>
        </div>
      </footer>
    </main>
  );
}
