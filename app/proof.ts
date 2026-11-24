// Real customer reviews and real completed projects.
//
// Nothing here may be invented. Quotes are verbatim excerpts from the source. A section is not
// rendered on a page when it has nothing to show there.

export type Review = {
  /** Reviewer name as it appears on the source (with their permission). */
  author: string;
  /** City of the project, when the client has said it publicly. */
  city?: string;
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
// Google reviews do not belong in this file. They are rendered live by Google's widget in
// app/google-reviews.tsx, never copied, picked or marked up as Review schema here.
const testimonialAuthor = "Ashwani & Chitvan";
const testimonialSource = "Video testimonial";

// Google reviews: short excerpts, quoted exactly, from the public reviews on FORMA's Google
// Business Profile (read on 2026-11-24). An ellipsis marks words left out. Every reviewer below
// gave 5 stars. The live widget in app/google-reviews.tsx shows the full, current reviews.
// TODO(owner): refresh these when new reviews arrive; remove one here if it is removed on Google.
const google = "Google review";

export const reviews: Review[] = [
  {
    author: "Durwin Sampollo",
    source: google,
    rating: 5,
    text: "We recently had our kitchen remodeled by Forma Design + Build and couldn't be happier with how everything turned out... The kitchen feels completely different now, and it turned out even better than we envisioned.",
    featured: true,
    services: ["kitchen-remodeling"],
  },
  {
    author: "Patrick Dong",
    source: google,
    rating: 5,
    text: "The original space was very dated, and he completely transformed it into a bright, modern bathroom... I especially appreciated being able to trust him to handle the details, which took a lot of the stress out of the renovation.",
    featured: true,
    services: ["bathroom-remodeling"],
  },
  {
    author: "Tran Pham",
    source: google,
    rating: 5,
    text: "I wanted a beautiful backyard without going over my budget, and Eddie from Forma Design + Build and his team helped bring that vision to life... They were professional, hardworking, and genuinely nice to have around.",
    featured: true,
    services: ["landscaping"],
  },
  {
    author: "Chau Dang",
    source: google,
    rating: 5,
    text: "Eddie was professional, responsive, and easy to communicate with throughout the project. I appreciated his attention to detail and the care he put into the work.",
  },
  {
    author: "Raja Sekhar Pedada",
    source: google,
    rating: 5,
    text: "The whole job was finished in 3 days, exactly as planned, and everything works perfectly... They left the place clean and tidy when they finished. Fair price for the quality of the work.",
  },
  // From the client video testimonial (no star rating was given, so none is shown).
  {
    author: testimonialAuthor,
    city: "San Jose",
    source: testimonialSource,
    text: "The human aspect, the connection part that developed with Eddie was the most important deciding factor for us. He came across during our initial meetings as not pushing sales, listening to us, understanding what we want to do.",
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

export type ProjectVideo = {
  /** Self-hosted MP4 in /public/videos, compressed for the web. */
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  description: string;
  /** ISO 8601 duration, e.g. "PT2M18S". */
  duration: string;
  /** ISO date. */
  uploadDate: string;
};

export type Project = {
  title: string;
  city: string;
  /** One or two sentences on the scope of work actually performed. */
  scope: string;
  /** Files live in /public/images/projects as WebP. */
  photos: ProjectPhoto[];
  /** Client video testimonial for this project, if there is one. */
  video?: ProjectVideo;
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
    video: {
      src: "/videos/san-jose-full-house-remodel-testimonial.mp4",
      poster: `${dir}/san-jose-remodel-testimonial-poster.webp`,
      width: 1280,
      height: 720,
      title: "San Jose homeowners on their full-house remodel",
      description: "Ashwani and Chitvan of San Jose describe their full-house remodel: the first meetings, daily communication, the crews and the finished kitchen and bathrooms.",
      duration: "PT2M18S",
      // TODO(owner): confirm the date. Taken from the project folder name (04.01.2025).
      uploadDate: "2025-04-01",
    },
    photos: [
      { src: `${dir}/san-jose-kitchen-remodel-island.webp`, width: 1600, height: 1067, service: "kitchen-remodeling", featured: true, caption: "Kitchen with island", alt: "Kitchen remodel in San Jose with wood-tone shaker cabinets, a large island with a backlit stone countertop and a ring pendant light" },
      { src: `${dir}/san-jose-kitchen-remodel-open-plan.webp`, width: 1600, height: 1067, service: "kitchen-remodeling", featured: true, caption: "Open kitchen and dining area", alt: "Open-plan kitchen remodel in San Jose with an island, built-in wine storage and a dining area beside it" },
      { src: `${dir}/san-jose-kitchen-remodel-countertop.webp`, width: 1600, height: 1067, service: "kitchen-remodeling", caption: "Island countertop and sink", alt: "Stone island countertop with an undermount sink in a remodeled San Jose kitchen" },
      { src: `${dir}/san-jose-living-room-remodel.webp`, width: 1600, height: 1067, featured: true, caption: "Living room", alt: "Remodeled living room in San Jose with recessed linear ceiling lighting and wood flooring" },
      { src: `${dir}/san-jose-bathroom-remodel-green-vanity.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", featured: true, caption: "Bathroom with green vanity", alt: "Bathroom remodel in San Jose with a green vanity, an oval backlit mirror and a glass-enclosed tiled shower" },
      { src: `${dir}/san-jose-bathroom-remodel-floating-vanity.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", featured: true, caption: "Bathroom with floating vanity", alt: "Bathroom remodel in San Jose with a floating wood vanity, a backlit mirror and pendant lights" },
      { src: `${dir}/san-jose-bathroom-remodel-herringbone-shower.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", caption: "Herringbone tile shower", alt: "Walk-in shower with herringbone wall tile, a recessed niche and sliding glass doors in a San Jose bathroom remodel" },
      { src: `${dir}/san-jose-kitchen-remodel-wine-storage.webp`, width: 1100, height: 1649, service: "kitchen-remodeling", caption: "Island with wine storage", alt: "Kitchen island with built-in wine storage and glass-front cabinets in a San Jose kitchen remodel" },
      { src: `${dir}/san-jose-hallway-remodel.webp`, width: 1100, height: 1649, caption: "Hallway", alt: "Remodeled hallway in San Jose with wood flooring and white doors" },
      { src: `${dir}/san-jose-bathroom-remodel-marble-shower.webp`, width: 1100, height: 1649, service: "bathroom-remodeling", caption: "Dark stone-look tile shower", alt: "Glass-enclosed shower with dark stone-look tile in a San Jose bathroom remodel" },
    ],
  },
];
