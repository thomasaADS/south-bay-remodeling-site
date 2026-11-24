// Real customer reviews and real completed projects.
//
// Nothing here may be invented. Quotes are verbatim excerpts from the source. A section is not
// rendered on a page when it has nothing to show there.

export type Review = {
  /** Reviewer name as it appears on the source (with their permission). */
  author: string;
  /** City of the project, e.g. "San Jose". */
  city: string;
  /** The review text, quoted exactly. An ellipsis marks words left out. */
  text: string;
  /** Where it comes from, e.g. "Google" or "Video testimonial". */
  source: string;
  /**
   * 1 to 5, only when the customer actually gave a star rating (e.g. on Google).
   * Spoken testimonials have no rating: no stars are shown and no Review schema is published.
   */
  rating?: number;
  /** ISO date of the review. Leave out if unknown. */
  date?: string;
  /** Service slugs whose pages should show this review. */
  services?: string[];
  /** Shown on the homepage. */
  featured?: boolean;
};

// Source: client video testimonial for the full-house remodel in San Jose (April 2025).
// TODO(owner): confirm the clients agreed to have their first names and words on the website.
// TODO(owner): add Google reviews here with their real star ratings, then set
// business.aggregateRating in app/business.ts to the real rating and count.
const testimonialAuthor = "Ashwani & Chitvan";
const testimonialSource = "Video testimonial";

export const reviews: Review[] = [
  {
    author: testimonialAuthor,
    city: "San Jose",
    source: testimonialSource,
    text: "The human aspect, the connection part that developed with Eddie was the most important deciding factor for us. He came across during our initial meetings as not pushing sales, listening to us, understanding what we want to do.",
    featured: true,
  },
  {
    author: testimonialAuthor,
    city: "San Jose",
    source: testimonialSource,
    text: "He takes accountability. He was always available... He was here every single day, taking care of what happened throughout the day, any issues we were facing.",
    featured: true,
  },
  {
    author: testimonialAuthor,
    city: "San Jose",
    source: testimonialSource,
    text: "Eddie made sure that the best people who work on bathrooms work on our bathrooms, the people who do kitchens really well work on our kitchen... They would come on time. When they knew that the work was behind schedule, they would go extra hours. They would clean up.",
    featured: true,
    services: ["kitchen-remodeling", "bathroom-remodeling"],
  },
  {
    author: testimonialAuthor,
    city: "San Jose",
    source: testimonialSource,
    text: "My dream kitchen is done the way I wanted. Thank you, Eddie.",
    services: ["kitchen-remodeling"],
  },
];

export type ProjectPhoto = {
  src: string;
  width: number;
  height: number;
  /** Describes what is actually in the photo, including the service and city. */
  alt: string;
  caption: string;
  /** Service slug whose page should show this photo. Leave out for rooms with no service page. */
  service?: string;
  /** Shown on the homepage. */
  featured?: boolean;
};

export type Project = {
  title: string;
  city: string;
  /** One or two sentences on the scope of work actually performed. */
  scope: string;
  /** Files live in /public/images/projects as WebP. */
  photos: ProjectPhoto[];
};

const dir = "/images/projects";

// The street address of a client's home is never published. City only.
// TODO(owner): confirm the scope wording below matches the work FORMA performed on this home.
// TODO(owner): add more completed projects in the same shape.
export const projects: Project[] = [
  {
    title: "Full-house remodel in San Jose",
    city: "San Jose",
    scope: "A whole-home renovation: a new kitchen with a large island, two remodeled bathrooms and updated living areas.",
    photos: [
      { src: `${dir}/san-jose-kitchen-remodel-island.webp`, width: 1600, height: 1067, service: "kitchen-remodeling", featured: true, caption: "Kitchen with island", alt: "Kitchen remodel in San Jose with wood-tone shaker cabinets, a large island with a backlit stone countertop and a ring pendant light" },
      { src: `${dir}/san-jose-kitchen-remodel-open-plan.webp`, width: 1600, height: 1067, service: "kitchen-remodeling", featured: true, caption: "Open kitchen and dining area", alt: "Open-plan kitchen remodel in San Jose with an island, built-in wine storage and a dining area beside it" },
      { src: `${dir}/san-jose-kitchen-remodel-countertop.webp`, width: 1600, height: 1067, service: "kitchen-remodeling", caption: "Island countertop and sink", alt: "Stone island countertop with an undermount sink in a remodeled San Jose kitchen" },
      { src: `${dir}/san-jose-living-room-remodel.webp`, width: 1600, height: 1067, featured: true, caption: "Living room", alt: "Remodeled living room in San Jose with recessed linear ceiling lighting and wood flooring" },
      { src: `${dir}/san-jose-bathroom-remodel-green-vanity.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", featured: true, caption: "Bathroom with green vanity", alt: "Bathroom remodel in San Jose with a green vanity, an oval backlit mirror and a glass-enclosed tiled shower" },
      { src: `${dir}/san-jose-bathroom-remodel-floating-vanity.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", featured: true, caption: "Bathroom with floating vanity", alt: "Bathroom remodel in San Jose with a floating wood vanity, a backlit mirror and pendant lights" },
      { src: `${dir}/san-jose-bathroom-remodel-herringbone-shower.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", caption: "Herringbone tile shower", alt: "Walk-in shower with herringbone wall tile, a recessed niche and sliding glass doors in a San Jose bathroom remodel" },
      { src: `${dir}/san-jose-bathroom-remodel-marble-shower.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", caption: "Dark stone-look tile shower", alt: "Glass-enclosed shower with dark stone-look tile in a San Jose bathroom remodel" },
    ],
  },
];
