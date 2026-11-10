import Link from "next/link";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { pageMetadata, siteUrl, serializeJsonLd } from "../seo";

const title = "San Jose Remodeling Planning Guide | FORMA Design + Build";
const description = "Plan a San Jose remodel: define your scope, compare proposals, prepare for permits and choose materials. A practical South Bay homeowner checklist.";
const path = "/remodeling-planning-guide";
export const metadata = pageMetadata(title, description, path);

export default function PlanningGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${siteUrl}${path}#webpage`, url: `${siteUrl}${path}`, name: title, description, inLanguage: "en-US", isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@type": "Thing", name: "Home remodeling planning" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Remodeling planning guide", item: `${siteUrl}${path}` },
      ] },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    <Navigation />
    <main id="main-content" className="content-page planning-guide">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Remodeling planning guide</span></nav>
      <header>
        <p className="eyebrow">For San Jose + South Bay homeowners</p>
        <h1>How to plan a home remodel in San Jose</h1>
        <p>Start by defining the work, checking the property constraints and comparing proposals with the same scope. Layout, materials, permits and access affect one another. Resolving these questions early gives you a more useful starting point than choosing finishes alone.</p>
      </header>
      <nav className="guide-contents" aria-label="In this guide">
        <strong>In this guide</strong>
        <Link href="#scope">Define the scope</Link><Link href="#budget">Compare proposals</Link><Link href="#permits">Check permits</Link><Link href="#materials">Plan materials and access</Link><Link href="#consultation-checklist">Prepare for a consultation</Link>
      </nav>
      <section id="scope">
        <h2>1. Define what needs to change</h2>
        <p>Describe the problem you want to solve before choosing products. A cramped kitchen may need better circulation, not more cabinetry. A bathroom may need ventilation and waterproofing work as well as new finishes. Identify what must stay, what can move and what would make the biggest difference to daily use.</p>
        <ul><li>List essential improvements separately from optional upgrades.</li><li>Record existing dimensions and the areas included in the project.</li><li>Note known leaks, damage, utility limitations or previous alterations.</li><li>Consider whether adjacent rooms or outdoor access are affected.</li></ul>
        <p>Use the service guides for <Link href="/services/kitchen-remodeling">kitchen remodeling</Link>, <Link href="/services/bathroom-remodeling">bathroom remodeling</Link>, <Link href="/services/landscaping">landscaping</Link> and <Link href="/services/interior-exterior-painting">interior and exterior painting</Link> to refine your scope.</p>
      </section>
      <section id="budget">
        <h2>2. Compare scope before comparing price</h2>
        <p>A useful proposal makes the included work clear. Ask how demolition, preparation, installation, cleanup and any required design or review work are handled. Clarify allowances: an allowance is a budget placeholder, not confirmation that every product you might choose is included.</p>
        <ul><li>Which work and materials are included or excluded?</li><li>Which selections are allowances, and how are changes priced?</li><li>How are concealed conditions documented and discussed?</li><li>Who coordinates permits, inspections and subcontractors?</li><li>How will scope changes and payments be documented?</li></ul>
        <p>There is no reliable single price or construction duration for every remodel. Layout changes, existing conditions, product selections and review requirements all affect the plan. Ask for a project-specific scope rather than treating a general online range as a quote.</p>
      </section>
      <section id="permits">
        <h2>3. Confirm the property jurisdiction and permit path</h2>
        <p>Requirements depend on where the property is located and the work proposed. Structural, plumbing and electrical changes can require review or inspections. Confirm requirements with the responsible building department before construction; a mailing address alone may not establish jurisdiction.</p>
        <p>For a San Jose property, start with the <a href="https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division">City of San Jose Building Division</a>. For other locations in our <Link href="/service-areas">South Bay service area</Link>, use the relevant city or county department. Official requirements take priority over general planning guidance.</p>
        <p>Before selecting a contractor, use the <a href="https://www.cslb.ca.gov/">California Contractors State License Board</a> to check the current license record and review its consumer guidance. FORMA’s published contractor license number is 1162108.</p>
      </section>
      <section id="materials">
        <h2>4. Coordinate materials, sequencing and daily life</h2>
        <p>Confirm key dimensions before ordering cabinets, appliances or fixtures. Ask which selections must be finalized before construction and what happens if a product becomes unavailable. Build a plan for access, deliveries, dust separation, storage and any temporary loss of cooking or bathing facilities.</p>
        <p>For outdoor work, discuss drainage, existing planting and construction access. For painting, clarify preparation and repairs before selecting colors. A realistic sequence connects these decisions rather than treating each trade as a separate project.</p>
      </section>
      <section id="consultation-checklist">
        <h2>5. Prepare for the first conversation</h2>
        <ul><li>The property city and the rooms or outdoor areas involved.</li><li>Your main goals and must-have improvements.</li><li>A budget direction, if known, and any timing constraints.</li><li>Known property issues, plans or previous project documents.</li><li>Reference images that explain your preferences, clearly separated from existing-condition photos.</li><li>Questions about scope, permits, materials and communication.</li></ul>
        <p>FORMA Design + Build is based in San Jose and serves South Bay homeowners. Share your project details to discuss the scope and next steps.</p>
        <Link className="button button-primary" href="/#consultation">Discuss your remodeling project</Link>
      </section>
    </main>
    <SeoFooter />
  </>;
}
