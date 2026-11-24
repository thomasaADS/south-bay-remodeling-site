// Articles published under /guides.
//
// Editorial rules:
// - No invented prices. `priceRange` stays null until the owner supplies real figures; while it
//   is null the article explains what drives cost and how to get a real number.
//   TODO(owner): add FORMA's real 2026 price ranges to the three cost articles below.
// - Durations are general planning ranges and match app/service-content.ts.
// - Regulatory statements were written from public state and city information and are hedged.
//   TODO(owner): have each article reviewed for accuracy before promoting it.
// - Inline links use [label](/path) and are rendered by app/rich-text.tsx.

export type GuideSection = { id: string; heading: string; paragraphs: string[]; list?: string[] };

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  /** Slug of the service page this article supports. */
  service: string;
  serviceAnchor: string;
  datePublished: string;
  dateModified: string;
  intro: string[];
  /** TODO(owner): real price range, shown in a highlighted line under the intro when set. */
  priceRange: string | null;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "bathroom-remodel-cost-san-jose",
    title: "Bathroom Remodel Cost in San Jose (2026)",
    seoTitle: "Bathroom Remodel Cost in San Jose (2026) | FORMA",
    metaDescription: "What drives bathroom remodel cost in San Jose in 2026: layout, tile, waterproofing, permits and concealed damage. How to get a firm number for your bath.",
    summary: "The six things that decide what a San Jose bathroom remodel costs, and how to compare bids fairly.",
    service: "bathroom-remodeling",
    serviceAnchor: "bathroom remodeling in San Jose",
    datePublished: "2026-11-24",
    dateModified: "2026-11-24",
    intro: [
      "Two bathrooms of the same size in the same San Jose neighborhood can cost very different amounts to remodel. Size matters less than what happens to the plumbing, how much of the room is tiled and what is found when the old tub comes out.",
      "This guide explains where the money goes in a bathroom remodel, what is specific to San Jose and California, and how to get a number you can rely on. It does not quote a universal price, because any single figure would be wrong for most homes.",
    ],
    priceRange: null,
    sections: [
      {
        id: "scope",
        heading: "Start by naming the scope",
        paragraphs: [
          "Contractors price bathrooms in three broad tiers, and knowing which one you are in is the first step toward a realistic budget.",
        ],
        list: [
          "Refresh: new vanity, toilet, fixtures, lighting and paint, with the tub or shower and all plumbing left where they are.",
          "Full remodel in place: the room is taken to the studs and rebuilt with new waterproofing, tile, fixtures and ventilation, but drains and walls stay put.",
          "Reconfiguration: fixtures move, walls shift or the room grows into a closet or hallway. This adds framing, drain and vent work, and more inspection.",
        ],
      },
      {
        id: "drivers",
        heading: "What moves the price most",
        paragraphs: [
          "Moving drains is the largest single variable. Many San Jose homes built from the 1950s on sit on concrete slabs, so relocating a toilet or shower drain means cutting and patching the slab. Homes with raised foundations, common in Willow Glen and the Rose Garden, are easier because the plumbing is reachable from the crawlspace.",
          "The shower is the second. A standard tub-and-surround is the least labor. A custom tiled shower with a bench, niches and a low or curbless entry needs more framing, a full waterproofing system and many more hours of tile setting. Tile format matters as well: small mosaics and large-format slabs both take longer to install than mid-size tile.",
          "The third is what you cannot see. Rot around a toilet flange, a failed shower pan that has soaked the subfloor, galvanized supply lines and cast-iron drains at the end of their life are all common behind older bathrooms. A good proposal says how these are handled and priced if they are found.",
        ],
      },
      {
        id: "california",
        heading: "Costs that come with California code",
        paragraphs: [
          "A permitted bathroom remodel in San Jose has to meet current code, and some of that work is easy to overlook when budgeting. The exhaust fan must be ducted to the outside and controlled by a humidity sensor. Older high-flow toilets, showerheads and faucets have to be replaced with water-conserving fixtures. Outlets need GFCI protection, shower glass must be tempered and the home's smoke and carbon monoxide alarms must be brought up to date.",
          "None of these is individually expensive, but together they explain part of the gap between a quote that includes permits and one that quietly leaves them out.",
        ],
      },
      {
        id: "compare",
        heading: "How to compare two bathroom bids",
        paragraphs: [
          "Ask each contractor the same questions and put the answers side by side.",
        ],
        list: [
          "Which waterproofing system is used in the shower, and is it flood-tested before tile?",
          "Are permits and inspections included, and who pulls them?",
          "What are the allowances for tile, fixtures, vanity and glass, and what happens if selections exceed them?",
          "How is concealed damage documented, priced and approved?",
          "Is the contractor licensed, bonded and insured, and can you verify the license with the CSLB?",
        ],
      },
      {
        id: "number",
        heading: "Getting a real number for your bathroom",
        paragraphs: [
          "A reliable price comes from a site visit, measurements and a defined scope. Bring photos, rough dimensions and a list of what bothers you about the current room. Decide in advance whether the layout can stay, because that one decision sets the tier.",
          "FORMA Design + Build offers a free consultation for San Jose homeowners and prices each bathroom from a written scope. Read more about our [bathroom remodeling in San Jose](/services/bathroom-remodeling), or use the [remodeling planning guide](/remodeling-planning-guide) to prepare.",
        ],
      },
    ],
  },
  {
    slug: "kitchen-remodel-cost-san-jose",
    title: "Kitchen Remodel Cost in San Jose (2026)",
    seoTitle: "Kitchen Remodel Cost in San Jose (2026) | FORMA",
    metaDescription: "What drives kitchen remodel cost in San Jose in 2026: layout, cabinets, electrical capacity, permits and finishes. How to get a firm number.",
    summary: "Where the money goes in a San Jose kitchen remodel, from cabinets to panel upgrades.",
    service: "kitchen-remodeling",
    serviceAnchor: "kitchen remodeling in San Jose",
    datePublished: "2026-11-24",
    dateModified: "2026-11-24",
    intro: [
      "The kitchen is usually the most expensive room in a house to remodel, and the one where budgets drift furthest from the first estimate. The reason is rarely a single big-ticket item. It is the number of trades involved and the way one decision, such as moving the range, sets off five others.",
      "This guide breaks down what drives kitchen remodel cost in San Jose in 2026 and how to arrive at a figure for your own kitchen. It deliberately avoids a one-size price, which would mislead more readers than it helped.",
    ],
    priceRange: null,
    sections: [
      {
        id: "scope",
        heading: "Three levels of kitchen remodel",
        paragraphs: ["Before comparing any numbers, decide which of these describes your project."],
        list: [
          "Cosmetic update: paint or reface cabinets, new countertops, backsplash, sink, faucet and lighting, with the layout and appliances in place.",
          "Full remodel in the same footprint: new cabinets, counters, flooring, lighting, plumbing and electrical, with the sink and range staying roughly where they are.",
          "Reconfiguration: walls come down, the sink or range moves, an island is added or the kitchen expands into another room.",
        ],
      },
      {
        id: "cabinets",
        heading: "Cabinets set the baseline",
        paragraphs: [
          "Cabinetry is typically the largest line in a kitchen budget. Stock cabinets come in fixed sizes and ship quickly. Semi-custom lines offer more sizes, finishes and interior fittings. Custom cabinets are built to the room, which matters in older San Jose houses where walls are out of plumb and ceilings are not level.",
          "The count of drawers, pull-outs and tall pantry units changes the price within any line. So does the box construction and the finish. Ask to see a line-item cabinet quote, not a single lump sum, so you can see what each choice costs.",
        ],
      },
      {
        id: "layout",
        heading: "What a layout change really costs",
        paragraphs: [
          "Moving a sink means new supply, drain and vent lines. Moving a gas range means extending the gas line and re-routing the hood duct. On a slab foundation, drain changes involve cutting concrete. Each move also means patching flooring and ceiling.",
          "Taking out a wall between the kitchen and family room is the most requested change in San Jose ranch homes. If the wall carries load, it needs an engineered beam, posts and footings, temporary shoring and plan review. That is a worthwhile investment for many households, but it should be priced as its own item.",
        ],
      },
      {
        id: "electrical",
        heading: "Electrical capacity and electrification",
        paragraphs: [
          "Many South Bay homes from the 1950s and 1960s still have 100-amp electrical service. A modern kitchen needs dedicated circuits for the refrigerator, dishwasher, disposal, microwave and countertop outlets, and an induction range adds a large 240-volt circuit. If the panel is full, the options are a load calculation that shows the existing service is adequate, a subpanel, or a service upgrade coordinated with the utility.",
          "Raise this at the first meeting. A panel upgrade discovered halfway through a job costs more in delay than it does in materials.",
        ],
      },
      {
        id: "finishes",
        heading: "Countertops, tile and appliances",
        paragraphs: [
          "Countertop price depends on the material, the number of slabs, edge detail and cutouts. A waterfall island end or a full-height stone backsplash can double the stone needed. Appliance packages range more widely than any other category, and built-in or panel-ready units also raise the cabinetry cost.",
        ],
      },
      {
        id: "permits",
        heading: "Permits and what they include",
        paragraphs: [
          "Replacing cabinets and counters in place generally needs no permit in San Jose. New circuits, relocated plumbing or gas, new ducting and wall changes do. Permit fees themselves are a small part of the total, but the code requirements that come with a permit, such as high-efficacy lighting and updated circuit protection, are part of the real scope.",
        ],
      },
      {
        id: "number",
        heading: "Getting a real number for your kitchen",
        paragraphs: [
          "Measure the room, list your appliances and note what you want to move. With that, a contractor can give a preliminary range in a first meeting and a firm price once the design and selections are set.",
          "FORMA Design + Build offers a free consultation and prices every kitchen from a written scope with stated allowances. See our [kitchen remodeling in San Jose](/services/kitchen-remodeling) page for the full process, or prepare with the [remodeling planning guide](/remodeling-planning-guide).",
        ],
      },
    ],
  },
  {
    slug: "home-addition-cost-permits-san-jose",
    title: "Home Addition Cost and Permits in San Jose",
    seoTitle: "Home Addition Cost and Permits in San Jose | FORMA",
    metaDescription: "What a home addition involves in San Jose: zoning limits, permits, plan review and the factors that drive cost for room and second-story additions.",
    summary: "Zoning limits, the permit path and the cost drivers for room additions and second stories in San Jose.",
    service: "home-additions",
    serviceAnchor: "home additions in San Jose",
    datePublished: "2026-11-24",
    dateModified: "2026-11-24",
    intro: [
      "Adding on is often the only way to get more space without leaving a neighborhood you like or giving up a low property tax base. It is also the most involved project a homeowner can take on short of building new.",
      "This guide covers the two questions that come first for any San Jose addition: what will the city allow, and what will drive the cost. Specific prices depend on the lot and the design, so we explain the factors and leave the figure for a real scope.",
    ],
    priceRange: null,
    sections: [
      {
        id: "zoning",
        heading: "What your lot allows",
        paragraphs: [
          "Every residential lot in San Jose has a zoning district that sets minimum setbacks from the property lines, a maximum height and limits on how much of the lot the house can cover. Together these define a buildable envelope. Easements, protected trees and the location of utilities shrink it further.",
          "A feasibility check answers three things before design begins: how many square feet you can add, whether they have to go up or can go out, and which approvals the project triggers. It is the least expensive step in the whole process and the one that prevents the most wasted design fees.",
        ],
      },
      {
        id: "permits",
        heading: "The permit path in San Jose",
        paragraphs: [
          "All additions need a building permit with plan review from the City of San Jose Building Division. The submittal normally includes architectural plans, structural engineering, California energy (Title 24) calculations and sometimes a soils report or survey. Plan reviewers issue comments, the design team responds and permits are issued when everything is approved.",
          "At the time of writing, San Jose also requires a Single-Family House Permit from the Planning Division when a house would exceed a floor area ratio of 0.45, exceed two stories or 30 feet, or when the property is a listed historic resource. This is a separate planning approval that comes before the building permit, and it most often affects second-story additions on smaller lots. Confirm the current thresholds with the city for your parcel.",
        ],
        list: [
          "Building, plumbing, electrical and mechanical permits",
          "Planning approval where size, height or historic status requires it",
          "School impact fees, which are charged on added living area above a set size",
          "Inspections at foundation, framing, rough trades, insulation and final",
        ],
      },
      {
        id: "up-or-out",
        heading: "Building up versus building out",
        paragraphs: [
          "A ground-floor addition needs excavation, a new foundation and a roof tie-in, and it uses yard. The household can usually stay in the home. A second-story addition preserves the yard, but the existing foundation and walls must be evaluated and often reinforced to carry the new floor, a stair takes space from the first floor, and the roof comes off, which usually means moving out.",
          "Neither is automatically cheaper. On a small lot where setbacks leave no room to expand, a second story may be the only option. On a wide lot with an aging foundation, building out is often simpler.",
        ],
      },
      {
        id: "cost",
        heading: "What drives the cost",
        paragraphs: ["These are the factors that separate one addition budget from another."],
        list: [
          "Size, and whether the space includes a bathroom or kitchen",
          "Foundation type, slope, soil and equipment access",
          "Structural upgrades to the existing house",
          "Electrical service, heating and cooling capacity",
          "How closely the exterior must match the existing roof, siding and windows",
          "Design, engineering and city fees, which some bids leave out",
          "Temporary housing if you need to move out",
        ],
      },
      {
        id: "taxes",
        heading: "Property taxes after an addition",
        paragraphs: [
          "Under California's Proposition 13, an addition does not trigger a reassessment of the whole property. The county assessor values the new construction and adds that amount to your existing assessed value. The original house keeps its base. Check the specifics with the Santa Clara County Assessor's office.",
        ],
      },
      {
        id: "next",
        heading: "Where to start",
        paragraphs: [
          "Start with feasibility. Gather your address, a plot plan or survey if you have one, and a description of the space you need. FORMA Design + Build offers a free consultation and can tell you what is realistic on your lot before you commit to design.",
          "Read about our [home additions in San Jose](/services/home-additions), including room additions, second stories and ADUs. If an ADU is what you have in mind, see [ADU rules in San Jose](/guides/adu-rules-san-jose).",
        ],
      },
    ],
  },
  {
    slug: "adu-rules-san-jose",
    title: "ADU Rules in San Jose: What Homeowners Need to Know",
    seoTitle: "ADU Rules in San Jose: What Homeowners Need to Know",
    metaDescription: "San Jose ADU rules explained: types, size limits, setbacks, parking, permits and timelines for accessory dwelling units, with links to official sources.",
    summary: "Types of ADU, size and setback rules, parking, permits and what has changed recently.",
    service: "home-additions",
    serviceAnchor: "ADUs and home additions in San Jose",
    datePublished: "2026-11-24",
    dateModified: "2026-11-24",
    intro: [
      "Accessory dwelling units (ADUs) have become one of the most common residential projects in San Jose. State law has loosened the rules nearly every year since 2017, and San Jose has gone further than most cities in making approval predictable.",
      "This is a plain-language summary for homeowners, written from public state and city information. ADU rules change often, so treat it as orientation and confirm the current standards with the City of San Jose before you design anything.",
    ],
    priceRange: null,
    sections: [
      {
        id: "types",
        heading: "The types of ADU",
        paragraphs: ["There are four basic forms, and the rules differ for each."],
        list: [
          "Detached ADU: a separate small house in the backyard.",
          "Attached ADU: an addition to the main house with its own entrance, kitchen and bathroom.",
          "Conversion ADU: an existing garage, basement or other space converted into a dwelling.",
          "Junior ADU (JADU): a unit of up to 500 square feet created within the walls of the existing house, which may share a bathroom with it.",
        ],
      },
      {
        id: "size",
        heading: "Size, height and setbacks",
        paragraphs: [
          "California law guarantees that a city must allow an ADU of at least 800 square feet with 4-foot side and rear setbacks, regardless of local lot coverage or floor area limits. Cities can allow more. San Jose sets its maximum detached ADU size by lot size, with a larger limit on larger lots, up to 1,200 square feet at the time of writing.",
          "State law sets a baseline height of 16 feet for a detached ADU, with more allowed near transit and for attached units, and San Jose permits two-story ADUs under its own standards. Converting an existing legal structure, such as a garage, generally does not require new setbacks.",
        ],
      },
      {
        id: "parking",
        heading: "Parking",
        paragraphs: [
          "State law caps parking at one space per ADU and removes the requirement entirely in several common situations, including when the property is within half a mile walking distance of public transit or when the ADU is part of an existing structure. If you convert a garage into an ADU, the city cannot require you to replace the lost garage parking.",
        ],
      },
      {
        id: "permits",
        heading: "Permits and timeline",
        paragraphs: [
          "ADU applications are reviewed ministerially, meaning against objective standards with no public hearing. The city must act on a complete application within 60 days. San Jose runs a preapproved ADU program, in which plan sets from participating designers and builders have already been reviewed, shortening the path for homeowners who choose one of those designs.",
          "An ADU still needs building, electrical, plumbing and mechanical permits and the same inspections as any new construction. Newly built detached ADUs are generally subject to the state energy code's solar requirement. Fire sprinklers are required in an ADU only if they are required in the main house.",
        ],
      },
      {
        id: "fees",
        heading: "Fees and utilities",
        paragraphs: [
          "ADUs smaller than 750 square feet are exempt from impact fees under state law, and larger ADUs pay them in proportion to the main house. That threshold is the reason so many ADU plans come in just under 750 square feet. Utility connection requirements depend on the type: a conversion can usually share the house's services, while a new detached unit may need upgraded or separate connections.",
        ],
      },
      {
        id: "use",
        heading: "Renting, owner occupancy and selling",
        paragraphs: [
          "California no longer allows cities to require the owner to live on the property for a standard ADU. A junior ADU does carry an owner-occupancy requirement. ADUs approved under the state's streamlined rules cannot be used as short-term rentals of less than 30 days.",
          "San Jose was the first California city to opt in to a 2023 state law that lets homeowners sell an ADU separately from the main house as a condominium. The process involves a condominium map and other steps, so it is something to plan with professional advice from the outset.",
        ],
      },
      {
        id: "start",
        heading: "How to start",
        paragraphs: [
          "Check the city's ADU page for the current standards and the list of preapproved plans, then have your lot reviewed for setbacks, easements, trees and utility locations. Find the official information at the [City of San Jose ADU program](https://www.sanjoseca.gov/business/development-services-permit-center/accessory-dwelling-units-adus).",
          "FORMA Design + Build designs and builds [ADUs and home additions in San Jose](/services/home-additions) and offers a free consultation. For the broader picture on expanding a house, read [home addition cost and permits in San Jose](/guides/home-addition-cost-permits-san-jose).",
        ],
      },
    ],
  },
  {
    slug: "how-long-does-a-remodel-take-bay-area",
    title: "How Long Does a Remodel Take in the Bay Area",
    seoTitle: "How Long Does a Remodel Take in the Bay Area | FORMA",
    metaDescription: "Typical Bay Area remodel timelines for kitchens, bathrooms, additions, landscaping and painting, plus what causes delays and how to avoid them.",
    summary: "Planning ranges for each project type, and the four things that stretch a schedule.",
    service: "kitchen-remodeling",
    serviceAnchor: "kitchen remodeling",
    datePublished: "2026-11-24",
    dateModified: "2026-11-24",
    intro: [
      "The honest answer to how long a remodel takes is that construction is only part of it. In the Bay Area, design, permit review and material lead times often take as long as the building itself, and they happen before a single wall is opened.",
      "Below are general planning ranges for common residential projects, followed by the reasons schedules slip and what you can do about them. Treat the figures as a starting point for planning, not a commitment for your project.",
    ],
    priceRange: null,
    sections: [
      {
        id: "phases",
        heading: "Every remodel has three clocks",
        paragraphs: [
          "Design and selections is the first. It ends when the layout is settled and the products are chosen. Permits and procurement is the second, covering plan review by the city and the wait for cabinets, windows and other long-lead items. Construction is the third. Owners tend to budget time only for the last one.",
        ],
      },
      {
        id: "ranges",
        heading: "Planning ranges by project",
        paragraphs: ["These ranges cover design through completion for a typical single-family home."],
        list: [
          "Bathroom remodel: 2 to 4 weeks of design, then 3 to 8 weeks of construction.",
          "Kitchen remodel: 3 to 6 weeks of design, 4 to 10 weeks for permits and cabinets, then 6 to 12 weeks of construction.",
          "Room addition: 6 to 12 weeks of design, 2 to 4 months of plan review, then 4 to 7 months of construction.",
          "Second-story addition: similar design and review time, then 6 to 10 months of construction.",
          "Landscaping: 2 to 5 weeks of design, then 2 to 8 weeks of construction.",
          "Painting: 3 to 10 days for an interior, 5 to 12 days for an exterior.",
        ],
      },
      {
        id: "delays",
        heading: "What stretches a schedule",
        paragraphs: [
          "Plan review is the least predictable step. Each Bay Area city has its own staffing, backlog and review process, and a project that needs planning approval, design review or historic review adds a stage before the building permit. Every round of plan-check comments adds weeks.",
          "Lead times come next. Custom and semi-custom cabinets, windows, specialty tile and some appliances take weeks to months to arrive. A remodel that starts demolition before these have ship dates is likely to stop and wait.",
          "Concealed conditions are the third cause. Older Bay Area houses hide knob-and-tube wiring, galvanized pipe, undersized framing and water damage, and none of it can be fully known until walls are open.",
          "The fourth is decisions. Changing a selection or layout after work begins has a larger effect on the schedule than almost anything else, because it can mean reordering materials and repeating inspections.",
        ],
      },
      {
        id: "faster",
        heading: "How to keep a remodel on schedule",
        paragraphs: ["Most of what keeps a project moving happens before construction."],
        list: [
          "Finish the design and make every selection before demolition.",
          "Order long-lead items early and confirm delivery dates in writing.",
          "Submit a complete permit application so the first review is the only long one.",
          "Agree on how concealed conditions will be handled so a discovery does not stop work.",
          "Use one team for design and construction so questions are answered the same day.",
          "Decide where you will cook, shower or live during the work.",
        ],
      },
      {
        id: "season",
        heading: "Does the season matter?",
        paragraphs: [
          "Less than in most of the country. The Bay Area's rainy season runs roughly from November through March, which affects foundations, roofing, exterior painting and anything that opens the house to the weather. Interior remodels proceed year-round. If your project includes an addition, planning the design and permit phase over winter and breaking ground in spring is a common approach.",
        ],
      },
      {
        id: "next",
        heading: "Planning your own timeline",
        paragraphs: [
          "The fastest way to a real schedule is a defined scope. FORMA Design + Build offers a free consultation and writes the schedule into each proposal once the scope and selections are known.",
          "See how the phases apply to [kitchen remodeling](/services/kitchen-remodeling), [bathroom remodeling](/services/bathroom-remodeling), [home additions](/services/home-additions), [landscaping](/services/landscaping) and [interior and exterior painting](/services/interior-exterior-painting), or work through the [remodeling planning guide](/remodeling-planning-guide).",
        ],
      },
    ],
  },
];
