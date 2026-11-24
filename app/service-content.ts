// Long-form copy for each service page.
//
// Editorial rules for this file:
// - No invented prices, reviews, projects or credentials.
// - `priceRange` stays null until the owner supplies a real range. While it is null the page
//   explains cost factors only and does not print a number.
// - Timeline figures are general planning ranges for this type of work, not a promise.
//   TODO(owner): review every `duration` value below against FORMA's real schedules.
// - Inline links use [label](/path) and are rendered by app/rich-text.tsx.

export type ServiceContent = {
  overview: string[];
  included: { title: string; text: string }[];
  process: { title: string; text: string }[];
  timeline: { intro: string; phases: { phase: string; duration: string; note: string }[]; outro: string };
  permits: string[];
  costFactors: { title: string; text: string }[];
  /** TODO(owner): real price range for this service, e.g. "$X to $Y for a full remodel". */
  priceRange: string | null;
  materials: { title: string; text: string }[];
  /** Slugs of 2-3 related services, most relevant first. */
  related: string[];
  /** Slug of the matching article under /guides. */
  guide: string;
};

export const serviceContent: Record<string, ServiceContent> = {
  "kitchen-remodeling": {
    overview: [
      "A kitchen remodel touches more trades than any other room in the house: demolition, framing, plumbing, electrical, ventilation, drywall, cabinetry, stone, tile, flooring and paint all have to land in the right order. FORMA Design + Build handles that as one design-build scope, so the person who helps you draw the layout is working from the same information as the crew that builds it.",
      "We remodel kitchens across San Jose, from galley kitchens in Willow Glen bungalows to closed-off kitchens in Cambrian and Almaden ranch homes that owners want to open to the family room. Whether you are replacing cabinets in the existing footprint or moving the sink, range and walls, the work starts with a measured plan and a written scope you can compare line by line.",
    ],
    included: [
      { title: "Measured design and layout", text: "We measure the room, document the existing plumbing, gas, electrical panel and vent routes, and draw the layout options. You see where the sink, range, refrigerator and island would sit before anything is ordered." },
      { title: "Cabinetry and storage", text: "Cabinet drawings are coordinated with appliance specifications, door swings and filler dimensions. We help you compare stock, semi-custom and custom lines, and plan drawers, pull-outs and pantry storage around how you cook." },
      { title: "Plumbing, gas and electrical", text: "Supply and drain lines, gas for the range, dedicated appliance circuits, countertop outlets and lighting circuits are roughed in and inspected before the walls are closed." },
      { title: "Countertops, tile and flooring", text: "Countertops are templated after the cabinets are set so the stone fits the room as built. Backsplash tile, flooring transitions and trim are installed in a sequence that protects finished surfaces." },
      { title: "Lighting and ventilation", text: "We plan task lighting at the counters, general lighting for the room and a range hood ducted to the exterior where the structure allows it, sized for the cooktop you select." },
      { title: "Permits and inspections", text: "When the scope requires a permit, we prepare the application, schedule the city inspections and keep the approved documents on site through final sign-off." },
    ],
    process: [
      { title: "Consultation", text: "A free first conversation about the room, how you use it, what is not working and the budget direction you have in mind." },
      { title: "Site measure", text: "We measure the kitchen and adjacent rooms and note the panel capacity, plumbing routes and any wall you want to open." },
      { title: "Design and scope", text: "Layout options, cabinet and appliance selections and a written scope with allowances and exclusions stated plainly." },
      { title: "Permits and ordering", text: "We submit for permits where required and order cabinets and long-lead items so they arrive before demolition." },
      { title: "Construction", text: "Demolition, rough trades and inspections, drywall, cabinets, countertops, tile, flooring, paint and fixtures." },
      { title: "Walkthrough", text: "We walk the finished kitchen with you, complete the punch list and close out the final inspection." },
    ],
    timeline: {
      intro: "Most of a kitchen schedule is decided before demolition. Cabinet lead times and permit review usually take longer than any single construction task, which is why we do not remove a working kitchen until the cabinets have a confirmed delivery date.",
      phases: [
        { phase: "Design and selections", duration: "3 to 6 weeks", note: "Layout, cabinet drawings, appliance and finish selections." },
        { phase: "Permits and cabinet lead time", duration: "4 to 10 weeks", note: "Runs in parallel. Simple scopes can be permitted quickly; layout changes need plan review." },
        { phase: "Construction", duration: "6 to 12 weeks", note: "Longer when walls move, the panel is upgraded or concealed damage is found." },
      ],
      outro: "These are general planning ranges for a full kitchen remodel. Your schedule is written into the proposal once the scope and selections are known.",
    },
    permits: [
      "In San Jose, purely cosmetic kitchen work such as painting, replacing cabinets and countertops in place, and new flooring does not normally need a building permit. Once the project adds or relocates plumbing, gas lines, circuits, ducting or walls, permits are required. The City of San Jose Building Division issues building, plumbing, electrical and mechanical permits, and offers online permits through SJPermits for some simple residential scopes that do not change the structure.",
      "Removing or opening a wall needs plan review, and a load-bearing wall needs engineering for the new beam and posts. California's energy code also applies to remodeled kitchens: new lighting has to be high efficacy, and newly installed circuits need the GFCI and AFCI protection the current electrical code calls for. A permitted remodel also triggers a check of smoke and carbon monoxide alarms in the home. Requirements change, so we confirm the current rules with the [City of San Jose Building Division](https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division) for your address before finalizing the scope.",
    ],
    costFactors: [
      { title: "Layout changes", text: "Keeping the sink, range and refrigerator where they are is the single biggest way to control cost. Moving them means new drains, gas, venting and circuits, plus patching floors and ceilings." },
      { title: "Cabinet construction", text: "Cabinets are usually the largest line item. Stock, semi-custom and fully custom lines differ in price, lead time and how closely they can be fitted to an older, out-of-square room." },
      { title: "Structural work", text: "Opening a wall to the dining or family room adds engineering, a beam, temporary shoring and plan review." },
      { title: "Electrical capacity", text: "Induction ranges, double ovens and added circuits can exceed what an older panel supports. A panel or service upgrade is a separate cost and involves the utility." },
      { title: "Surfaces and appliances", text: "Countertop material and thickness, full-height stone backsplashes, tile complexity and the appliance package move the total more than most owners expect." },
      { title: "Existing conditions", text: "Older San Jose homes can hide galvanized supply lines, ungrounded wiring or water damage under the sink. We state how concealed conditions are handled before work starts." },
    ],
    priceRange: null,
    materials: [
      { title: "Cabinets", text: "Framed or frameless construction, painted or wood-veneer fronts, plywood or furniture-board boxes, and soft-close hardware. We explain what each choice changes in durability and price." },
      { title: "Countertops", text: "Engineered quartz, natural granite and quartzite, porcelain slab, solid surface and butcher block each behave differently with heat, staining and seams." },
      { title: "Backsplash and flooring", text: "Ceramic and porcelain tile, natural stone, engineered hardwood and luxury vinyl plank. Flooring is chosen with the adjacent rooms in mind so transitions stay flush." },
      { title: "Fixtures and lighting", text: "Sink material and mounting, faucet type, under-cabinet lighting, recessed or surface fixtures and dimming controls." },
      { title: "Appliances", text: "Gas, electric or induction cooking, counter-depth or built-in refrigeration and hood type. Specifications are locked before cabinet drawings are approved." },
    ],
    related: ["bathroom-remodeling", "home-additions", "interior-exterior-painting"],
    guide: "kitchen-remodel-cost-san-jose",
  },

  "bathroom-remodeling": {
    overview: [
      "A bathroom is the smallest room in the house and the least forgiving. Water, steam, tight clearances and several trades meet in a few dozen square feet, and the work that determines whether the room lasts is the work you never see again: the drain slope, the waterproofing behind the tile and the fan duct in the ceiling.",
      "FORMA Design + Build remodels hall baths, primary suites and powder rooms throughout San Jose. We plan the layout, plumbing, waterproofing, ventilation and finishes as one scope, pull the permits the work requires and build it with a single team responsible for the result. A tub-to-shower conversion, a vanity and tile update and a full reconfiguration are three different projects, and we scope each one accordingly.",
    ],
    included: [
      { title: "Layout and fixture planning", text: "We measure the room and check clearances at the toilet, vanity and shower entry. If fixtures are moving, we confirm where the drains and vents can run before the design is finalized." },
      { title: "Demolition and repair", text: "Old tile, fixtures and damaged substrate are removed down to sound framing. Any rot or mold found behind a tub or shower is documented and repaired before new work begins." },
      { title: "Shower and tub waterproofing", text: "The shower pan, walls, niches and bench are built as a continuous waterproof assembly and tested before tile is set. This is the part of a bathroom we refuse to shortcut." },
      { title: "Plumbing and electrical", text: "New valves, supply and drain lines, GFCI-protected outlets, vanity and shower lighting and a dedicated circuit where the load requires one." },
      { title: "Ventilation", text: "A quiet exhaust fan sized for the room and ducted to the exterior, with the humidity control current California code requires." },
      { title: "Tile, vanity and finishes", text: "Tile layout is planned around niches, valves and edges before the first piece is set. Vanity, countertop, mirrors, glass, paint and accessories complete the room." },
    ],
    process: [
      { title: "Consultation", text: "A free conversation about who uses the bathroom, what is failing and what you would change if you could." },
      { title: "Site measure", text: "We measure, photograph and note the drain locations, the venting, the fan duct and the condition of the subfloor." },
      { title: "Design and scope", text: "Layout, fixture and tile selections, and a written scope that states what is behind the tile as well as what is on it." },
      { title: "Permits and ordering", text: "Permit application where required, and orders for the vanity, valves, tile and glass so nothing stalls the job." },
      { title: "Construction", text: "Demolition, rough plumbing and electrical, inspections, waterproofing, tile, vanity, fixtures, glass and paint." },
      { title: "Walkthrough", text: "We test every fixture with you, complete the punch list and close the final inspection." },
    ],
    timeline: {
      intro: "A bathroom schedule depends mostly on whether fixtures move and how much tile there is. Custom shower glass is measured only after the tile is finished, so it is normally the last item installed.",
      phases: [
        { phase: "Design and selections", duration: "2 to 4 weeks", note: "Layout, fixtures, tile and vanity selections." },
        { phase: "Permits and ordering", duration: "1 to 4 weeks", note: "Often quick for a like-for-like remodel. Vanities and specialty tile can set the pace." },
        { phase: "Construction", duration: "3 to 8 weeks", note: "A hall bath sits at the short end; a reconfigured primary bath at the long end." },
      ],
      outro: "These are general planning ranges. If the home has one bathroom, tell us early so we can plan the sequence around keeping a working toilet and shower as long as possible.",
    },
    permits: [
      "In San Jose, replacing a vanity top, repainting or retiling a floor is generally treated as finish work that needs no permit. Replacing a tub or shower valve, moving a drain, adding circuits, installing a new exhaust fan with new ducting or altering walls does require permits from the City of San Jose Building Division. Straightforward bathroom remodels with no structural change can often be permitted quickly, and the city offers online permits through SJPermits for some of these scopes.",
      "A permitted bathroom remodel has to meet current California standards. That includes water-conserving fixtures (state law requires older, high-flow toilets, showerheads and faucets to be replaced when a home is remodeled under permit), an exhaust fan ducted outdoors with a humidity control, tempered glass at the shower, GFCI protection at outlets and working smoke and carbon monoxide alarms in the home. We confirm current requirements with the [City of San Jose Building Division](https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division) for your address and include the inspections in the schedule.",
    ],
    costFactors: [
      { title: "Moving fixtures", text: "Relocating a toilet or shower drain means opening the floor, and on a slab foundation it means cutting concrete. Keeping drains in place is the most effective cost control." },
      { title: "Shower construction", text: "A curbless entry, a bench, multiple niches, a linear drain or a steam unit each add framing, waterproofing and tile labor." },
      { title: "Tile quantity and format", text: "Floor-to-ceiling tile, small mosaics, large-format porcelain and natural stone all change labor hours more than material price alone suggests." },
      { title: "Concealed damage", text: "Rotted subfloor around a toilet flange or behind an old tub surround is common in older homes and cannot be priced until it is exposed." },
      { title: "Vanity and glass", text: "A custom vanity and frameless shower glass cost more and take longer than standard sizes." },
      { title: "Old plumbing", text: "Galvanized supply lines or cast-iron drains may need replacement back to a sound connection once the wall is open." },
    ],
    priceRange: null,
    materials: [
      { title: "Tile", text: "Porcelain is dense, low-maintenance and suited to wet areas. Ceramic works well on walls. Natural stone needs sealing and more care." },
      { title: "Waterproofing systems", text: "Sheet membranes, liquid-applied membranes and foam board systems all work when installed to the manufacturer's method. We specify one system and follow it end to end." },
      { title: "Fixtures and valves", text: "Pressure-balance or thermostatic shower valves, low-flow toilets and faucets that meet California limits, and finishes that will still be available if a part needs replacing." },
      { title: "Vanities and tops", text: "Furniture-style, floating or built-in vanities with quartz, solid surface or stone tops, sized to the plumbing and the door swing." },
      { title: "Glass and accessibility", text: "Framed, semi-frameless or frameless enclosures, plus blocking in the walls for grab bars now or later, a hand shower and a low or curbless entry where the floor structure allows it." },
    ],
    related: ["kitchen-remodeling", "home-additions", "interior-exterior-painting"],
    guide: "bathroom-remodel-cost-san-jose",
  },

  "home-additions": {
    overview: [
      "When a house in San Jose stops fitting the people who live in it, moving is rarely the cheapest answer. A home addition adds the space on the lot you already own: a room addition at the back of a ranch house, a second-story addition over an existing footprint, an expanded primary suite, or an accessory dwelling unit (ADU) for family or rental income.",
      "FORMA Design + Build takes a home addition from feasibility through final inspection as one design-build scope. We check what the zoning allows on your lot, coordinate the drawings and structural engineering, manage plan review with the city and build the addition so the new work ties into the existing foundation, framing, roof and systems. Home expansion is the most regulated kind of residential remodeling, so we start with what the lot permits before anyone falls in love with a floor plan.",
    ],
    included: [
      { title: "Feasibility and zoning review", text: "We look at setbacks, lot coverage, floor area ratio, height limits, easements and utility locations to establish how much you can build and where, before design begins." },
      { title: "Design and engineering", text: "Architectural drawings, structural engineering and California energy (Title 24) calculations are coordinated into one permit set. Soils or survey work is added when the site calls for it." },
      { title: "Room additions", text: "Ground-floor additions such as a family room, bedroom, primary suite or enlarged kitchen, with a new foundation tied to the existing house and a roofline that looks original." },
      { title: "Second-story additions", text: "Adding a floor above the existing home. This includes evaluating and reinforcing the foundation and first-floor walls, a new stair, and planning for how the household lives during the work." },
      { title: "ADUs and junior ADUs", text: "Detached backyard units, attached ADUs, garage conversions and junior ADUs within the existing house, designed to San Jose's ADU standards." },
      { title: "Systems and finishes", text: "Extending or upgrading electrical service, plumbing, heating and cooling, then insulation, drywall, flooring, cabinetry, tile and paint to a finished, inspected space." },
    ],
    process: [
      { title: "Consultation", text: "A free conversation about the space you need, how long you plan to stay and the budget direction." },
      { title: "Feasibility", text: "We check zoning limits, utilities and site constraints for your lot and tell you what is realistic." },
      { title: "Design", text: "Floor plans and elevations, then engineering and energy calculations, with pricing checked as the design develops." },
      { title: "Plan review", text: "We submit the permit set, respond to the city's plan-check comments and obtain the permits." },
      { title: "Construction", text: "Foundation, framing, roofing, windows, rough trades, inspections, insulation, drywall and finishes." },
      { title: "Completion", text: "Final inspections, walkthrough, punch list and handover of warranties and approved documents." },
    ],
    timeline: {
      intro: "An addition is a months-long project, and the design and permit phase is a large share of it. Planning that phase carefully is what keeps construction from stalling.",
      phases: [
        { phase: "Feasibility and design", duration: "6 to 12 weeks", note: "Zoning check, floor plans, elevations and engineering." },
        { phase: "Plan review and permits", duration: "2 to 4 months", note: "Depends on the city's workload and the number of plan-check rounds. ADU applications have a state-mandated review window." },
        { phase: "Construction", duration: "4 to 10 months", note: "A single-story room addition is at the short end. A second-story addition is at the long end." },
      ],
      outro: "These are general planning ranges. Weather, utility coordination and the condition of the existing structure all affect the schedule, and we set the real one once the permit set is approved.",
    },
    permits: [
      "Every home addition in San Jose needs a building permit with plan review by the City of San Jose Building Division, along with plumbing, electrical and mechanical permits. The zoning district sets the setbacks, height and how much of the lot can be covered. At the time of writing, San Jose also requires a separate Single-Family House Permit from the Planning Division when a house would exceed a floor area ratio of 0.45, exceed two stories or 30 feet in height, or when the property is a listed historic resource. Second-story additions are the projects most likely to reach those thresholds, so we check them first.",
      "ADUs follow a different, streamlined path. California law requires cities to review a complete ADU application ministerially within 60 days, allows detached ADUs with 4-foot side and rear setbacks, and exempts ADUs under 750 square feet from impact fees. San Jose publishes its own size limits by lot size, runs a preapproved ADU plan program and has opted in to allowing ADUs to be sold separately as condominiums. Rules in this area have changed nearly every year, so we verify the current standards with the [City of San Jose ADU program](https://www.sanjoseca.gov/business/development-services-permit-center/accessory-dwelling-units-adus) for your parcel. Additions can also raise your assessed property value for the new construction, and larger projects may owe school impact fees.",
    ],
    costFactors: [
      { title: "Building up or building out", text: "A ground-floor addition needs a new foundation and gives up yard. A second story avoids that but requires structural upgrades below, a stair and usually moving out for part of the work." },
      { title: "Foundation and site", text: "Slope, soil conditions, access for equipment, tree protection and drainage all affect foundation cost before any framing starts." },
      { title: "Kitchens and bathrooms", text: "Square footage that includes a bathroom or kitchen costs far more per foot than a bedroom or family room because of plumbing, ventilation, tile and fixtures." },
      { title: "Utility upgrades", text: "Added load often means a larger electrical service, a new subpanel, a bigger water heater or a separate heat pump system. ADUs may need their own utility connections." },
      { title: "Tying into the existing house", text: "Matching roof pitch, siding, stucco texture, windows and floor heights so the addition does not look added on takes design time and skilled labor." },
      { title: "Fees and soft costs", text: "Design, engineering, energy calculations, permit and plan-check fees and school fees are real costs that sit outside the construction contract in many bids. We list them." },
    ],
    priceRange: null,
    materials: [
      { title: "Structure and envelope", text: "Engineered lumber, shear walls and hold-downs for seismic loads, insulation that meets current energy code, and dual-pane windows matched to the existing house." },
      { title: "Roofing and exterior", text: "Composition shingle, tile or metal roofing tied into the existing roof, with stucco, fiber-cement or wood siding matched in texture and profile." },
      { title: "Heating and cooling", text: "Extending existing ductwork where it has capacity, or adding a ducted or ductless heat pump for the new space." },
      { title: "Interior finishes", text: "Flooring, doors, trim and paint selected to continue the existing home, or to set a new standard you plan to carry through the rest of the house later." },
      { title: "ADU options", text: "Site-built, preapproved plan sets or a garage conversion. Each has a different cost, schedule and level of design flexibility." },
    ],
    related: ["kitchen-remodeling", "bathroom-remodeling", "landscaping"],
    guide: "home-addition-cost-permits-san-jose",
  },

  landscaping: {
    overview: [
      "San Jose has one of the longest outdoor seasons in the country: dry summers, mild winters and well over 250 sunny days a year. A yard that is planned as living space gets used most of the year, and a yard that is only lawn mostly gets watered. Landscaping here is as much about shade, drainage and water use as it is about plants.",
      "FORMA Design + Build designs and builds residential landscapes as part of the house, not as an afterthought to it. We plan patios, paths, decks, pergolas, retaining walls, planting, irrigation, drainage and lighting together, and we coordinate the outdoor work with any remodeling at the back of the home so door thresholds, floor heights and sightlines line up.",
    ],
    included: [
      { title: "Site plan and layout", text: "We measure the yard, note sun and shade through the day, existing trees, slopes and where water goes in a storm, then draw a plan that organizes the space into areas with a purpose." },
      { title: "Hardscape", text: "Concrete, paver and natural stone patios, walkways, steps, seat walls and driveways, built on a compacted base with the slope needed to move water away from the house." },
      { title: "Decks, pergolas and shade", text: "Wood and composite decks, pergolas and shade structures sized for the furniture and the afternoon sun, with footings and connections that meet code." },
      { title: "Retaining walls and grading", text: "Walls to create level, usable areas on sloped lots, with drainage behind the wall and engineering when the height requires it." },
      { title: "Planting and irrigation", text: "Climate-appropriate planting grouped by water need, drip irrigation, a weather-based controller and mulch, designed to state water-efficiency standards." },
      { title: "Drainage and lighting", text: "Area drains, French drains and downspout connections where the site needs them, plus low-voltage path, step and accent lighting." },
    ],
    process: [
      { title: "Consultation", text: "A free conversation about how you want to use the yard, who uses it and how much maintenance you are willing to do." },
      { title: "Site measure", text: "We measure and photograph the yard and record grades, drainage, trees, utilities and access." },
      { title: "Design and scope", text: "A layout plan, material and plant direction and a written scope with quantities you can compare." },
      { title: "Approvals", text: "Building permits for structures that need them, plus tree, HOA or water-efficiency documentation where it applies." },
      { title: "Construction", text: "Demolition and grading, drainage, hardscape and structures, irrigation, planting and lighting, in that order." },
      { title: "Walkthrough", text: "We walk the yard with you, set the irrigation schedule and explain the first season of care." },
    ],
    timeline: {
      intro: "Landscape work is sequenced from the ground up, and the amount of hardscape and structure is what sets the length of the job.",
      phases: [
        { phase: "Design and selections", duration: "2 to 5 weeks", note: "Layout, materials and plant palette." },
        { phase: "Approvals and ordering", duration: "1 to 6 weeks", note: "Short when no permit is needed. Longer for engineered walls, attached structures or HOA review." },
        { phase: "Construction", duration: "2 to 8 weeks", note: "A planting and irrigation refresh is at the short end. A full yard with patios, walls and a pergola is at the long end." },
      ],
      outro: "These are general planning ranges. Planting can be installed most of the year in San Jose, though fall planting gives new plants the rainy season to establish.",
    },
    permits: [
      "Planting, irrigation, on-grade patios and paths generally do not need a building permit in San Jose. Structures often do. Under the California Residential Code as adopted by the city, a retaining wall more than 4 feet tall measured from the bottom of the footing needs a permit and engineering, as do most decks that are attached to the house, sit more than 30 inches above grade or exceed 200 square feet. Patio covers, outdoor kitchens with gas or electrical lines, and new circuits for lighting or spas need permits as well.",
      "Two other rules matter in San Jose yards. Removing a tree on private property that meets the city's ordinance-size threshold (a trunk circumference of 38 inches or more, measured 4.5 feet above the ground) requires a tree removal permit, and street trees in the park strip are regulated separately. California's Model Water Efficient Landscape Ordinance also applies to larger new and renovated landscapes that are tied to a permit, setting limits on turf and requirements for irrigation efficiency. Valley Water, the county's water agency, has offered rebates for converting lawn to low-water landscaping, and those programs usually require approval before any lawn is removed. We check the current requirements with the [City of San Jose Building Division](https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division) and the water agency before work starts.",
    ],
    costFactors: [
      { title: "Hardscape area and material", text: "Square footage of paving is the largest driver. Poured concrete, pavers and natural stone differ in both material and labor cost." },
      { title: "Grading and walls", text: "Sloped lots need excavation, export of soil, retaining walls and drainage before anything decorative is built." },
      { title: "Access", text: "A narrow side yard that only fits a wheelbarrow slows demolition, base delivery and concrete placement compared with a yard a small machine can reach." },
      { title: "Structures and utilities", text: "Pergolas, decks, outdoor kitchens, fire features and lighting add footings, gas, electrical and permits." },
      { title: "Plant size and density", text: "Larger container sizes and denser planting give an immediate result at a higher cost. Smaller plants cost less and fill in over a few seasons." },
      { title: "Drainage corrections", text: "Fixing water that pools near the foundation is rarely visible when finished but should be done before new paving covers the problem." },
    ],
    priceRange: null,
    materials: [
      { title: "Paving", text: "Broom-finished or sand-finished concrete, concrete pavers, porcelain pavers, flagstone and decomposed granite, chosen for heat, slip resistance and maintenance." },
      { title: "Decking and structures", text: "Redwood, pressure-treated framing with composite or hardwood decking, and pergolas in wood, steel or aluminum." },
      { title: "Planting", text: "California natives and Mediterranean-climate plants that suit San Jose's dry summers, with fruit trees, edibles or a small lawn where they are worth the water." },
      { title: "Irrigation", text: "Drip lines, pressure regulation, separate valves for sun and shade zones and a weather-based smart controller." },
      { title: "Lighting", text: "Low-voltage LED path, step and accent fixtures on a timer or photocell, placed to light the ground and not the neighbors." },
    ],
    related: ["home-additions", "interior-exterior-painting", "kitchen-remodeling"],
    guide: "how-long-does-a-remodel-take-bay-area",
  },

  "interior-exterior-painting": {
    overview: [
      "Paint is the least expensive way to change how a house looks and the most visible way to get a project wrong. The finish you see is the last coat, but how long it lasts is decided by the washing, scraping, patching, sanding, caulking and priming underneath it. Most of a professional paint job is preparation.",
      "FORMA Design + Build paints interiors and exteriors throughout San Jose, as a standalone project or as the final stage of a remodel. As a licensed general building contractor we can also handle the repairs that painting tends to expose, such as dry rot at trim and fascia, cracked stucco, failed caulking, water-stained drywall and damaged siding, so the paint goes over sound material and not over a problem.",
    ],
    included: [
      { title: "Surface assessment", text: "We inspect for peeling, chalking, cracks, moisture stains, dry rot and failed caulk, and identify what has to be repaired before any coating is applied." },
      { title: "Protection and masking", text: "Floors, furniture, fixtures, windows, landscaping and hardscape are covered and masked. Hardware and cover plates are removed where practical, not painted around." },
      { title: "Preparation", text: "Washing, scraping, sanding, patching holes and cracks, re-taping failed drywall joints, caulking gaps and spot-priming bare or repaired areas." },
      { title: "Repairs", text: "Replacement of rotted trim, fascia or siding, stucco patching and drywall repair, completed before priming so the finish is uniform." },
      { title: "Priming and finish coats", text: "The right primer for the surface (stain-blocking, bonding or masonry) followed by finish coats applied to the manufacturer's spread rate, by brush, roller or sprayer as the surface calls for." },
      { title: "Cabinets, doors and trim", text: "Cabinet refinishing, doors, baseboards, crown and window trim in a durable enamel, with sanding between coats." },
    ],
    process: [
      { title: "Consultation", text: "A free conversation about which surfaces you want painted and any problems you have noticed." },
      { title: "Site review", text: "We walk the house, measure and note the repairs and preparation each surface needs." },
      { title: "Scope and color", text: "A written scope naming surfaces, prep, products and number of coats, with color samples tested on your walls." },
      { title: "Scheduling", text: "Dates are set around your household for interiors and around the weather for exteriors." },
      { title: "Preparation and painting", text: "Protection, repairs, prep, primer and finish coats, with daily cleanup in an occupied home." },
      { title: "Walkthrough", text: "We review every room and elevation with you, touch up and leave labeled leftover paint." },
    ],
    timeline: {
      intro: "Painting is the quickest of our services, and preparation is what makes the range as wide as it is. A house with sound surfaces moves fast. One with peeling paint and rot does not.",
      phases: [
        { phase: "Scope and color selection", duration: "1 to 2 weeks", note: "Site review, written scope and sample approval." },
        { phase: "Interior painting", duration: "3 to 10 days", note: "From a few rooms to a whole house including ceilings, trim and doors." },
        { phase: "Exterior painting", duration: "5 to 12 days", note: "Depends on size, stories, repairs and weather." },
      ],
      outro: "These are general planning ranges. San Jose's dry season, roughly May through October, is the most reliable window for exterior work, though mild winter stretches are often workable.",
    },
    permits: [
      "Painting does not require a building permit in San Jose or anywhere else in California. A few related rules still apply. Homes built before 1978 may contain lead-based paint, and federal EPA rules require contractors who disturb painted surfaces in those homes to be certified in lead-safe work practices, contain the dust and clean up to a defined standard. A large share of San Jose's housing was built before 1978, so this applies to many exterior repaints and to interior work that involves sanding or scraping.",
      "Paints sold and used in the Bay Area also have to meet regional air-quality limits on volatile organic compounds, which is why some older oil-based products are no longer available here. If your home is in a homeowners association or is a designated historic property, exterior color changes may need approval before work begins. When painting reveals rot or damage that calls for more than minor repair, such as replacing a section of siding or structural trim, we tell you whether that repair needs a permit from the [City of San Jose Building Division](https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division).",
    ],
    costFactors: [
      { title: "Preparation and repairs", text: "The condition of the existing surface matters more than its size. Scraping failed paint, repairing stucco cracks and replacing rotted wood are labor-heavy." },
      { title: "Area and height", text: "Square footage, ceiling height, two-story elevations and the need for scaffolding or lifts." },
      { title: "Trim, doors and detail", text: "Divided-light windows, shutters, paneled doors, crown molding and built-ins take far longer per square foot than flat walls." },
      { title: "Color changes", text: "Going from dark to light, or the reverse, can require a tinted primer and an additional coat." },
      { title: "Product grade and sheen", text: "Premium paints cost more per gallon but cover better and last longer, which usually lowers the cost per year of service." },
      { title: "Occupied homes", text: "Moving and protecting furniture and working room by room around a household adds time compared with painting an empty house." },
    ],
    priceRange: null,
    materials: [
      { title: "Interior paints", text: "Low- and zero-VOC acrylics in flat or matte for ceilings and low-traffic walls, eggshell or satin for living areas, and semi-gloss or satin enamel for kitchens, baths, trim and doors." },
      { title: "Exterior paints", text: "100 percent acrylic exterior paint for siding and trim, and elastomeric or masonry coatings for stucco where hairline cracking is an issue." },
      { title: "Primers", text: "Stain-blocking primer over water marks and knots, bonding primer over glossy surfaces and masonry primer on new stucco or concrete." },
      { title: "Caulks and fillers", text: "Paintable elastomeric sealants at joints that move, and exterior-grade fillers or epoxy for sound wood that has minor damage." },
      { title: "Cabinet and trim finishes", text: "Waterborne enamels and catalyzed finishes that level smoothly and resist chipping better than wall paint." },
    ],
    related: ["kitchen-remodeling", "bathroom-remodeling", "home-additions"],
    guide: "how-long-does-a-remodel-take-bay-area",
  },
};
