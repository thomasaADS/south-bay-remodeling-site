import Link from "next/link";
import { business } from "../business";
import { guides } from "../guide-content";
import { Navigation } from "../site-interactions";
import { SeoFooter } from "../seo-footer";
import { breadcrumbSchema, pageMetadata, serializeJsonLd, webPageSchema } from "../seo";
import { services } from "../site-data";

const title = "San Jose Remodeling Planning Guide | FORMA Design + Build";
const description = "Plan a San Jose remodel step by step: scope, budget, contractor checks, permits, materials and timeline. A practical checklist for homeowners.";
const path = "/remodeling-planning-guide";
export const metadata = pageMetadata(title, description, path);

const sanJoseBuilding = "https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division";

export default function PlanningGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { ...webPageSchema(title, description, path), about: { "@type": "Thing", name: "Home remodeling planning" } },
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Remodeling planning guide", path }]),
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    <Navigation />
    <main id="main-content" className="content-page planning-guide">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Remodeling planning guide</span></nav>
      <header>
        <p className="eyebrow">For San Jose + South Bay homeowners</p>
        <h1>How to plan a home remodel in San Jose</h1>
        <p>Start by defining the work, checking the property constraints and comparing proposals with the same scope. Layout, materials, permits and access affect one another. Resolving these questions early gives you a more useful starting point than choosing finishes alone.</p>
        <p>This guide follows the order in which decisions are best made. It applies to a single bathroom as much as to a whole-house project, and it is written for homes in San Jose and the surrounding South Bay cities.</p>
      </header>
      <nav className="guide-contents" aria-label="In this guide">
        <strong>In this guide</strong>
        <Link href="#scope">Define the scope</Link><Link href="#project-type">Plan by project type</Link><Link href="#budget">Set a budget</Link><Link href="#proposals">Compare proposals</Link><Link href="#contractor">Check the contractor</Link><Link href="#permits">Check permits</Link><Link href="#timeline">Plan the timeline</Link><Link href="#materials">Plan materials and access</Link><Link href="#consultation-checklist">Prepare for a consultation</Link>
      </nav>

      <section id="scope">
        <h2>1. Define what needs to change</h2>
        <p>Describe the problem you want to solve before choosing products. A cramped kitchen may need better circulation, not more cabinetry. A bathroom may need ventilation and waterproofing work as well as new finishes. Identify what must stay, what can move and what would make the biggest difference to daily use.</p>
        <ul><li>List essential improvements separately from optional upgrades.</li><li>Record existing dimensions and the areas included in the project.</li><li>Note known leaks, damage, utility limitations or previous alterations.</li><li>Consider whether adjacent rooms or outdoor access are affected.</li></ul>
        <p>Write the scope as a short list of outcomes, such as &ldquo;seat four at an island&rdquo; or &ldquo;a shower we can step into without a curb.&rdquo; Outcomes are easier for a designer or contractor to price than a list of products, and they leave room for a better solution than the one you first imagined.</p>
        <p>It also helps to decide how long you expect to stay in the house. A remodel for the next twenty years justifies different choices than one made ahead of a sale in three.</p>
      </section>

      <section id="project-type">
        <h2>2. Plan by project type</h2>
        <p>Each kind of project has its own first decision. Use the service pages below to go deeper once you know which applies.</p>
        <h3>Kitchens</h3>
        <p>Decide whether the sink, range and refrigerator stay where they are. That single choice determines how much plumbing, gas, electrical and structural work is involved. Then list your appliances, because cabinet drawings depend on their exact dimensions. See <Link href="/services/kitchen-remodeling">kitchen remodeling in San Jose</Link> for scope, timeline and permit detail.</p>
        <h3>Bathrooms</h3>
        <p>Decide whether the drains move, and whether you want a tub, a shower or both. Waterproofing and ventilation matter more to the life of the room than any visible finish. See <Link href="/services/bathroom-remodeling">bathroom remodeling in San Jose</Link>.</p>
        <h3>Home additions and ADUs</h3>
        <p>Find out what the lot allows before drawing anything. Setbacks, lot coverage, floor area ratio and height limits define the buildable area, and an addition can go up or out. See <Link href="/services/home-additions">home additions in San Jose</Link>, which covers room additions, second-story additions and ADUs.</p>
        <h3>Landscaping</h3>
        <p>Start with how you want to use the yard and where water goes when it rains. Hardscape, drainage and grading come before planting. See <Link href="/services/landscaping">landscaping in San Jose</Link>.</p>
        <h3>Painting</h3>
        <p>Name the surfaces and look closely at their condition. Preparation and repair decide how long a paint job lasts. See <Link href="/services/interior-exterior-painting">interior and exterior painting in San Jose</Link>.</p>
      </section>

      <section id="budget">
        <h2>3. Set a budget direction</h2>
        <p>You do not need a precise figure before talking to a contractor, but you do need a direction. Decide the most you are prepared to spend, then work backward. A realistic remodeling budget has four parts, and owners often plan for only the first.</p>
        <ul>
          <li><strong>Construction:</strong> labor, materials and the contractor&apos;s overhead for the defined scope.</li>
          <li><strong>Soft costs:</strong> design, engineering, energy calculations, permit and plan-check fees.</li>
          <li><strong>Selections you supply:</strong> appliances, light fixtures or furnishings that sit outside the construction contract.</li>
          <li><strong>Contingency:</strong> a reserve for concealed conditions, which are common in older South Bay homes.</li>
        </ul>
        <p>Add the cost of living through the project: meals out while the kitchen is down, storage, or temporary housing during a second-story addition. If the budget and the wish list do not match, reduce the scope before you reduce the quality of the work that cannot be seen later, such as waterproofing, wiring and structure.</p>
        <p>There is no reliable single price or construction duration for every remodel. Layout changes, existing conditions, product selections and review requirements all affect the plan. Ask for a project-specific scope rather than treating a general online range as a quote.</p>
      </section>

      <section id="proposals">
        <h2>4. Compare scope before comparing price</h2>
        <p>A useful proposal makes the included work clear. Ask how demolition, preparation, installation, cleanup and any required design or review work are handled. Clarify allowances: an allowance is a budget placeholder, not confirmation that every product you might choose is included.</p>
        <ul><li>Which work and materials are included or excluded?</li><li>Which selections are allowances, and how are changes priced?</li><li>How are concealed conditions documented and discussed?</li><li>Who coordinates permits, inspections and subcontractors?</li><li>How will scope changes and payments be documented?</li></ul>
        <p>For a kitchen, ask whether cabinet installation, countertop templating and appliance connections appear as separate line items. For a bathroom, compare the preparation beneath the tile, not just the tile allowance: ask who supplies the drain, waterproofing system and shower glass. Use the <Link href="/services/kitchen-remodeling#planning-options">kitchen planning checklist</Link> or the <Link href="/services/bathroom-remodeling#planning-options">bathroom planning checklist</Link> to note what each proposal leaves open.</p>
        <p>When two bids are far apart, the difference is almost always in the scope and not in the margin. Line the proposals up item by item before concluding that one contractor is simply cheaper.</p>
      </section>

      <section id="contractor">
        <h2>5. Check the contractor before you sign</h2>
        <p>California requires a contractor&apos;s license for any project valued above a low dollar threshold in combined labor and materials. Use the <a href="https://www.cslb.ca.gov/" target="_blank" rel="noopener noreferrer">California Contractors State License Board</a> to check that the license is active, see its classification and confirm that a bond and workers&apos; compensation coverage are on file. FORMA&apos;s license number is {business.license} ({business.licenseClass}), and you can <a href={business.licenseUrl} target="_blank" rel="noopener noreferrer">view the record on the CSLB website</a>.</p>
        <p>State law also protects you in the contract itself. A home improvement contract must be in writing and include the start and completion dates, a payment schedule and a description of the work. The down payment is limited to 10 percent of the contract price or $1,000, whichever is less, and progress payments may not run ahead of the work completed. Ask for a certificate of insurance, and ask how lien releases are provided as subcontractors and suppliers are paid.</p>
        <p>With a design-build contractor, the same company is responsible for the design and the construction. That removes the most common source of disputes, which is a gap between what the drawings show and what the builder priced.</p>
      </section>

      <section id="permits">
        <h2>6. Confirm the property jurisdiction and permit path</h2>
        <p>Requirements depend on where the property is located and the work proposed. Structural, plumbing and electrical changes can require review or inspections. Confirm requirements with the responsible building department before construction; a mailing address alone may not establish jurisdiction.</p>
        <p>As a general rule, finish work such as painting, flooring, and replacing cabinets or countertops in place does not need a building permit. Moving or adding plumbing, gas, circuits, ducting, windows or walls does. Additions always do. Work done without a required permit can surface later during a sale, an insurance claim or the next remodel, and correcting it then costs more than permitting it now.</p>
        <p>For a San Jose property, start with the <a href={sanJoseBuilding} target="_blank" rel="noopener noreferrer">City of San Jose Building Division</a>. For other locations, see the city pages in our <Link href="/service-areas">South Bay service area</Link>, each of which names the local building department. Official requirements take priority over general planning guidance.</p>
      </section>

      <section id="timeline">
        <h2>7. Plan the timeline backward</h2>
        <p>A remodel has three phases: design and selections, permits and ordering, and construction. The first two often take as long as the third. If you want a kitchen finished before a particular date, count backward through construction, cabinet lead time and plan review to find the date by which the design has to be complete.</p>
        <p>Three habits protect a schedule. Finish the design before demolition. Order long-lead items early and get delivery dates in writing. Make decisions once, because changes after work begins mean reordering materials and repeating inspections. For typical ranges by project type, read <Link href="/guides/how-long-does-a-remodel-take-bay-area">how long a remodel takes in the Bay Area</Link>.</p>
      </section>

      <section id="materials">
        <h2>8. Coordinate materials, sequencing and daily life</h2>
        <p>Confirm key dimensions before ordering cabinets, appliances or fixtures. Ask which selections must be finalized before construction and what happens if a product becomes unavailable. Build a plan for access, deliveries, dust separation, storage and any temporary loss of cooking or bathing facilities.</p>
        <p>For outdoor work, discuss drainage, existing planting and construction access. For painting, clarify preparation and repairs before selecting colors. A realistic sequence connects these decisions rather than treating each trade as a separate project.</p>
        <p>If you will live in the house during the work, agree on working hours, which bathroom the crew uses, where materials are stored and how the site is left at the end of each day. If you have pets or small children, say so at the start.</p>
      </section>

      <section id="consultation-checklist">
        <h2>9. Prepare for the first conversation</h2>
        <ul><li>The property city and the rooms or outdoor areas involved.</li><li>Your main goals and must-have improvements.</li><li>A budget direction, if known, and any timing constraints.</li><li>Known property issues, plans or previous project documents.</li><li>Reference images that explain your preferences, clearly separated from existing-condition photos.</li><li>Questions about scope, permits, materials and communication.</li></ul>
        <p>FORMA Design + Build is based in San Jose and serves South Bay homeowners. A first consultation is free. Share your project details to discuss the scope and next steps.</p>
        <Link className="button button-primary" href="/#consultation">Book a free consultation</Link>
      </section>

      <section id="further-reading">
        <h2>Further reading</h2>
        <ul>
          {guides.map((guide) => <li key={guide.slug}><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></li>)}
        </ul>
        <p>Service pages: {services.map((service, index) => <span key={service.slug}>{index > 0 && ", "}<Link href={`/services/${service.slug}`}>{service.title}</Link></span>)}.</p>
      </section>
    </main>
    <SeoFooter />
  </>;
}
