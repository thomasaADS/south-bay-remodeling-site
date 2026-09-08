import Image from "next/image";
import { Navigation, ProjectJourney } from "./site-interactions";
import { ConsultationForm } from "./consultation-form";

const instagram = "https://www.instagram.com/formadpb/";
const services = [
  {
    title: "Kitchen remodeling",
    text: "A better place to cook, gather and spend time together. We connect the layout, cabinetry, lighting and surfaces around the way your household lives.",
    details: "Layout planning · Cabinetry · Surfaces · Lighting",
  },
  {
    title: "Bathroom remodeling",
    text: "A calm start and a comfortable finish to every day. From guest bathrooms to primary suites, we balance practical layouts with considered materials and finish details.",
    details: "Space planning · Tile · Fixtures · Millwork",
  },
  {
    title: "ADU construction",
    text: "More possibilities within the property you already love. Explore a detached ADU, attached unit or garage conversion with site conditions and local requirements in view from the beginning.",
    details: "Feasibility · Design · Permit coordination · Construction",
  },
  {
    title: "Home additions",
    text: "Room for what comes next. We approach new living areas as a natural extension of the existing home, with attention to structure, proportions and the connection between spaces.",
    details: "Space planning · Structural coordination · Integrated finishes",
  },
  {
    title: "Roofing",
    text: "Protect the home from the outside in. Roof replacement, repairs and weatherproofing are coordinated with the wider needs of the property.",
    details: "Replacement · Repairs · Weatherproofing",
  },
  {
    title: "Landscaping",
    text: "Give life a little more room outdoors. Planting, hardscape, decks and gathering spaces bring the South Bay’s indoor-outdoor lifestyle closer to home.",
    details: "Outdoor living · Hardscape · Planting · Decks",
  },
  {
    title: "Interior + exterior painting",
    text: "The finish that brings everything together. Careful preparation and a considered color direction help every surface feel connected to the architecture.",
    details: "Surface preparation · Interior finishes · Exterior finishes",
  },
];
const cities = [
  "San Jose",
  "Fremont",
  "Santa Clara",
  "Palo Alto",
  "Milpitas",
  "Sunnyvale",
  "Saratoga",
  "Los Gatos",
];
const faqs = [
  {
    question: "What types of projects do you take on?",
    answer:
      "Kitchen and bathroom remodeling, ADUs, additions, roofing, landscaping, painting and coordinated whole-home improvements throughout the South Bay.",
  },
  {
    question: "Can you help with design and permits?",
    answer:
      "Our design-build approach connects planning, design decisions, documentation and construction. Permit and engineering requirements are reviewed for your city and the scope of your project.",
  },
  {
    question: "When should we start the conversation?",
    answer:
      "As early as you can, especially for an ADU, structural remodel or addition. Discussing feasibility, priorities and budget direction early helps you make better-informed decisions.",
  },
  {
    question: "Where do you work?",
    answer:
      "Our core service area includes San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos.",
  },
  {
    question: "How do we get started?",
    answer:
      "Tell us about your project using the consultation form below. Your city, project type and a few priorities are enough to start the conversation.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/images/hero-indoor-outdoor.png"
            alt="Design inspiration: an oak kitchen opening onto a California courtyard"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="hero-topline">
            <span>South Bay, California</span>
            <span>Design + Build</span>
          </div>
          <div className="hero-content">
            <p className="eyebrow">Homes, thoughtfully reimagined.</p>
            <h1 id="hero-title">
              From plan
              <br />
              to <em>place.</em>
            </h1>
            <div className="hero-bottom">
              <div>
                <p>
                  Remodeling, additions and outdoor living.
                  <br className="desktop-break" /> One team, from first idea to
                  final detail.
                </p>
                <a className="button button-light" href="#consultation">
                  Let’s talk about your home
                </a>
              </div>
              <a className="hero-explore" href="#projects">
                <span>Explore the vision</span>
              </a>
            </div>
          </div>
          <span className="hero-caption">Design inspiration</span>
        </section>
        <div className="intro-strip">
          <p>
            Good design. Clear direction. <span>A place to call your own.</span>
          </p>
          <a href="#about">Meet FORMA</a>
        </div>

        <section
          className="vision section-pad"
          id="projects"
          aria-labelledby="vision-title"
        >
          <div className="section-meta">
            <span>01 / The vision</span>
            <span>Made for everyday life</span>
          </div>
          <div className="section-heading">
            <h2 id="vision-title">
              Beautiful is a feeling.
              <br />
              <em>Make it yours.</em>
            </h2>
            <p>
              Morning light. Room to gather. Materials that feel right. We start
              with how you want to live, then bring the details into focus.
            </p>
          </div>
          <div className="vision-grid">
            <figure className="vision-kitchen">
              <div className="vision-image">
                <Image
                  src="/images/kitchen-remodel.png"
                  alt="Kitchen design inspiration with natural oak cabinetry and stone surfaces"
                  fill
                  sizes="(max-width: 520px) 100vw, 58vw"
                />
                <span className="image-index">01</span>
              </div>
              <figcaption>
                <div>
                  <span className="eyebrow">Kitchen / Design inspiration</span>
                  <h3>The heart of the home.</h3>
                </div>
                <a href="#services" aria-label="Explore kitchen remodeling">
                  Explore
                </a>
              </figcaption>
              <p className="material-note">
                Natural oak. Quiet stone. Space to come together.
              </p>
            </figure>
            <figure className="vision-bath">
              <div className="vision-image">
                <Image
                  src="/images/bathroom-remodel.png"
                  alt="Bathroom design inspiration with oak millwork, green tile and soft lighting"
                  fill
                  sizes="(max-width: 520px) 100vw, 40vw"
                />
                <span className="image-index">02</span>
              </div>
              <figcaption>
                <div>
                  <span className="eyebrow">Bathroom / Design inspiration</span>
                  <h3>A little more calm.</h3>
                </div>
                <a href="#services" aria-label="Explore bathroom remodeling">
                  Explore
                </a>
              </figcaption>
              <p className="material-note">
                Considered storage. Tactile finishes. Everyday ease.
              </p>
            </figure>
          </div>
          <div className="vision-footnote">
            <p>
              These images illustrate design possibilities, rather than
              completed FORMA projects.
            </p>
            <a
              className="text-link"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit FORMA on Instagram (opens in a new tab)"
            >
              More from FORMA on Instagram
            </a>
          </div>
        </section>

        <section
          className="about section-pad"
          id="about"
          aria-labelledby="about-title"
 …1544 tokens truncated…>
        <div className="footer-top">
          <a className="footer-brand" href="#top" aria-label="FORMA home">
            <Image
              src="/images/forma-logo-transparent.png"
              alt="FORMA Design + Build"
              width={300}
              height={75}
            />
          </a>
          <p>
            Thoughtful homes.
            <br />
            South Bay, California.
          </p>
          <nav aria-label="Footer menu">
            <a href="#projects">The vision</a>
            <a href="#services">Our expertise</a>
            <a href="#about">About FORMA</a>
            <a href="#areas">Service areas</a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FORMA on Instagram (opens in a new tab)"
            >
              Instagram
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FORMA Design + Build</span>
          <span>From plan to place.</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
