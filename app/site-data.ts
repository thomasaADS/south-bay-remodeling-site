export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  text: string;
  image?: string;
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
    shortTitle: "Kitchens",
    text: "Thoughtful layouts, custom cabinetry, lighting, surfaces and finish details designed around how your household actually lives.",
    image: "/images/kitchen-remodel.png",
    intro: "A kitchen remodel should improve movement, storage, light and daily routines—not only replace finishes. FORMA connects the design decisions with the construction plan so the room works as one complete space.",
    includes: ["Layout and circulation planning", "Cabinetry and storage direction", "Countertops, tile and finish coordination", "Lighting and electrical planning", "Appliance and fixture coordination", "Construction and finish work"],
    planning: ["How the household cooks, gathers and entertains", "Existing plumbing, electrical and structural conditions", "Storage priorities and appliance requirements", "Material durability, maintenance and budget direction"],
    questions: [
      { question: "Can the kitchen layout be changed?", answer: "Often, yes. The practical options depend on the existing structure, plumbing, electrical service and the relationship to adjacent rooms." },
      { question: "When should cabinets and appliances be selected?", answer: "Key dimensions and lead times should be coordinated early so the layout, utilities and construction sequence stay aligned." },
    ],
  },
  {
    slug: "bathroom-remodeling",
    number: "02",
    title: "Bathroom Remodeling",
    shortTitle: "Bathrooms",
    text: "Calm, highly functional bathrooms—from efficient guest baths to complete primary-suite transformations.",
    image: "/images/bathroom-remodel.png",
    intro: "Bathroom remodeling brings many technical details into a small footprint. FORMA coordinates layout, waterproofing, ventilation, lighting, fixtures and finishes around a clear design direction.",
    includes: ["Layout and fixture planning", "Shower and waterproofing scope", "Tile and finish coordination", "Vanity, storage and lighting direction", "Plumbing and ventilation coordination", "Construction and finish work"],
    planning: ["Fixture locations and comfortable clearances", "Waterproofing and moisture control", "Lighting for daily use and atmosphere", "Storage, accessibility and long-term needs"],
    questions: [
      { question: "Can a tub become a walk-in shower?", answer: "In many homes it can. The final approach depends on drainage, waterproofing, available space and any applicable permit requirements." },
      { question: "What should be selected first?", answer: "The layout, plumbing fixtures and major finish direction should be established early because they influence dimensions and rough-in work." },
    ],
  },
  {
    slug: "adu-construction",
    number: "03",
    title: "ADU Construction",
    shortTitle: "ADUs",
    text: "Detached ADUs, attached units and garage conversions planned to make the most of your property and long-term goals.",
    intro: "An ADU begins with feasibility: site conditions, access, utilities, setbacks, size and intended use. FORMA helps organize those decisions into a coordinated design and construction path.",
    includes: ["Early site and feasibility review", "Detached, attached or conversion planning", "Layout and finish direction", "Utility and access coordination", "Permit-document coordination", "Construction and completion"],
    planning: ["Intended use and desired level of privacy", "Property access, utilities and site constraints", "Size, layout and storage priorities", "City review requirements and project sequencing"],
    questions: [
      { question: "What type of ADU may fit my property?", answer: "The answer depends on the lot, existing structures, access, utilities and local requirements. A focused feasibility review is the right first step." },
      { question: "Can a garage be converted into an ADU?", answer: "Some garages can be converted, but structure, ceiling height, foundation, utilities, parking and code conditions must be reviewed." },
    ],
  },
  {
    slug: "home-additions",
    number: "04",
    title: "Home Additions",
    shortTitle: "Additions",
    text: "Seamless room additions and expanded living areas that feel intentional, balanced and connected to the original home.",
    intro: "A successful addition should feel like it belongs to the home. FORMA coordinates the new layout, structure, exterior connection and interior finishes so the added space supports the way the whole house works.",
    includes: ["Programming and layout studies", "Existing-home connection planning", "Structural and engineering coordination", "Exterior massing and material direction", "Permit-document coordination", "Construction and finish integration"],
    planning: ["Why the home needs more space", "How the addition changes circulation and daylight", "Structural, roof and foundation connections", "Budget, phasing and temporary living considerations"],
    questions: [
      { question: "How do you make an addition feel original to the home?", answer: "Proportion, rooflines, openings, materials and interior transitions should be considered together from the beginning." },
      { question: "Can we remain in the house during construction?", answer: "That depends on the scope, access and utility interruptions. The construction plan should address safety, separation and disruption before work begins." },
    ],
  },
  {
    slug: "roofing",
    number: "05",
    title: "Roofing",
    shortTitle: "Roofing",
    text: "Roof replacement, repairs, weatherproofing and related exterior work coordinated as part of one clear project plan.",
    intro: "Roofing work protects the home and often connects with drainage, insulation, ventilation, solar, additions or exterior updates. FORMA plans the scope around the broader condition of the property.",
    includes: ["Existing-condition review", "Repair or replacement scope", "Material and color direction", "Flashing, drainage and ventilation coordination", "Related exterior detail planning", "Construction and site protection"],
    planning: ["Roof age, active leaks and visible damage", "Material condition and remaining service life", "Drainage, flashing and ventilation details", "Related remodeling or exterior work"],
    questions: [
      { question: "Does every roof problem require replacement?", answer: "No. The appropriate scope depends on age, material condition, leak locations and the condition of flashing and roof penetrations." },
      { question: "Can roofing be coordinated with an addition?", answer: "Yes. Planning the roof connection with the addition helps align structure, drainage, materials and construction sequencing." },
    ],
  },
  {
    slug: "landscaping",
    number: "06",
    title: "Landscaping",
    shortTitle: "Landscaping",
    text: "Outdoor rooms, hardscape, planting, decks and gathering spaces designed for the South Bay’s indoor-outdoor lifestyle.",
    intro: "Outdoor space works best when it is planned as an extension of the home. FORMA considers access, shade, privacy, drainage, planting and gathering areas as one connected composition.",
    includes: ["Outdoor-space programming", "Patio, path and hardscape direction", "Deck and gathering-area planning", "Planting and privacy strategy", "Drainage and lighting coordination", "Construction and finish integration"],
    planning: ["How the space will be used throughout the day", "Indoor-outdoor circulation and sightlines", "Sun, shade, privacy and maintenance", "Drainage, irrigation and material durability"],
    questions: [
      { question: "Can landscaping be part of a larger remodel?", answer: "Yes. Coordinating exterior work with doors, kitchens, additions and site access often creates a more cohesive result." },
      { question: "What should be planned before selecting plants?", answer: "Use, circulation, drainage, sun exposure, privacy, irrigation and the hardscape layout should guide the planting direction." },
    ],
  },
  {
    slug: "interior-exterior-painting",
    number: "07",
    title: "Interior + Exterior Painting",
    shortTitle: "Painting",
    text: "Meticulous preparation and a refined finish that brings the architecture, materials and color story together.",
    intro: "Paint is the final visible layer, but the quality of the result depends on preparation, repair, product selection and clean transitions. FORMA coordinates color and finish with the surrounding materials and project scope.",
    includes: ["Color and sheen direction", "Surface-condition review", "Preparation and repair scope", "Interior and exterior coating coordination", "Protection of adjacent finishes", "Application and final-detail review"],
    planning: ["Surface condition and required repairs", "Light, existing materials and color relationships", "Interior use or exterior exposure", "Durability, maintenance and finish level"],
    questions: [
      { question: "Why is preparation important?", answer: "Cleaning, repairs, sanding, priming and sealing affect adhesion, appearance and the durability of the finished surface." },
      { question: "Can painting be coordinated with remodeling work?", answer: "Yes. Scheduling paint after the relevant construction and finish work helps protect the result and create cleaner transitions." },
    ],
  },
];

export const cities = [
  { slug: "san-jose", name: "San Jose", description: "Whole-home remodels, ADUs and additions" },
  { slug: "fremont", name: "Fremont", description: "Renovations and indoor-outdoor upgrades" },
  { slug: "santa-clara", name: "Santa Clara", description: "Kitchens, baths and home expansions" },
  { slug: "palo-alto", name: "Palo Alto", description: "Design-led remodels and additions" },
  { slug: "milpitas", name: "Milpitas", description: "ADUs, interiors and exterior improvements" },
  { slug: "sunnyvale", name: "Sunnyvale", description: "Mid-century and modern home remodels" },
  { slug: "saratoga", name: "Saratoga", description: "High-touch renovations and outdoor living" },
  { slug: "los-gatos", name: "Los Gatos", description: "Custom remodeling and property upgrades" },
] as const;

export const faqs = [
  { question: "What types of projects does FORMA take on?", answer: "FORMA supports kitchen and bathroom remodels, ADUs, additions, roofing, landscaping, painting and coordinated whole-home improvements throughout the South Bay." },
  { question: "Can you help with design and permits?", answer: "Yes. The design-build approach is intended to connect early planning, design decisions, documentation, city requirements and construction into a more coordinated path. Exact requirements vary by city and project scope." },
  { question: "How early should we contact you?", answer: "The earlier the better—especially for an ADU, structural remodel or addition. Early feasibility work helps reveal site, budget and permit considerations before decisions become expensive to change." },
  { question: "Do you work throughout the South Bay?", answer: "The core service area includes San Jose, Fremont, Santa Clara, Palo Alto, Milpitas, Sunnyvale, Saratoga and Los Gatos." },
  { question: "Where is FORMA Design + Build located?", answer: "FORMA Design + Build is based at 360 S Market St, Unit 1707, San Jose, CA 95113 and serves homeowners throughout the South Bay." },
  { question: "How can I contact FORMA?", answer: "Call (323) 975-5574, email Office@formadpb.com or complete the project consultation form on this site." },
  { question: "How do we begin?", answer: "Start with a focused consultation. Share the project type, property details, priorities and finish direction so the first conversation can begin with useful context." },
] as const;
