import { business } from "./business";

export type Service = {
  slug: string;
  number: string;
  title: string;
  h1: string;
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  planningNote: string;
  text: string;
  image?: string;
  /** Describes the photo itself. These are design-inspiration images, not FORMA projects. */
  imageAlt?: string;
  /** True when `image` is a photo of a completed FORMA project, not design inspiration. */
  imageIsProject?: boolean;
  intro: string;
  includes: string[];
  planning: string[];
  questions: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    number: "01",
    title: "Kitchen Remodeling",
    h1: "Kitchen Remodeling in San Jose, CA",
    shortTitle: "Kitchens",
    seoTitle: "Kitchen Remodeling San Jose | Licensed Design-Build | FORMA",
    metaDescription: "Kitchen remodeling in San Jose by a licensed design-build contractor (CSLB #1162108). Layout, cabinets, permits and build. Book a free consultation.",
    planningNote: "Before comparing kitchen proposals, decide whether the layout will stay in place or move. Cabinet dimensions, appliance specifications and utility locations affect each other. Separate essential improvements from optional finishes, and ask what demolition, electrical, plumbing and installation work each proposal includes.",
    text: "Thoughtful layouts, custom cabinetry, lighting, surfaces and finish details designed around how your household actually lives.",
    image: "/images/projects/san-jose-kitchen-remodel-open-plan.webp",
    imageAlt: "Kitchen remodel in San Jose with an island, built-in wine storage and an open dining area",
    imageIsProject: true,
    intro: "Keeping the sink and appliances in place is a different job from opening the kitchen to the next room. As a San Jose kitchen remodeling contractor, FORMA helps you define the layout, cabinetry, utilities and installation work to include in your proposal.",
    includes: ["Layout and circulation planning", "Cabinetry and storage direction", "Countertops, tile and finish coordination", "Lighting and electrical planning", "Appliance and fixture coordination", "Construction and finish work"],
    planning: ["How the household cooks, gathers and entertains", "Existing plumbing, electrical and structural conditions", "Storage priorities and appliance requirements", "Material durability, maintenance and budget direction"],
    questions: [
      { question: "What affects the cost of a kitchen remodel?", answer: "Layout changes, cabinet construction, appliance requirements, countertop materials and existing plumbing or electrical conditions all affect scope. A useful estimate identifies allowances, exclusions and the work needed before finishes are installed. A project-specific review is needed before quoting a price." },
      { question: "Should I plan for a temporary kitchen?", answer: "Discuss how cooking, refrigeration, water access and dust separation will work during construction. Ask which areas remain accessible and how deliveries or utility interruptions will be coordinated before work starts." },
      { question: "Can the kitchen layout be changed?", answer: "Often, yes. The practical options depend on the existing structure, plumbing, electrical service and the relationship to adjacent rooms." },
      { question: "When should cabinets and appliances be selected?", answer: "Key dimensions and lead times should be coordinated early so the layout, utilities and construction sequence stay aligned." },
      { question: "How long does a kitchen remodel take in San Jose?", answer: "Plan on roughly 3 to 6 weeks for design and selections, 4 to 10 weeks for permits and cabinet lead time, and 6 to 12 weeks of construction for a full remodel. These are general planning ranges; moving walls, upgrading the electrical panel or finding concealed damage adds time." },
      { question: "Do I need a permit to remodel my kitchen in San Jose?", answer: "Cosmetic work such as painting, flooring and replacing cabinets or countertops in place generally does not need a permit. Adding or moving plumbing, gas, electrical circuits, ducting or walls does. FORMA confirms the requirement with the City of San Jose Building Division for your address and handles the application and inspections." },
      { question: "Is FORMA licensed to remodel kitchens in California?", answer: "Yes. FORMA Design + Build holds California contractor license #1162108 with a B - General Building classification, has a contractor's bond on file with the CSLB and carries general liability and workers' compensation coverage. You can verify the license on the CSLB website." },
    ],
  },
  {
    slug: "bathroom-remodeling",
    number: "02",
    title: "Bathroom Remodeling",
    h1: "Bathroom Remodeling in San Jose, CA",
    shortTitle: "Bathrooms",
    seoTitle: "Bathroom Remodeling San Jose | Licensed Design-Build | FORMA",
    metaDescription: "Bathroom remodeling in San Jose by a licensed design-build contractor (CSLB #1162108). Showers, tile, plumbing and permits. Book a free consultation.",
    planningNote: "Start a bathroom scope with layout, moisture control and daily use. A shower conversion can affect the drain, floor build-up, waterproofing and door clearances. Confirm these details before ordering tile or fixtures so the finished design can be built within the available space.",
    text: "Calm, highly functional bathrooms—from efficient guest baths to complete primary-suite transformations.",
    image: "/images/projects/san-jose-bathroom-remodel-green-vanity.webp",
    imageAlt: "Bathroom remodel in San Jose with a green vanity, an oval backlit mirror and a glass-enclosed tiled shower",
    imageIsProject: true,
    intro: "Replacing a vanity, converting a tub to a shower and moving fixtures are three different construction scopes. FORMA helps San Jose homeowners plan the plumbing, waterproofing, ventilation and finish work their bathroom remodel needs.",
    includes: ["Layout and fixture planning", "Shower and waterproofing scope", "Tile and finish coordination", "Vanity, storage and lighting direction", "Plumbing and ventilation coordination", "Construction and finish work"],
    planning: ["Fixture locations and comfortable clearances", "Waterproofing and moisture control", "Lighting for daily use and atmosphere", "Storage, accessibility and long-term needs"],
    questions: [
      { question: "What bathroom design services are part of a San Jose remodel?", answer: "For a remodeling project, design planning starts with the bathroom layout, fixture positions, storage and lighting. Those choices guide plumbing, ventilation and waterproofing. Bring room dimensions and photos so the design and construction scope can be discussed together." },
      { question: "What affects the cost of bathroom remodeling?", answer: "Moving fixtures, repairing concealed water damage, changing the shower layout and selecting tile or custom cabinetry can change the scope. Compare proposals by the preparation, waterproofing, ventilation and installation work included, rather than finishes alone." },
      { question: "Does a bathroom remodel need a permit?", answer: "Permit requirements depend on the property jurisdiction and the proposed work. Plumbing, electrical or structural changes may require review. Confirm the scope with the local building department before construction; do not assume a cosmetic update and a full remodel follow the same process." },
      { question: "Can a tub become a walk-in shower?", answer: "In many homes it can. The final approach depends on drainage, waterproofing, available space and any applicable permit requirements." },
      { question: "What should be selected first?", answer: "The layout, plumbing fixtures and major finish direction should be established early because they influence dimensions and rough-in work." },
      { question: "How long does a bathroom remodel take?", answer: "As a general planning range, allow 2 to 4 weeks for design and selections and 3 to 8 weeks of construction. A hall bath that keeps its layout is at the short end; a reconfigured primary bath with custom glass is at the long end." },
      { question: "Can we stay in the house during a bathroom remodel?", answer: "Usually, yes. If the home has a second bathroom the disruption is modest. If it is the only bathroom, tell us at the start so the work can be sequenced to keep a toilet and shower in service for as long as possible." },
    ],
  },
  {
    slug: "home-additions",
    number: "03",
    title: "Home Additions",
    h1: "Home Additions in San Jose, CA",
    shortTitle: "Home additions",
    seoTitle: "Home Additions in San Jose | Licensed Design-Build | FORMA",
    metaDescription: "Home additions in San Jose: room additions, second stories and ADUs by a licensed design-build contractor (CSLB #1162108). Book a free consultation.",
    planningNote: "Before sketching a floor plan, find out what your lot allows. Setbacks, lot coverage, floor area ratio and height limits decide where an addition can go and how large it can be. Note where utilities enter the house, where the yard slopes and which trees you want to keep, because each of these affects the foundation and the layout.",
    text: "Room additions, second-story additions and ADUs that add space on the lot you already own, from feasibility through final inspection.",
    intro: "Add the space your household needs without leaving the neighborhood. FORMA designs and builds room additions, second-story additions, ADUs and whole-home expansion in San Jose, with zoning, engineering, permits and construction handled as one scope.",
    includes: ["Zoning and feasibility review", "Architectural design and structural engineering", "Room additions and primary suites", "Second-story additions", "ADUs, junior ADUs and garage conversions", "Permits, construction and final inspection"],
    planning: ["Setbacks, lot coverage and height limits for your lot", "Building up versus building out", "Capacity of the existing foundation, panel and utilities", "Where the household will live during construction"],
    questions: [
      { question: "How much does a home addition cost in San Jose?", answer: "It depends on the size, whether you build up or out, the foundation and site conditions, and whether the new space includes a kitchen or bathroom. Design, engineering and city fees are additional to construction. FORMA prices an addition from a defined scope after a feasibility review; no single per-square-foot figure is reliable for every lot." },
      { question: "Do I need a permit for a room addition in San Jose?", answer: "Yes. Every addition needs a building permit with plan review from the City of San Jose Building Division, plus plumbing, electrical and mechanical permits. Some larger houses and second-story additions also need a Single-Family House Permit from the Planning Division." },
      { question: "Is it cheaper to build up or build out?", answer: "Neither is always cheaper. Building out needs a new foundation and uses yard area. A second-story addition keeps the yard but requires structural upgrades to the existing house, a stair and usually moving out for part of the work. The lot, the existing structure and zoning limits decide which is practical." },
      { question: "How long does a home addition take?", answer: "As a general planning range, allow 6 to 12 weeks for feasibility and design, 2 to 4 months for plan review and permits, and 4 to 10 months of construction. A single-story room addition is at the short end and a second-story addition at the long end." },
      { question: "Can I build an ADU on my San Jose property?", answer: "Most single-family lots in San Jose can add an ADU. State law requires ministerial review of a complete application within 60 days and allows detached ADUs with 4-foot side and rear setbacks. San Jose sets its own size limits by lot size and offers preapproved ADU plans. FORMA verifies the current standards for your parcel." },
      { question: "What is the difference between an ADU and a room addition?", answer: "A room addition enlarges the main house and shares its kitchen and entrance. An ADU is a separate dwelling with its own entrance, kitchen and bathroom, and can be detached, attached or converted from a garage. The two follow different zoning rules and permit paths." },
      { question: "Can we live in the house during a home addition?", answer: "For most ground-floor room additions, yes, with dust separation and a clear plan for utility shutoffs. For a second-story addition the roof comes off, so most households move out for at least part of construction." },
      { question: "Will a home addition raise my property taxes?", answer: "In California, new construction is generally assessed at its current value and added to your existing assessed value, while the rest of the home keeps its existing base. The Santa Clara County Assessor makes that determination, so confirm the effect on your property with that office." },
    ],
  },
  {
    slug: "landscaping",
    number: "04",
    title: "Landscaping",
    h1: "Landscaping in San Jose, CA",
    shortTitle: "Landscaping",
    seoTitle: "Landscaping in San Jose | Licensed Design-Build | FORMA",
    metaDescription: "Landscaping in San Jose by a licensed design-build contractor (CSLB #1162108). Patios, decks, planting, drainage and lighting. Book a free consultation.",
    planningNote: "Map how people move from the house into the yard before choosing materials. Note where water collects, which areas need shade and how much maintenance you want to take on. Existing trees, slopes and access for construction can affect what is practical on the property.",
    text: "Outdoor rooms, hardscape, planting, decks and gathering spaces designed for the South Bay’s indoor-outdoor lifestyle.",
    intro: "Outdoor space works best when it is planned as an extension of the home. FORMA considers access, shade, privacy, drainage, planting and gathering areas as one connected composition.",
    includes: ["Outdoor-space programming", "Patio, path and hardscape direction", "Deck and gathering-area planning", "Planting and privacy strategy", "Drainage and lighting coordination", "Construction and finish integration"],
    planning: ["How the space will be used throughout the day", "Indoor-outdoor circulation and sightlines", "Sun, shade, privacy and maintenance", "Drainage, irrigation and material durability"],
    questions: [
      { question: "What should a landscaping project scope include?", answer: "Describe how the outdoor space will be used, the areas being changed, drainage concerns, planting needs and any lighting or irrigation work. Identify which existing features will stay so proposals can account for protection and integration." },
      { question: "Do decks or other outdoor structures need approval?", answer: "Requirements vary by city and project. Decks, retaining walls and other structures can involve building or planning review. Confirm the property jurisdiction and proposed dimensions with the local department before treating an outdoor improvement as permit-exempt." },
      { question: "Can landscaping be part of a larger remodel?", answer: "Yes. Coordinating exterior work with doors, kitchens, patios and site access often creates a more cohesive result." },
      { question: "What should be planned before selecting plants?", answer: "Use, circulation, drainage, sun exposure, privacy, irrigation and the hardscape layout should guide the planting direction." },
      { question: "Do I need a permit for a retaining wall or deck in San Jose?", answer: "Often, yes. A retaining wall more than 4 feet tall measured from the bottom of the footing needs a permit and engineering. Most decks that are attached to the house, more than 30 inches above grade or larger than 200 square feet need one too. On-grade patios and planting generally do not." },
      { question: "Do I need a permit to remove a tree in San Jose?", answer: "On private property, removing a tree with a trunk circumference of 38 inches or more, measured 4.5 feet above the ground, requires a tree removal permit from the city. Street trees are regulated separately. Confirm the current rule with the City of San Jose before any removal." },
      { question: "What plants do well in San Jose with little water?", answer: "California natives and other Mediterranean-climate plants are suited to San Jose's dry summers and mild, wet winters. Grouping plants by water need and using drip irrigation with a weather-based controller reduces water use further." },
      { question: "When is the best time to landscape in San Jose?", answer: "Hardscape can be built year-round outside of heavy rain. Planting can be done most of the year, but fall planting lets new plants establish roots during the rainy season before their first dry summer." },
    ],
  },
  {
    slug: "interior-exterior-painting",
    number: "05",
    title: "Interior + Exterior Painting",
    h1: "Interior + Exterior Painting in San Jose, CA",
    shortTitle: "Painting",
    seoTitle: "House Painting in San Jose | Licensed Design-Build | FORMA",
    metaDescription: "Interior and exterior painting in San Jose by a licensed contractor (CSLB #1162108). Prep, repairs and lasting finishes. Book a free consultation.",
    planningNote: "A clear painting scope names the surfaces being coated and the preparation included. Note peeling paint, cracks, moisture marks and changes between materials before choosing a finish. Repairing the underlying problem matters when surface damage is caused by water or movement.",
    text: "Meticulous preparation and a refined finish that brings the architecture, materials and color story together.",
    intro: "Paint is the final visible layer, but the quality of the result depends on preparation, repair, product selection and clean transitions. FORMA coordinates color and finish with the surrounding materials and project scope.",
    includes: ["Color and sheen direction", "Surface-condition review", "Preparation and repair scope", "Interior and exterior coating coordination", "Protection of adjacent finishes", "Application and final-detail review"],
    planning: ["Surface condition and required repairs", "Light, existing materials and color relationships", "Interior use or exterior exposure", "Durability, maintenance and finish level"],
    questions: [
      { question: "What should I compare in painting proposals?", answer: "Compare surface preparation, repair allowances, primer, coating products, the number of specified coats and protection of surrounding finishes. Clarify which doors, trim, ceilings and exterior surfaces are included so the scopes are comparable." },
      { question: "How should painting be scheduled around a remodel?", answer: "Coordinate painting with repairs, installation work and other trades. Ask which surfaces will be finished before cabinetry or fixtures go in and which touch-ups are included afterward. Exterior scheduling also depends on conditions and the selected product requirements." },
      { question: "Why is preparation important?", answer: "Cleaning, repairs, sanding, priming and sealing affect adhesion, appearance and the durability of the finished surface." },
      { question: "Can painting be coordinated with remodeling work?", answer: "Yes. Scheduling paint after the relevant construction and finish work helps protect the result and create cleaner transitions." },
      { question: "Do I need a permit to paint my house in San Jose?", answer: "No. Painting does not require a building permit. Exterior color changes may need approval if the home is in a homeowners association or is a designated historic property, and repairs that go beyond minor patching can need a permit." },
      { question: "Is lead paint a concern in older San Jose homes?", answer: "It can be. Homes built before 1978 may contain lead-based paint. Federal EPA rules require contractors who disturb painted surfaces in those homes to use certified lead-safe work practices, including containment and cleanup." },
      { question: "When is the best time for exterior painting in San Jose?", answer: "The dry season, roughly May through October, is the most reliable window because paint needs dry surfaces and mild temperatures to cure. Dry stretches in winter are often workable too." },
    ],
  },
];

export const cities = [
  { slug: "san-jose", name: "San Jose", description: "Kitchen, bathroom and whole-home remodeling" },
  { slug: "fremont", name: "Fremont", description: "Interior renovations and outdoor living upgrades" },
  { slug: "santa-clara", name: "Santa Clara", description: "Kitchens, baths and interior remodeling" },
  { slug: "palo-alto", name: "Palo Alto", description: "Design-led kitchens and whole-home remodeling" },
  { slug: "milpitas", name: "Milpitas", description: "Interiors, landscaping and exterior improvements" },
  { slug: "sunnyvale", name: "Sunnyvale", description: "Mid-century and modern home remodels" },
  { slug: "saratoga", name: "Saratoga", description: "High-touch renovations and outdoor living" },
  { slug: "los-gatos", name: "Los Gatos", description: "Custom remodeling and property upgrades" },
] as const;

export const faqs = [
  { question: "What types of projects does FORMA take on?", answer: "FORMA supports kitchen and bathroom remodels, home additions and ADUs, landscaping, painting and coordinated whole-home improvements throughout the South Bay." },
  { question: "Can you help with design and permits?", answer: "Yes. The design-build approach is intended to connect early planning, design decisions, documentation, city requirements and construction into a more coordinated path. Exact requirements vary by city and project scope." },
  { question: "How early should we contact you?", answer: "The earlier the better—especially for a kitchen, bathroom or whole-home remodel. Early planning helps reveal site, budget and permit considerations before decisions become expensive to change." },
  { question: "Do you work throughout the South Bay?", answer: "The core service area includes San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos." },
  { question: "Where is FORMA Design + Build located?", answer: "FORMA Design + Build is based at 360 S Market St, Unit 1707, San Jose, CA 95113 and serves homeowners throughout the South Bay." },
  { question: "Is FORMA licensed, bonded and insured?", answer: "Yes. FORMA Design + Build holds active California contractor license #1162108 with a B General Building classification. A $25,000 contractor's bond is on file with CSLB, and the company carries general liability and workers' compensation coverage." },
  { question: "How can I contact FORMA?", answer: `Call ${business.phoneDisplay}, email ${business.email} or complete the project consultation form on this site.` },
  { question: "How do we begin?", answer: "Start with a focused consultation. Share the project type, property details, priorities and finish direction so the first conversation can begin with useful context." },
] as const;
