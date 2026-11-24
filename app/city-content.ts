// City-specific copy for /service-areas/[city].
//
// Each city is written from its own housing stock, permit office and neighborhoods.
// Do not template one city from another.
//
// TODO(owner): the "projects" block describes work that suits each city's housing. It is not
// based on FORMA's booking data. Replace or reorder it once real demand by city is available.
// Permit office details were written from public city information; confirm before relying on them.

export type CityContent = {
  metaDescription: string;
  intro: string[];
  housing: { heading: string; paragraphs: string[] };
  permits: { heading: string; office: string; address: string; url: string; paragraphs: string[] };
  planning: { heading: string; paragraphs: string[] };
  /** One entry per service slug, so every city page links to every service page. */
  projects: { heading: string; items: Record<string, string> };
  neighborhoods: { names: string[]; text: string };
};

export const cityContent: Record<string, CityContent> = {
  "san-jose": {
    metaDescription: "Licensed home remodeling contractor in San Jose, CA (CSLB #1162108). Kitchens, baths, additions and ADUs from our downtown office. Free consultation.",
    intro: [
      "San Jose is home. FORMA Design + Build works from 360 S Market St in downtown San Jose, and it is the largest and most varied city we work in: about a million residents, with houses that range from 1890s Victorians near downtown to hillside homes finished in the last decade.",
      "That variety is why a remodeling plan in San Jose starts with the specific house. A bungalow on a narrow Willow Glen lot and a ranch home on a wide Almaden Valley lot have different structures, different utilities and different options.",
    ],
    housing: {
      heading: "San Jose homes and what they mean for a remodel",
      paragraphs: [
        "The oldest housing sits around downtown, in Naglee Park, Hensley and Japantown: Victorians, Craftsman bungalows and early-1900s cottages with raised foundations, plaster walls and wiring that has often been patched over decades. Willow Glen and the Rose Garden are known for 1920s and 1930s Spanish Revival, Tudor and bungalow homes with small original kitchens and a single bathroom.",
        "Most of the city was built after World War II. Cambrian, Blossom Valley, Berryessa and West San Jose are dominated by single-story ranch homes from the 1950s through the 1970s, usually on slab foundations with closed kitchens and low ceilings. Willow Glen's Fairglen tract is one of the area's recognized Eichler neighborhoods, with post-and-beam construction and radiant-heated slabs that need a careful approach. Almaden Valley, Evergreen and Silver Creek have larger two-story homes from the 1980s onward.",
      ],
    },
    permits: {
      heading: "Permits in San Jose",
      office: "City of San Jose Building Division (Planning, Building and Code Enforcement)",
      address: "San Jose City Hall, 200 E Santa Clara St, San Jose, CA 95113",
      url: "https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division",
      paragraphs: [
        "Permits are issued by the Building Division at City Hall, a few blocks from our office. The city's online portal, SJPermits, handles applications and offers online permits for some simple residential scopes. Projects that change structure or add floor area go through plan review.",
        "Additions that push a house past a floor area ratio of 0.45, above two stories or 30 feet, or that involve a listed historic resource also need a Single-Family House Permit from the Planning Division. Homes in conservation areas and historic districts such as Naglee Park and Hensley have additional review for exterior changes. A number of San Jose mailing addresses are actually in unincorporated county pockets, where Santa Clara County is the permitting agency, so we confirm jurisdiction first.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in San Jose",
      paragraphs: [
        "Three things are worth establishing before design starts on a San Jose house. First, the foundation type: slab homes need a camera inspection or a plumber's assessment before any plan relies on moving a drain, while raised-foundation homes give far more freedom. Second, the electrical service. Many homes here still have 100-amp panels, and a kitchen remodel, a heat pump and an electric vehicle charger together can exceed that.",
        "Third, the paper trail. Decades of owners have added patio enclosures, converted garages and built rear additions, not always with permits. The city's online permit records show what was approved for an address. If part of the house was never permitted, it is better to learn that before drawings are submitted than when a plan reviewer notices it.",
      ],
    },
    projects: {
      heading: "Projects that suit San Jose homes",
      items: {
        "kitchen-remodeling": "Opening the closed kitchen of a ranch home to the family room, or reworking a compact bungalow kitchen without losing its character.",
        "bathroom-remodeling": "Updating original hall baths, converting tubs to showers and adding a second bathroom to homes built with one.",
        "home-additions": "Rear room additions, primary suites and backyard ADUs, which San Jose supports with preapproved plans.",
        landscaping: "Replacing thirsty lawn with patios, shade and low-water planting suited to long dry summers.",
        "interior-exterior-painting": "Exterior repainting with stucco and trim repair, and lead-safe prep on the city's many pre-1978 homes.",
      },
    },
    neighborhoods: {
      names: ["Willow Glen", "Rose Garden", "Naglee Park", "Japantown", "Cambrian", "Almaden Valley", "Evergreen", "Berryessa", "Silver Creek", "West San Jose"],
      text: "We work across the city, from downtown and Willow Glen south to Almaden Valley and east to Evergreen and Berryessa.",
    },
  },

  fremont: {
    metaDescription: "Home remodeling contractor serving Fremont, CA. Licensed design-build (CSLB #1162108) for kitchens, baths, additions and yards. Free consultation.",
    intro: [
      "Fremont is the one city in our service area that sits in Alameda County, across the county line from our San Jose office. That matters in practice: a different building department, a different water district and its own set of local rules.",
      "It is also really five towns. Centerville, Niles, Irvington, Mission San Jose and Warm Springs merged in 1956 to form the city, and each district still has its own age, lot pattern and feel. FORMA Design + Build plans Fremont projects around the district as much as the house.",
    ],
    housing: {
      heading: "Fremont homes by district",
      paragraphs: [
        "Much of central Fremont was built quickly in the 1950s and 1960s. Glenmoor, Cabrillo and parts of Centerville and Irvington are full of single-story ranch homes on slabs, typically three bedrooms and two baths, with galley kitchens and original aluminum windows. These homes remodel well because the structure is simple, but the plumbing runs under the slab and the electrical panels are often undersized for modern loads.",
        "Niles is older and smaller in scale, with early-1900s cottages and bungalows near its historic main street. Mission San Jose has larger and newer homes climbing toward the hills, while Ardenwood and Warm Springs are mostly two-story houses from the 1980s through the 2000s. The Hayward Fault runs through the city, so additions on some lots need geologic review before engineering can be completed.",
      ],
    },
    permits: {
      heading: "Permits in Fremont",
      office: "City of Fremont Building and Safety Division",
      address: "Development Services Center, 39550 Liberty St, Fremont, CA 94538",
      url: "https://www.fremont.gov/",
      paragraphs: [
        "Fremont issues permits through its Development Services Center on Liberty Street and accepts applications online through the city's permit portal. Kitchen and bathroom remodels without structural changes are generally reviewed quickly, while additions and second stories go through full plan check.",
        "Fremont has a few local layers worth knowing early. Parts of Niles and Mission San Jose fall within historical overlay districts where exterior changes get design review. Hillside lots east of Mission Boulevard are subject to hill-area development restrictions approved by voters. Properties near the mapped fault trace can require a geologic report. Water service comes from the Alameda County Water District, not a Santa Clara County agency, which changes who you call for meters and rebates.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in Fremont",
      paragraphs: [
        "For a Fremont ranch home, ask early about the drain lines. Houses of this era were commonly built with cast-iron pipe under the slab, and a video inspection before a kitchen or bathroom remodel tells you whether the line should be repaired while the floor is already open. Many of these homes also have original single-pane aluminum sliders, and replacing them during a remodel is far less disruptive than doing it later.",
        "Expansive clay soil is common on the valley floor, so cracks in a slab or patio deserve a look from an engineer before an addition is tied to the existing foundation. If you are in a neighborhood with a homeowners association, as in much of Ardenwood, collect its architectural guidelines before design begins.",
      ],
    },
    projects: {
      heading: "Projects that suit Fremont homes",
      items: {
        "kitchen-remodeling": "Removing the wall between a 1960s galley kitchen and the living area, with a panel upgrade to support modern appliances.",
        "bathroom-remodeling": "Replacing original tubs, tile and under-slab drain connections in ranch-home bathrooms that have not been touched in decades.",
        "home-additions": "Rear additions and primary suites on Fremont's generous flat lots, and ADUs for multigenerational households.",
        landscaping: "Turning large, flat backyards into patios, covered outdoor rooms and low-water planting.",
        "interior-exterior-painting": "Whole-house interior repaints and stucco exteriors on two-story homes in Ardenwood and Warm Springs.",
      },
    },
    neighborhoods: {
      names: ["Niles", "Mission San Jose", "Irvington", "Centerville", "Warm Springs", "Glenmoor", "Ardenwood", "Cabrillo"],
      text: "We serve all five of Fremont's original districts and the newer neighborhoods between them.",
    },
  },

  "santa-clara": {
    metaDescription: "Home remodeling contractor serving Santa Clara, CA. Licensed design-build (CSLB #1162108) for kitchens, baths and additions. Book a free consultation.",
    intro: [
      "Santa Clara is a compact city directly west of San Jose, and a short drive from our downtown office. Its houses are mostly modest postwar homes on regular lots, which makes them some of the most practical in the South Bay to remodel and expand.",
      "The city also runs more of its own services than its neighbors do, including its own electric utility. FORMA Design + Build factors that into the plan, because it changes who approves an electrical service upgrade and how long it takes.",
    ],
    housing: {
      heading: "Santa Clara homes and what to expect",
      paragraphs: [
        "The Old Quad, the grid of streets around Santa Clara University, has the city's oldest houses: Victorians, Craftsman bungalows and prewar cottages, many on the city's historic inventory. They have raised foundations and crawlspaces, which makes rerouting plumbing easier, along with lath-and-plaster walls and framing that predates modern lumber sizes.",
        "Most of the rest of the city was built between the late 1940s and the 1960s. These are single-story ranch homes of roughly 1,100 to 1,600 square feet, usually three bedrooms, with one or two small bathrooms and a kitchen closed off from the living room. Santa Clara also has pockets of mid-century modern homes, including tracts built by Mackay and the Eichler-built Pomeroy Green townhouses. Rivermark, in the north, is a planned neighborhood of two-story homes from the early 2000s.",
      ],
    },
    permits: {
      heading: "Permits in Santa Clara",
      office: "City of Santa Clara Building Division",
      address: "Permit Center, City Hall, 1500 Warburton Ave, Santa Clara, CA 95050",
      url: "https://www.santaclaraca.gov/",
      paragraphs: [
        "Building permits are issued by the Building Division through the Permit Center at City Hall on Warburton Avenue, with online application for most residential work. Like-for-like kitchen and bathroom remodels are typically straightforward. Additions go through plan check and a planning review of setbacks, lot coverage and height.",
        "The local difference is electricity. Santa Clara is served by Silicon Valley Power, the city-owned utility, not PG&E. If a remodel needs a larger electrical service for an induction range, a heat pump or an ADU, the service upgrade is coordinated with Silicon Valley Power under its own requirements. Homes on the Historic Resources Inventory, most of them in the Old Quad, need review of exterior changes before a permit is issued.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in Santa Clara",
      paragraphs: [
        "Lot size is the practical limit in Santa Clara. Many parcels are around 5,000 to 6,000 square feet, so a rear addition has to be weighed against required setbacks and the yard that will be left. For that reason second bathrooms and primary suites are often carved from existing floor area first, with an addition only where the plan cannot be made to work.",
        "Original houses here frequently have a single wall furnace or an aging forced-air unit and no air conditioning. A remodel is the efficient moment to add a heat pump system, and because the city utility's rates differ from those of neighboring cities, it is worth running the numbers on electrification specifically for a Santa Clara address. Garage conversions are also common, so check that any existing conversion was permitted.",
      ],
    },
    projects: {
      heading: "Projects that suit Santa Clara homes",
      items: {
        "kitchen-remodeling": "Combining a small closed kitchen and dining area into one working space in a postwar ranch home.",
        "bathroom-remodeling": "Rebuilding compact original bathrooms with better storage, ventilation and a walk-in shower.",
        "home-additions": "Adding a primary suite or a second bathroom to a three-bedroom, one-bath house, or a backyard ADU.",
        landscaping: "Making small rear yards work harder with a patio, a pergola and planting along the fence line.",
        "interior-exterior-painting": "Repainting wood siding and trim on Old Quad homes, with lead-safe preparation where it applies.",
      },
    },
    neighborhoods: {
      names: ["Old Quad", "Rivermark", "Killarney Farms", "Forest Park", "Pruneridge", "Maywood", "Central Park"],
      text: "We serve Santa Clara from the Old Quad north to Rivermark and west toward the Sunnyvale and Cupertino borders.",
    },
  },

  "palo-alto": {
    metaDescription: "Home remodeling contractor serving Palo Alto, CA. Licensed design-build (CSLB #1162108) for Eichlers, kitchens, baths and additions. Free consultation.",
    intro: [
      "Palo Alto is the northern edge of our service area and the most closely regulated city we work in. Homeowners here tend to care a great deal about design, and so does the city: reviews are thorough, neighbors are engaged and the details are expected to be right.",
      "FORMA Design + Build approaches a Palo Alto remodel with more time in planning than a comparable project elsewhere. Understanding the review path before design starts is what prevents a redesign later.",
    ],
    housing: {
      heading: "Palo Alto homes: Eichlers, prewar houses and everything between",
      paragraphs: [
        "Palo Alto has roughly 2,700 Eichler homes, more than any other city. They are concentrated in south Palo Alto, and two tracts, Greenmeadow and Green Gables, are listed on the National Register of Historic Places. Eichlers are post-and-beam houses with no attic, tongue-and-groove ceilings, floor-to-ceiling glass and radiant heat cast into the slab. Running new wiring, ducting or plumbing takes planning, because there is nowhere to hide it.",
        "North of Oregon Expressway the housing is older. Professorville, Old Palo Alto and Crescent Park have Craftsman, Colonial Revival, Tudor and Spanish Revival houses from the 1890s through the 1930s, many of them large and some historically designated. Midtown, Barron Park and College Terrace mix prewar cottages with postwar ranch homes and newer rebuilds.",
      ],
    },
    permits: {
      heading: "Permits in Palo Alto",
      office: "City of Palo Alto Development Center (Planning and Development Services)",
      address: "285 Hamilton Ave, Palo Alto, CA 94301",
      url: "https://www.cityofpaloalto.org/",
      paragraphs: [
        "Permits run through the Development Center on Hamilton Avenue. New two-story homes and second-story additions in single-family zones go through the city's Individual Review process, which looks at privacy, massing and how the design sits with neighboring houses. Some Eichler tracts have single-story overlay zoning that rules out a second floor entirely, and the city publishes Eichler design guidelines for the rest.",
        "Two other points shape Palo Alto projects. Parts of the city east of Middlefield Road are in a mapped flood zone, where a remodel valued above a set share of the building's value has to meet flood-protection requirements. And the city owns its utilities: City of Palo Alto Utilities provides electricity, gas and water, so service upgrades are coordinated with the city and not PG&E. Historic properties are reviewed by the Historic Resources Board.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in Palo Alto",
      paragraphs: [
        "Before planning an Eichler remodel, find out the condition of the radiant heating. The original steel or copper tubing in many slabs has failed or been abandoned, and the choice between repairing it and installing a separate heating and cooling system affects ceilings, walls and the budget. Roof work is often paired with a remodel as well, because a foam or membrane re-roof is the usual way to add insulation and run new wiring.",
        "For any Palo Alto project, confirm the flood zone designation and whether the property carries a single-story overlay or historic status before commissioning design. Construction logistics matter here too: the city regulates work hours, street use and the protection of street trees, and narrow streets in the older neighborhoods limit where materials and dumpsters can go.",
      ],
    },
    projects: {
      heading: "Projects that suit Palo Alto homes",
      items: {
        "kitchen-remodeling": "Eichler kitchen remodels that keep the open plan and sightlines while replacing original cabinets and adding proper ventilation.",
        "bathroom-remodeling": "Bathroom rebuilds on radiant-heated slabs, where drain changes are planned around the tubing in the floor.",
        "home-additions": "Single-story additions and ADUs designed to pass review, and second stories where the zoning allows them.",
        landscaping: "Courtyards, atriums and private rear gardens that extend glass-walled living rooms outdoors.",
        "interior-exterior-painting": "Siding and beam repairs with repainting on mid-century homes, and detailed trim work on prewar houses.",
      },
    },
    neighborhoods: {
      names: ["Old Palo Alto", "Professorville", "Crescent Park", "Midtown", "Barron Park", "College Terrace", "Greenmeadow", "Green Gables"],
      text: "We serve Palo Alto from Crescent Park and Professorville south through Midtown to the Eichler tracts near the Mountain View border.",
    },
  },

  milpitas: {
    metaDescription: "Home remodeling contractor serving Milpitas, CA, from ranch homes to the hillside. Licensed design-build, CSLB #1162108. Book a free consultation.",
    intro: [
      "Milpitas sits at the northeast corner of Santa Clara County, between San Jose and Fremont and a short drive north of our downtown office. It is a small city with a clear split: flat valley-floor neighborhoods west of the hills and a band of hillside homes to the east.",
      "FORMA Design + Build serves both. The valley homes are mostly straightforward to remodel, while the hillside adds review steps that are best understood before design begins.",
    ],
    housing: {
      heading: "Milpitas homes from Sunnyhills to the hillside",
      paragraphs: [
        "Milpitas grew with the opening of the Ford assembly plant in the mid-1950s, and its first large subdivision, Sunnyhills, dates from that period. Sunnyhills is noted as one of the country's early planned integrated neighborhoods. Its houses, and those in nearby tracts from the late 1950s and 1960s, are compact single-story ranch homes on slabs, with attached garages and original kitchens that open to very little.",
        "South and central Milpitas filled in through the 1970s and 1980s with larger ranch and two-story homes in neighborhoods such as Parktown and the Pines. East of Piedmont Road the lots climb into the hills, with custom and semi-custom houses on sloped sites. The newest housing is attached: townhomes and condominiums built since the 2000s around the Great Mall and the Milpitas transit center, where remodeling is usually interior-only and governed by a homeowners association.",
      ],
    },
    permits: {
      heading: "Permits in Milpitas",
      office: "City of Milpitas Building Safety and Housing Department",
      address: "Milpitas City Hall, 455 E Calaveras Blvd, Milpitas, CA 95035",
      url: "https://www.milpitas.gov/",
      paragraphs: [
        "Permits are issued by the Building Safety and Housing Department at City Hall on Calaveras Boulevard, with online submittal available. For a small city the process is direct, and interior remodels that do not change structure are generally handled without extended review.",
        "The hillside is the exception. Properties in the hillside zone are subject to the city's hillside development rules, which add planning review for additions, grading and anything that changes how the house reads from the valley. Sloped sites also tend to need soils reports and engineered foundations and retaining walls. For townhomes and condominiums, the association's architectural approval usually has to be in hand before the city will finalize a permit for exterior or structural work.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in Milpitas",
      paragraphs: [
        "On the valley floor, start with the basics of a 1960s tract house: the size of the electrical panel, the age of the sewer lateral and whether the garage has already been converted. Multigenerational living is common in Milpitas, which makes a second primary suite, a ground-floor bedroom with an accessible bathroom or a backyard ADU a frequent goal. Each of those is easier to plan when the capacity of the existing utilities is known.",
        "On the hillside, begin with the site. Order a survey if the property lines or slopes are uncertain, look for signs of soil movement such as cracked retaining walls, and ask about drainage before designing anything. For attached homes, read the association's rules on work hours, flooring underlayment and plumbing shutoffs, since they often dictate how the job has to be run.",
      ],
    },
    projects: {
      heading: "Projects that suit Milpitas homes",
      items: {
        "kitchen-remodeling": "Opening a 1960s ranch kitchen to the living room, and full kitchen replacements in townhomes within HOA rules.",
        "bathroom-remodeling": "Rebuilding original bathrooms and adding a second full bath in homes built with one and a half.",
        "home-additions": "Rear additions and ADUs on valley-floor lots, often for extended family living on one property.",
        landscaping: "Level patios and retaining walls on sloped hillside yards, and low-maintenance redesigns of flat suburban lots.",
        "interior-exterior-painting": "Exterior repaints of stucco and wood-sided ranch homes, and interior repaints before a move-in.",
      },
    },
    neighborhoods: {
      names: ["Sunnyhills", "Parktown", "The Pines", "Hillcrest", "Summitpointe", "Midtown Milpitas", "Great Mall area"],
      text: "We serve Milpitas from Sunnyhills in the north to the neighborhoods along the San Jose border, including the eastern hillside.",
    },
  },

  sunnyvale: {
    metaDescription: "Home remodeling contractor serving Sunnyvale, CA. Licensed design-build (CSLB #1162108) for Eichlers, ranch homes, kitchens and baths. Free consultation.",
    intro: [
      "Sunnyvale is where the mid-century tract house was refined. Joseph Eichler built his first subdivisions here in 1949, and the city still has around 1,100 Eichler homes alongside thousands of conventional ranch houses from the same decades.",
      "FORMA Design + Build remodels both kinds. The work in Sunnyvale is often about making a well-proportioned 1950s or 1960s house function for a household today without erasing what made it worth buying.",
    ],
    housing: {
      heading: "Sunnyvale homes: mid-century by default",
      paragraphs: [
        "Eichler tracts are spread across the city, with the largest groups in Fairbrae, Fairwood, Rancho Verde and around Cherry Chase. They share the traits that make Eichlers distinctive and demanding: exposed post-and-beam structure, flat or low-slope roofs with little room for insulation or ducting, slab floors with embedded radiant heat and large panes of original single glazing.",
        "The conventional ranch homes in Birdland, Lakewood Village, Ponderosa Park and Cherry Chase are simpler to work on. They usually have attics, standard framing and forced-air heating, and many still have their original 8-foot ceilings and enclosed kitchens. Near downtown, the Heritage District along Taaffe and Frances streets preserves a small group of early-1900s houses. Newer two-story infill homes and townhomes are scattered throughout.",
      ],
    },
    permits: {
      heading: "Permits in Sunnyvale",
      office: "City of Sunnyvale One-Stop Permit Center",
      address: "Sunnyvale City Hall, 456 W Olive Ave, Sunnyvale, CA 94086",
      url: "https://www.sunnyvale.ca.gov/",
      paragraphs: [
        "Sunnyvale's One-Stop Permit Center at City Hall combines building, planning and engineering staff, and many simple residential permits can be handled online.",
        "Design review is where Sunnyvale projects differ. The city adopted Eichler Design Guidelines that apply to exterior changes and additions in Eichler neighborhoods, and several Eichler tracts carry single-story zoning that prohibits a second floor. Elsewhere, second-story additions and houses above the city's floor-area thresholds get design review, and the largest go to a public hearing. We check which rules apply to your street before proposing an addition.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in Sunnyvale",
      paragraphs: [
        "If the house is an Eichler, establish three things at the outset. Is the radiant heat working, and if not, how will the house be heated and cooled? What is the condition of the roof, since that is where new wiring and insulation usually go? And is the original mahogany paneling, globe lighting or siding intact enough to be worth preserving? Buyers in these neighborhoods value original detail, so a remodel that respects it tends to hold its value better.",
        "For a conventional Sunnyvale ranch home, the attic and crawlspace or slab determine the options. Vaulting a low ceiling, adding skylights or relocating a kitchen are all realistic when the roof framing is conventional, and an engineer can confirm that quickly. Because lots are modest, check lot coverage and the rear setback before assuming an addition will fit, and consider whether reworking the existing floor plan would solve the problem with less construction.",
      ],
    },
    projects: {
      heading: "Projects that suit Sunnyvale homes",
      items: {
        "kitchen-remodeling": "Kitchen remodels in Eichlers and ranch homes that improve storage and ventilation while keeping the mid-century character.",
        "bathroom-remodeling": "Replacing small original bathrooms, including drain work in radiant-heated slabs that has to be located before cutting.",
        "home-additions": "Single-story rear additions that follow the existing roofline, and ADUs on Sunnyvale's standard 6,000-square-foot lots.",
        landscaping: "Front courtyards, atriums and rear patios that connect to walls of glass, with privacy planting along shared fences.",
        "interior-exterior-painting": "Repainting vertical-groove siding, beams and fascia, with repair of the wood that flat roofs tend to damage.",
      },
    },
    neighborhoods: {
      names: ["Cherry Chase", "Birdland", "Fairbrae", "Lakewood Village", "Ponderosa Park", "Heritage District", "Rancho Verde"],
      text: "We serve Sunnyvale from Lakewood Village in the north to Cherry Chase and the Eichler tracts near the Cupertino and Los Altos borders.",
    },
  },

  saratoga: {
    metaDescription: "Home remodeling contractor serving Saratoga, CA. Licensed design-build (CSLB #1162108) for kitchens, baths, additions and estates. Free consultation.",
    intro: [
      "Saratoga is a residential city at the foot of the Santa Cruz Mountains, southwest of San Jose. Lots are large, houses are set back and mature oaks and redwoods are part of nearly every property. Projects here are bigger on average than elsewhere in our service area, and the site matters as much as the house.",
      "FORMA Design + Build plans Saratoga work around three things early: the city's design review, its tree protections and, in the hills, wildfire construction standards.",
    ],
    housing: {
      heading: "Saratoga homes and lots",
      paragraphs: [
        "The flatter neighborhoods east of Saratoga Avenue, including the Golden Triangle, Saratoga Woods and Brookview, were built mostly in the 1950s through the 1970s. They are single-story ranch homes of 1,800 to 3,000 square feet on quarter-acre lots or larger, and many have been expanded or rebuilt once already. Original examples have long, low floor plans with small kitchens far from the family room.",
        "Closer to the Village and up into the hills, the houses are more varied: older cottages and bungalows near Big Basin Way, custom homes from every decade since the 1960s and estate properties of an acre or more. Hillside sites bring steep driveways, retaining walls, limited staging area and, in places, septic systems in place of sewer connections, all of which affect what an addition can include.",
      ],
    },
    permits: {
      heading: "Permits in Saratoga",
      office: "City of Saratoga Community Development Department",
      address: "Saratoga City Hall, 13777 Fruitvale Ave, Saratoga, CA 95070",
      url: "https://www.saratoga.ca.us/",
      paragraphs: [
        "Building and planning are handled by the Community Development Department at City Hall on Fruitvale Avenue. Saratoga requires design review for new homes, second stories and larger additions, with the level of review rising with the height and floor area proposed. Lot size and slope determine the allowable floor area, so the buildable number is specific to each parcel.",
        "Trees are the other gatekeeper. Saratoga's tree regulations protect native species and larger trees of other kinds, and construction near a protected tree usually requires an arborist report, protective fencing and sometimes a security deposit. Much of western Saratoga is in a wildland-urban interface fire area, where additions and exterior remodels must use ignition-resistant roofing, siding, vents and windows. Older properties may also be reviewed by the Heritage Preservation Commission.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in Saratoga",
      paragraphs: [
        "Order an arborist's assessment and a survey early if the project touches the footprint of the house or the yard. In Saratoga the position of protected trees regularly decides where an addition, a driveway or a pool can go, and it is far cheaper to design around a root zone than to redesign after review. Confirm whether the property is on sewer or septic as well, because adding bedrooms or bathrooms to a house on septic can require the system to be evaluated or enlarged.",
        "Hillside owners should also ask about access. Concrete trucks, lumber deliveries and excavation equipment all need a route to the work area, and a steep or narrow driveway changes the cost and sequence of the job. Finally, check your wildfire designation, which affects material choices and, increasingly, the availability and cost of insurance.",
      ],
    },
    projects: {
      heading: "Projects that suit Saratoga homes",
      items: {
        "kitchen-remodeling": "Relocating and enlarging the kitchen in a long ranch plan so it opens to the family room and the yard.",
        "bathroom-remodeling": "Primary suite bathrooms with separate shower and tub, and accessible bathrooms for owners planning to stay long term.",
        "home-additions": "Single-story additions on large lots, guest houses and ADUs, designed around protected trees and review thresholds.",
        landscaping: "Terraced yards, pool surrounds, outdoor kitchens and planting plans that work with existing oaks.",
        "interior-exterior-painting": "Exterior repaints with wood repair on large homes, coordinated with fire-resistant upgrades where required.",
      },
    },
    neighborhoods: {
      names: ["Golden Triangle", "Saratoga Village", "Saratoga Woods", "Brookview", "Blue Hills", "Congress Springs", "Montalvo"],
      text: "We serve Saratoga from the Golden Triangle and Blue Hills to the Village and the hillside neighborhoods above it.",
    },
  },

  "los-gatos": {
    metaDescription: "Home remodeling contractor serving Los Gatos, CA. Licensed design-build (CSLB #1162108) for historic homes, kitchens and additions. Free consultation.",
    intro: [
      "Los Gatos is a town, not a city, and it guards its character accordingly. The downtown neighborhoods are some of the best-preserved in the South Bay, with streets of Victorians and Craftsman bungalows a short walk from Santa Cruz Avenue, and the hills above hold custom homes on steep, wooded lots.",
      "FORMA Design + Build treats a Los Gatos remodel as two questions: what does the house need, and what will the Town's review allow? Answering the second one early saves months.",
    ],
    housing: {
      heading: "Los Gatos homes, old and new",
      paragraphs: [
        "Almond Grove, Broadway, Fairview Plaza and the University-Edelen area are designated historic districts, with homes dating from the 1880s through the 1920s. They have raised foundations, original wood windows, narrow lots and detached garages on alleys. Interior remodels are usually possible without much restriction, but anything that changes the street-facing exterior is scrutinized.",
        "East of Highway 17, neighborhoods such as Blossom Manor and Belwood are mostly single-story ranch homes from the 1950s and 1960s on wider lots, built much like their counterparts in Cambrian next door. The hillside areas along Kennedy Road, Shannon Road and above downtown have larger custom houses from the 1970s onward, where access, slope and fire exposure drive the construction approach.",
      ],
    },
    permits: {
      heading: "Permits in Los Gatos",
      office: "Town of Los Gatos Community Development Department",
      address: "Los Gatos Civic Center, 110 E Main St, Los Gatos, CA 95030",
      url: "https://www.losgatosca.gov/",
      paragraphs: [
        "The Community Development Department at the Civic Center on East Main Street handles both planning and building. The Town presumes any structure built before 1941 to be historic, whether or not it sits in a designated district, so exterior alterations, additions and demolition on those homes are reviewed by the Historic Preservation Committee before a building permit is issued.",
        "Hillside properties follow the Town's Hillside Development Standards and Guidelines, which limit grading, visible bulk and tree removal, and many are in a wildland-urban interface fire area with ignition-resistant construction requirements. One more check is worth making: plenty of homes with a Los Gatos mailing address are actually in Monte Sereno, San Jose or unincorporated Santa Clara County, each with its own building department. We confirm jurisdiction before anything else.",
      ],
    },
    planning: {
      heading: "What to check before remodeling in Los Gatos",
      paragraphs: [
        "For an older home near downtown, find the year it was built before anything else. That date decides whether historic review applies, which in turn shapes how much of the exterior can change and whether original windows and siding have to be repaired instead of replaced. Then look underneath: brick or unreinforced foundations, undersized floor framing and knob-and-tube wiring are all found in houses of this age, and each is easier to correct during a remodel than after.",
        "On hillside properties, ask about the driveway, the drainage and the trees. Steep access limits the size of delivery trucks, slopes need engineered drainage and retaining walls, and the Town regulates removal of protected trees. Parking and staging are tight on the narrow streets of the historic districts, so the logistics plan should be part of the proposal.",
      ],
    },
    projects: {
      heading: "Projects that suit Los Gatos homes",
      items: {
        "kitchen-remodeling": "Kitchens in historic homes that add modern function behind a period-appropriate exterior, and open-plan kitchens in ranch homes.",
        "bathroom-remodeling": "Adding or enlarging bathrooms in older houses built with one, using the crawlspace to route new plumbing.",
        "home-additions": "Rear additions sized and detailed to pass historic review, plus ADUs and hillside expansions.",
        landscaping: "Terracing and drainage on sloped lots, and small, detailed gardens for downtown properties.",
        "interior-exterior-painting": "Multi-color exterior schemes on Victorian and Craftsman homes, with lead-safe preparation and wood repair.",
      },
    },
    neighborhoods: {
      names: ["Almond Grove", "Broadway", "Fairview Plaza", "Glenridge", "Blossom Manor", "Belwood", "Vasona", "Kennedy Road"],
      text: "We serve Los Gatos from the historic districts around downtown to Blossom Manor in the east and the hillside neighborhoods to the south.",
    },
  },
};
