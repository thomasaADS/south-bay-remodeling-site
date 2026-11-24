import Image from "next/image";
import { projects, reviews } from "./proof";

/**
 * Real project gallery. Renders nothing until real projects are added to app/proof.ts.
 * TODO(owner): supply project photos, city and scope (see app/proof.ts).
 */
export function ProjectGallerySection({ service, heading }: { service?: string; heading: string }) {
  const items = service ? projects.filter((project) => project.service === service) : projects;
  if (!items.length) return null;
  return (
    <section className="proof-section" id="projects-gallery" aria-labelledby="projects-gallery-title">
      <p className="eyebrow">Completed by FORMA</p>
      <h2 id="projects-gallery-title">{heading}</h2>
      <div className="proof-grid">
        {items.map((project) => (
          <article key={project.title}>
            {project.photos.map((photo) => (
              <Image key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 900px) 100vw, 33vw" loading="lazy" />
            ))}
            <h3>{project.title}</h3>
            <p><strong>{project.city}</strong> · {project.scope}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Real customer reviews. Renders nothing until real reviews are added to app/proof.ts.
 * TODO(owner): supply reviews (see app/proof.ts).
 */
export function ReviewsSection({ service, heading }: { service?: string; heading: string }) {
  const matching = service ? reviews.filter((review) => review.service === service) : reviews;
  const items = matching.length ? matching : service ? [] : reviews;
  if (!items.length) return null;
  return (
    <section className="proof-section" id="reviews" aria-labelledby="reviews-title">
      <p className="eyebrow">Client reviews</p>
      <h2 id="reviews-title">{heading}</h2>
      <div className="proof-grid">
        {items.map((review) => (
          <article key={`${review.author}-${review.date}`}>
            <p aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}</p>
            <blockquote>{review.text}</blockquote>
            <p><strong>{review.author}</strong> · {review.city} · {review.source}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Review schema for pages that visibly show reviews. Empty until reviews exist. */
export function reviewSchema(service?: string) {
  const items = service ? reviews.filter((review) => review.service === service) : reviews;
  return items.map((review) => ({
    "@type": "Review",
    author: { "@type": "Person", name: review.author },
    datePublished: review.date,
    reviewBody: review.text,
    reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
  }));
}
