// Real customer reviews and real completed projects.
//
// Both lists are intentionally EMPTY. Nothing here may be invented. While a list is empty,
// its section is not rendered anywhere on the site and no review markup is published.

export type Review = {
  /** Reviewer name exactly as it appears on the source (with their permission). */
  author: string;
  /** City of the project, e.g. "San Jose". */
  city: string;
  /** 1 to 5. */
  rating: number;
  /** The review text, quoted exactly. */
  text: string;
  /** ISO date of the review, e.g. "2026-08-14". */
  date: string;
  /** Where it was posted, e.g. "Google". */
  source: string;
  /** Optional service slug so the review shows on that service page. */
  service?: string;
};

// TODO(owner): add real reviews here. Example shape:
// { author: "…", city: "San Jose", rating: 5, text: "…", date: "2026-08-14", source: "Google", service: "kitchen-remodeling" }
// After adding reviews, also set business.aggregateRating in app/business.ts to the real
// rating and count so AggregateRating schema is published alongside the visible reviews.
export const reviews: Review[] = [];

export type Project = {
  /** Short name, e.g. "Willow Glen kitchen remodel". */
  title: string;
  /** City of the project. */
  city: string;
  /** Service slug this project belongs to (services/[slug]). */
  service: string;
  /** One or two sentences on the scope of work actually performed. */
  scope: string;
  /** Photos of the real project. Files go in /public/images/projects as WebP. */
  photos: { src: string; width: number; height: number; alt: string }[];
};

// TODO(owner): add real FORMA projects here with photos, city and scope. Example shape:
// { title: "…", city: "San Jose", service: "bathroom-remodeling", scope: "…",
//   photos: [{ src: "/images/projects/….webp", width: 1600, height: 1067, alt: "Bathroom remodel in San Jose with …" }] }
export const projects: Project[] = [];
